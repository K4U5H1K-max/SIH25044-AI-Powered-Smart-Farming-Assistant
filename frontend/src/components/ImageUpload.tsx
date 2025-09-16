import React, { useRef, useState } from 'react';

export default function ImageUpload({ onUpload }: { onUpload: (file: File) => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onUpload(file);
    }
  };

  return (
    <div className="bg-white rounded shadow p-4 flex flex-col items-center">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="bg-green-600 text-white px-4 py-2 rounded mb-2 hover:bg-green-700"
      >
        Upload Soil Image
      </button>
      {preview && <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded mt-2" />}
    </div>
  );
}
