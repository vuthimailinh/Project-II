'use client'
import React, { useState } from 'react';

const ImageConverter: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setBase64Image(reader.result);
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const convertToBase64 = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setBase64Image(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const convertToImage = () => {
    if (base64Image) {
      const img = new Image();
      img.onload = () => {
        // Image loaded successfully
        document.body.appendChild(img);
      };
      img.onerror = () => {
        // Failed to load image
        console.error('Failed to load image');
      };
      img.src = base64Image;
    }
  };

  return (
     <div>
      <h2>Image to Base64</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <br />
      {file && <p>Selected Image: {file.name}</p>}
      <button onClick={convertToBase64}>Convert Image to Base64</button>
      {base64Image && (
        <div>
          <p>Base64 Image:</p>
          <textarea
            value={base64Image}
            rows={10}
            cols={50}
            readOnly
            style={{ resize: 'none' }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageConverter;
