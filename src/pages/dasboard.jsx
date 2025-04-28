import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsBagFill, BsNutFill, BsTrashFill, BsHospitalFill, BsFlower1, BsFileTextFill } from 'react-icons/bs';
import { FaLaptop } from 'react-icons/fa';

import '../components/css/Dashboard.css';

function Dashboard() {
  const [data, setData] = useState({
    plastic: 0,
    metal: 0,
    common: 0,
    hospitalar: 0,
    organic: 0,
    paper: 0,
    electronic: 0,
  });
  const [mostDiscarded, setMostDiscarded] = useState('');
  const [totalWaste, setTotalWaste] = useState(0);
  const [totalWasteWeight, setTotalWasteWeight] = useState(0);

  useEffect(() => {
    // Chamada à API para buscar os resíduos descartados
    const fetchWasteData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert("Token de autenticação não encontrado.");
          return;
        }

        // Busca todos os resíduos registrados
        const response = await axios.get('http://localhost:8080/resisted/waste-residues', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const wasteData = response.data;

        // Calculando os totais por categoria e o resíduo mais descartado
        let totalWasteCount = 0;
        let totalWeight = 0;
        let categoryCount = {
          plastic: 0,
          metal: 0,
          common: 0,
          hospitalar: 0,
          organic: 0,
          paper: 0,
          electronic: 0,
        };

        wasteData.forEach((waste) => {
          totalWasteCount++;
          totalWeight += waste.amountKg;

          const category = waste.typeWasteResidue.name.toLowerCase();
          if (categoryCount[category] !== undefined) {
            categoryCount[category]++;
          }
        });

        // Calculando o resíduo mais descartado
        const mostDiscardedCategory = Object.keys(categoryCount).reduce((a, b) =>
          categoryCount[a] > categoryCount[b] ? a : b
        );

        setData(categoryCount);
        setMostDiscarded(mostDiscardedCategory);
        setTotalWaste(totalWasteCount);
        setTotalWasteWeight(totalWeight.toFixed(2));
      } catch (error) {
        console.error('Erro ao buscar dados de resíduos:', error);
        alert('Erro ao carregar dados de resíduos.');
      }
    };

    fetchWasteData();
  }, []);

  return (
    <div className="dashboard">
      <div className="categories">
        <div className="category">
          <BsBagFill size={50} />
          <span>Plástico</span>
          <br />
          <span>{data.plastic}</span>
        </div>

        <div className="category">
          <BsNutFill size={50} />
          <span>Metal</span>
          <br />
          <span>{data.metal}</span>
        </div>

        <div className="category">
          <BsTrashFill size={50} />
          <span>Comum</span>
          <br />
          <span>{data.common}</span>
        </div>

        <div className="category">
          <BsHospitalFill size={50} />
          <span>Hospitalar</span>
          <br />
          <span>{data.hospitalar}</span>
        </div>

        <div className="category">
          <BsFlower1 size={50} />
          <span>Orgânico</span>
          <br />
          <span>{data.organic}</span>
        </div>

        <div className="category">
          <BsFileTextFill size={50} />
          <span>Papel</span>
          <br />
          <span>{data.paper}</span>
        </div>

        <div className="category">
          <FaLaptop size={50} />
          <span>Eletrônico</span>
          <br />
          <span>{data.electronic}</span>
        </div>
      </div>

      <div className="info-boxes">
        <div className="info-box">
          <h4>Resíduo mais descartado</h4>
          <div className="info-placeholder">{mostDiscarded}</div>
        </div>

        <div className="info-box">
          <h4>Total de lixo descartado (itens)</h4>
          <div className="info-placeholder">{totalWaste}</div>
        </div>

        <div className="info-box">
          <h4>Total de lixo descartado (kg)</h4>
          <div className="info-placeholder">{totalWasteWeight} kg</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
