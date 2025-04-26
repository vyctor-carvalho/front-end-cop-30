import React from 'react';
import './css/Main.css';
import { Link } from 'react-router-dom';
import image from '../img/image.png'
import imagel from '../img/image3.png'


function Main() {
  return (
   <main>
    <section className="left">
    <img src={imagel} alt="residuos" />
    </section>
    <section className="center">
        <div className="box">
        <Link to="/residue">
            <div className="image">
           
            <i className="bi bi-recycle"></i> 
            </div>
            <div className="txt">
               ADD RESÍDUO
            </div>
            </Link>
        </div>
         <div className="box">
         <Link to="/dashboard">
         <div className="image">
         <i className="bi bi-graph-up"></i>
            </div>
           
            <div className="txt">
                DASHBOARD
            </div>
         </Link>
         </div>
    </section>
    <section className="rigth">
    <img src={image} alt="terra" />
    </section>
   </main>
   
  );
}

export default Main;
