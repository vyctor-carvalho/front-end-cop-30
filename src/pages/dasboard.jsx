import React from 'react';
import { BsBagFill, BsNutFill, BsTrashFill, BsHospitalFill, BsFlower1, BsFileTextFill } from 'react-icons/bs';
import { FaLaptop } from 'react-icons/fa';

import '../components/css/Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="categories">
        
        <div className="category">
          <BsBagFill size={50} />
          <span>Plástico</span>
          <br />
        </div>

        <div className="category">
          <BsNutFill size={50} />
          <span>Metal</span>
          <br />
        </div>

        <div className="category">
          <BsTrashFill size={50} />
          <span>Comum</span>
          <br />
        </div>

        <div className="category">
          <BsHospitalFill size={50} />
          <span>Hospitalar</span>
        </div>

        <div className="category">
          <BsFlower1 size={50} />
          <span>Orgânico</span>
            <br />
            <p></p>
      
        </div>

        <div className="category">
          <BsFileTextFill size={50} />
          <span>Papel</span>
          <br />
        </div>
        <div className="category">
        <FaLaptop size={50} />
          <span>Eletrônico</span>
          <br />
        </div>
        
      </div>

      <div className="info-boxes">
        <div className="info-box">
          <h4>Resíduo mais descartado</h4>
          <div className="info-placeholder"></div>
        </div>

        <div className="info-box">
          <h4>Total de lixo descartado</h4>
          <div className="info-placeholder"></div>
        </div>

        <div className="info-box">
          <h4>Total de lixo descarregado</h4>
          <div className="info-placeholder"></div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
