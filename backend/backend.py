import os
import warnings
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Optional
import requests
import uuid

import speech_recognition as sr
from deepmultilingualpunctuation import PunctuationModel
from googletrans import Translator
from gtts import gTTS
from langdetect import detect
from pydub import AudioSegment

warnings.filterwarnings("ignore")
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"


# FastAPI app init

app = FastAPI()
recognizer = sr.Recognizer()
punct_model = PunctuationModel()
translator = Translator()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
OUTPUT_DIR = "outputs"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Utility functions

def detect_language(text: str) -> str:
    try:
        return detect(text)
    except:
        return "en"

def translate_text(text: str, src: str, dest: str) -> str:
    try:
        return translator.translate(text, src=src, dest=dest).text
    except Exception as e:
        print("Translation error:", e)
        return text

def call_groq_chat(system_prompt: str, user_prompt: str) -> str:
    try:
        response = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {GROQ_API_KEY}",
            },
            json={
                "model": "mixtral-8x7b-32768",
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt},
                ],
            },
        )
        return response.json()["choices"][0]["message"]["content"]
    except Exception as e:
        print("Groq error:", e)
        return "Sorry, I could not process your request."

def create_tts_and_save(text: str, lang: str, prefix: str = "reply") -> str:
    filename = f"{prefix}_{uuid.uuid4().hex}.mp3"
    path = os.path.join(OUTPUT_DIR, filename)
    tts = gTTS(text=text, lang=lang)
    tts.save(path)
    return path


# Root Endpoint

@app.get("/")
def root():
    return {"message": "🌱 Smart Farming Assistant Backend (Multilingual Voice AI)"}


# Voice Interaction API

@app.post("/api/voice-interact")
async def voice_interact(
    file: UploadFile = File(...),
    lang: Optional[str] = Form(None)  # e.g., "hi-IN", "te-IN"
):
    # Save audio
    audio_path = os.path.join(OUTPUT_DIR, f"input_{uuid.uuid4().hex}.wav")
    with open(audio_path, "wb") as f:
        f.write(await file.read())

    # Convert audio to wav if needed
    if not audio_path.endswith(".wav"):
        sound = AudioSegment.from_file(audio_path)
        audio_path = audio_path.replace(".mp3", ".wav")
        sound.export(audio_path, format="wav")

    # STT
    with sr.AudioFile(audio_path) as source:
        audio_data = recognizer.record(source)
        if lang:
            raw_text = recognizer.recognize_google(audio_data, language=lang)
        else:
            raw_text = recognizer.recognize_google(audio_data)

    punctuated = punct_model.restore_punctuation(raw_text)

    # Language detection if not provided
    detected_lang = lang or detect_language(punctuated)

    # Translate → English
    if detected_lang.startswith("en"):
        eng_text = punctuated
    else:
        eng_text = translate_text(punctuated, src=detected_lang.split("-")[0], dest="en")

    # Groq processing
    groq_response_eng = call_groq_chat(
        "You are an agricultural assistant for Indian farmers. Provide simple, actionable advice.",
        eng_text
    )

    # Translate back
    if detected_lang.startswith("en"):
        groq_response_local = groq_response_eng
        tts_lang = "en"
    else:
        groq_response_local = translate_text(
            groq_response_eng, src="en", dest=detected_lang.split("-")[0]
        )
        tts_lang = detected_lang.split("-")[0]

    # TTS
    tts_path = create_tts_and_save(groq_response_local, lang=tts_lang)
    tts_filename = os.path.basename(tts_path)

    return {
        "transcription": punctuated,
        "language": detected_lang,
        "groq_text": groq_response_local,
        "tts_filename": tts_filename,
        "tts_url": f"/api/tts/{tts_filename}"
    }


# Serve TTS files

@app.get("/api/tts/{filename}")
def get_tts(filename: str):
    path = os.path.join(OUTPUT_DIR, filename)
    if os.path.exists(path):
        return FileResponse(path, media_type="audio/mpeg", filename=filename)
    return {"error": "File not found"}
