🌱 AI-Powered Smart Farming Assistant

A modern web application designed to empower farmers with AI-driven crop optimization. The system predicts crop yield, provides recommendations for irrigation, fertilization, and pest control, and supports multilingual interaction with both text and voice capabilities.

✨ Features

🎨 Modern UI/UX

Left-side dark gradient menu

Light gradient workspace for simplicity and focus

Clean and intuitive layout

🌍 Multilingual Support

Toggle between English and regional Indian languages

Voice interaction with Text-to-Speech (TTS) and Speech-to-Text (STT)

Generated natural voice for AI responses

📷 Soil & Land Insights

Upload soil images for health detection

Track agricultural history (previous crops, land usage, etc.)

Add geographical location for better context

🤖 AI Chatbot

Conversational assistant powered by a language model

Predicts crop yield

Recommends irrigation, fertilization, and pest control strategies

Explains optimization methods and the rate of yield improvement

🛠️ Tech Stack

Frontend: React + TailwindCSS (Gradient UI, responsive design)

Backend: Node.js / Python (API & model integration)

AI/ML: Language Model (LLM), Soil Image Processing Model

Voice: Text-to-Speech (TTS) + Speech-to-Text (STT)

Database: MongoDB / PostgreSQL (agricultural history, user data)

Authentication: Firebase Authentication (Email/Password, Google)

🚀 Getting Started
1️⃣ Clone the Repository
git clone https://github.com/K4U5H1K-max/ai-farming-assistant.git
cd ai-farming-assistant

2️⃣ Install Dependencies
npm install   # For frontend
pip install -r requirements.txt   # For backend (if Python)

3️⃣ Set Up Environment Variables

Create a .env file and add your keys:

API_KEY=your_api_key
DB_URL=your_database_url
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id

4️⃣ Run the App
npm start   # Frontend
npm run server   # or python app.py (backend)

📊 Workflow

🌱 User uploads soil image + enters land details

🧠 AI analyzes soil health, history, and location

🤖 Chatbot interacts in preferred language (voice/text)

📈 Model predicts yield and provides recommendations

⚡ AI concludes with optimization rate and improvement methods

📌 Future Enhancements

📡 IoT integration for real-time soil & weather data

📱 Mobile app for wider farmer accessibility

📊 Visualization dashboards for yield tracking

🌍 Expansion to more global regional languages

🤝 Contributing

Contributions are welcome! Feel free to fork the repo and create a pull request.

📜 License

This project is licensed under the MIT License.

🌟 Acknowledgements

Farmers & agricultural experts for domain insights

OpenAI / Hugging Face models for LLM integration

Google Speech / Azure TTS for multilingual speech APIs
