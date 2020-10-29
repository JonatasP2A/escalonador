import React, { useEffect } from 'react';
import { FiSave, FiPieChart, FiClock, FiPlus } from 'react-icons/fi';
import Header from '../components/Header';
import Box from '../components/Box';
import Cpu from '../components/Cpu';
import './styles.css';
import { useProcessContext } from '../store/Process';
import Log from '../components/Log'
import { useLogContext } from '../store/Log';
import { useTimeContext } from '../store/Time';
import { useMemoryContext } from '../store/Memory';


const LandingPage = () => { //Vulgo PLACA MÃE

  const storeProcess = useProcessContext();
  const storeLog = useLogContext();
  const storeTime = useTimeContext();
  const storeMemoryFreeSize = useMemoryContext();

  const generateLog = async (msg, time) => {
    await storeLog.actions.addNewLog({
      message: msg,
      time: time
    });
  }


  const incrementTime = () => {
    if (storeProcess.data.process.length > 0) {
      storeTime.actions.incrementTime();
      generateLog("Tempo incrementado", storeTime.data.time);
    }
  }

  useEffect(() => { //Chamado sempre que o tempo é incrementado

    async function updateWaitingProcessToNew() {
      let response = await storeProcess.actions.updateWaitingProcessToNew(storeTime.data.time); //Chama atualização dos processos (esperando -> novo)

      if (response) {
        // //Gerando Log
        // let logMsg = "";
        // for (let i = 0; i < response.modifiedProcess.length; i++) {        //Capturando apenas quem mudou de estado
        //   logMsg = logMsg + 'P' + response.process[i].id + ', ';
        // }

        // if (logMsg.length > 0) {
        //   logMsg = logMsg + " passaram para pronto";  //Pode trocar esse texto aqui quem quiser de boaa
        //   generateLog(logMsg, storeTime.data.time);
        // }
      }
    }

    async function updateNewProcessToReady() {
      let response = await storeProcess.actions.updateNewProcessToReady(storeMemoryFreeSize.data.memoryFreeSize); //Chama atualização dos processos (novo -> pronto)

      if (response) {
        if (response.memoryFreeSize) { //Atualiza memória
          storeMemoryFreeSize.actions.setNewFreeMemoryValue(response.memoryFreeSize); //Chama set para novo valor de memória
        }

        // //Gerando Log
        // let logMsg = "";
        // for (let i = 0; i < response.modifiedProcess.length; i++) {        //Capturando apenas quem mudou de estado
        //   logMsg = logMsg + 'P' + response.process[i].id + ', ';
        // }

        // if (logMsg.length > 0) {
        //   logMsg = logMsg + " passaram para pronto";  //Pode trocar esse texto aqui quem quiser de boaa
        //   generateLog(logMsg, storeTime.data.time);
        // }
      }
    }


    updateWaitingProcessToNew();
    updateNewProcessToReady();
  }, [storeTime.data.time]);

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
              <h3>{storeMemoryFreeSize.data.memorySize - storeMemoryFreeSize.data.memoryFreeSize}/{storeMemoryFreeSize.data.memorySize}</h3>
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
                <h3>{storeTime.data.time}</h3>
                <button onClick={() => { incrementTime() }}>
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
          <Box name="Waiting" />
          <Box name="New" />
          <Box name="Ready" />
          <Box name="Running" />
          <Box name="Blocked" />
          <Box name="Exit" />
        </div>
        <Log />
      </div>
    </div>
  );
}


export default LandingPage;