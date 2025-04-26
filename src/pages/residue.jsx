import React, { useState } from 'react';
import axios from 'axios';
import '../components/css/residue.css'; // Importa o CSS novo

const WasteClassifier = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setResult(null);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);

    try {
      const response = await axios.post(
        'https://detect.roboflow.com/waste-classification-uwqfy/1?api_key=nBfxs0askXCkfMT7Dwps',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const prediction = response.data.predictions[0];
      if (prediction) {
        setResult({
          class: prediction.class,
          confidence: (prediction.confidence * 100).toFixed(2),
        });
      } else {
        alert('Nenhum objeto detectado na imagem.');
      }
    } catch (error) {
      console.error(error);
      alert(`Erro ao enviar a imagem: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="waste-container">
      <h1 className="waste-title">Classificador de Resíduos</h1>

      <div className="waste-input-section">
        <input
          type="file"
          onChange={handleFileChange}
          id="file-upload"
          style={{ display: 'none' }}
        />
        <label htmlFor="file-upload" className="waste-btn">Escolher arquivo</label>
        {file && <span className="waste-filename">{file.name}</span>}

        <button onClick={handleUpload} className="waste-btn" disabled={loading}>
          {loading ? 'Analisando...' : 'Enviar imagem'}
        </button>
      </div>

      {previewUrl && (
        <div className="waste-image-preview">
          <h2>Imagem selecionada:</h2>
          <img src={previewUrl} alt="Preview" />
        </div>
      )}

      {result && (
        <div className="waste-result">
          <h2>Resultado:</h2>
          <p><strong>Classe detectada:</strong> {result.class}</p>
          <p><strong>Confiança:</strong> {result.confidence}%</p>
        </div>
      )}
    </div>
  );
};

export default WasteClassifier;
