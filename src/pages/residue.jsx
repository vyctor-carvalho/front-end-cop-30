import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/css/residue.css';
import { LiaBellSlashSolid } from 'react-icons/lia';

// Função que mapeia a classe detectada para a categoria correta
const mapClassToCategory = (className) => {
  if (!className) return 'Comum';

  const classLower = className.toLowerCase();

  if (classLower.includes('plastic')) return 'Plástico';
  if (classLower.includes('aluminum') || classLower.includes('metal')) return 'Metal';
  if (classLower.includes('cardboard') || classLower.includes('paper')) return 'Papel';
  if (classLower.includes('banana') || classLower.includes('food') || classLower.includes('organic')) return 'Orgânico';
  if (classLower.includes('laptop') || classLower.includes('cellphone') || classLower.includes('electronic')) return 'Eletrônico';
  if (classLower.includes('syringe') || classLower.includes('hospital')) return 'Hospitalar';

  return 'Comum';
};

const WasteClassifier = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [amountKg, setAmountKg] = useState('');
  const [registration, setRegistration] = useState('');
  const [unit, setUnit] = useState('');
  const [unitOptions, setUnitOptions] = useState([]);
  const [lastPayload, setLastPayload] = useState(null); // <-- Aqui adiciona!

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          alert("Token de autenticação não encontrado.");
          return;
        }

        const response = await axios.get('http://localhost:8080/resisted/units/getunit', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setUnitOptions(response.data);
      } catch (error) {
        console.error('Erro ao buscar unidades:', error);
        alert('Erro ao carregar as unidades.');
      }
    };

    fetchUnits();
  }, []);

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
        const mappedCategory = mapClassToCategory(prediction.class);

        setResult({
          class: mappedCategory,
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

  const wasteTypeMap = {
    'Plástico': 1,
    'Metal': 2,
    'Papel': 3,
    'Orgânico': 4,
    'Eletrônico': 5,
    'Hospitalar': 6,
  };
  
  const handleSaveWaste = async () => {
    if (!result || !registration || !amountKg) {
      alert('Preencha todos os campos!');
      return;
    }

    const wasteTypeId = wasteTypeMap[result.class];

    const payload = {
      amountKg: amountKg.toString(),
      student: {
        registration: Number(registration),
        unit: null,
      },
      typeWasteResidue: {
        id: wasteTypeId
      }
    };
    
    

    console.log('Payload enviado:', payload);
    setLastPayload(payload); // salva o payload pra mostrar na tela

    const token = localStorage.getItem('token');
    if (!token) {
      alert("Token de autenticação não encontrado.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/resisted/waste-residues', payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('Resíduo registrado com sucesso:', response.data);
      alert('Resíduo registrado com sucesso!');
    } catch (error) {
      console.error('Erro ao registrar resíduo:', error.response ? error.response.data : error);
      alert('Erro ao registrar resíduo.');
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

          <div className="cadastro-container">
            <label>
              <input
                className='input'
                type="text"
                placeholder="Matrícula do aluno"
                value={registration}
                onChange={(e) => setRegistration(e.target.value)}
              />
            </label>

            <label>
              <select
                className="input"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              >
                <option value="">Selecione a unidade</option>
                {unitOptions.map((unit) => (
                  <option key={unit.idUnit} value={unit.idUnit}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <input
                className='input'
                type="text"
                placeholder="Peso do resíduo (kg)"
                value={amountKg}
                onChange={(e) => setAmountKg(e.target.value)}
              />
            </label>

            <div className="form-footer">
              <button onClick={handleSaveWaste} className="waste-btn">
                Registrar Resíduo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exibe o JSON enviado */}
      {lastPayload && (
        <div className="payload-display">
          <h2>JSON enviado:</h2>
          <pre>{JSON.stringify(lastPayload, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default WasteClassifier;
