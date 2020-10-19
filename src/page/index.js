import React from 'react';
import { FiSave, FiPieChart, FiClock, FiPlus } from 'react-icons/fi';
import Header from '../components/Header';
import Box from '../components/Box';
import Cpu from '../components/Cpu';
import './styles.css';

import { useProcess } from '../contexts/process';
import Processo from '../components/Processo';

const showFile = async (e) => {
  e.preventDefault()
  const reader = new FileReader()
  reader.onload = async (e) => {
    const text = (e.target.result)
    console.log(text)
    alert(text)
  };
  reader.readAsText(e.target.files[0])
}

const LandingPage = () => {
  const { id, setId } = useProcess();

  return (
    <div id="page-landing">
      <Header />
      <Processo id={id} />
      <div className='allBox'>
        <div className='containerCpu'>
          <Cpu name="CPU 1" color="#233D4D" />
          <Cpu name="CPU 2" color="#FFB7C3" />
          <Cpu name="CPU 3" color="#708D81" />
          <Cpu name="CPU 4" color="#8C4843" />

          <div className="informations">
            <div className="info">
              <div className="info-header">
                <FiSave />
                <h2>Memória</h2>
              </div>
              <h3>57%</h3>
            </div>

            <div className="info">
              <div className="info-header">
                <FiPieChart />
                <h2>Quantum</h2>
              </div>
              <h3>3</h3>
            </div>

            <div className="info">
              <div className="info-header">
                <FiClock />
                <h2>Tempo</h2>
              </div>
              <div className="increment-time">
                <h3>10</h3>
                <button>
                  <FiPlus />
                </button>
              </div>
            </div>

            <div  className="info">
              <label for="arquivo">Enviar arquivo</label>
              <input type="file" onChange={(e) => showFile(e)} id="arquivo" />
            </div>
          </div>
        </div>
        <div className='containerBox'>
          <Box name="New" />
          <Box name="Ready" />
          <Box name="Running" />
          <Box name="Blocked" />
          <Box name="Exit" />
        </div>
      </div>
    </div>
  );
}


export default LandingPage;