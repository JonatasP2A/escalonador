import React, { useState } from 'react';
import { FiSave, FiPieChart, FiClock, FiPlus } from 'react-icons/fi';
import Header from '../components/Header';
import Box from '../components/Box';
import Cpu from '../components/Cpu';
import './styles.css';
import { useProcessContext } from '../store/Process';
import Log from '../components/Log' 
//import { useLogContext } from '../store/Log';



const LandingPage = () => {
  const storeProcess = useProcessContext();
  //const storeLog = useLogContext();
  const [time, setTime] = useState(0);

  const incrementTime = () => {
    if(storeProcess.data.process.length > 0)
      setTime(time + 1);
  }

  /*storeLog.actions.addNewLog({
    message: "Novo log adicionado",
    time: 1
  });*/

  return (
    <div id="page-landing">
      <Header />
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
                <h3>{time}</h3>
                <button onClick={() => {incrementTime()}}>
                  <FiPlus />
                </button>
              </div>
            </div>

            <div className="info">
              <label for="arquivo">Enviar arquivo</label>
              <input type="file" onChange={(e) => storeProcess.actions.updateProcessListByFile(e)} id="arquivo" />
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
        <Log/>
      </div>
    </div>
  );
}


export default LandingPage;