import React, { useState } from 'react';

export default function SoilInfo({ soilHealth, agriHistory, crop, location }: {
  soilHealth: string;
  agriHistory: string;
  crop: string;
  location: string;
}) {
  return (
    <div className="bg-white rounded shadow p-4 mb-4">
      <h3 className="text-lg font-bold mb-2">Soil & Crop Information</h3>
      <div className="mb-1"><span className="font-semibold">Soil Health:</span> {soilHealth}</div>
      <div className="mb-1"><span className="font-semibold">Agri History:</span> {agriHistory}</div>
      <div className="mb-1"><span className="font-semibold">Crop Planted:</span> {crop}</div>
      <div className="mb-1"><span className="font-semibold">Location:</span> {location}</div>
    </div>
  );
}
