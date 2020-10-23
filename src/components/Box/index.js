import React/*, { useState, useEffect }*/ from 'react';
import { FiTruck, FiCheck, FiPlay, FiLock, FiLogOut } from 'react-icons/fi';
import Processo from '../Processo/index'
import { useProcessContext } from '../../store/Process';
import './styles.css';
import { PROCESS_STATE } from '../../constants'
//import { useLogContext } from '../../store/Log';
//import { useTimeContext } from '../../store/Time';


const Box = ({ name }) => {

  const storeProcess = useProcessContext();
  //const storeLog = useLogContext();
  //const storeTime = useTimeContext();



  const mountProcess = (process) => {

    /*storeLog.actions.addNewLog({
      message: `Processo ${process.id} requisitado`,
      time: storeTime.data.time
    });*/


    return (
      <Processo
        id={process.id}
        arrivalTime={process.arrivalTime}
        priority={process.priority}
        processorTime={process.processorTime}
        Mbytes={process.Mbytes}
        printers={process.printers}
        disks={process.disks}
      />
    );
  }

  return (
    <div className="bloco">
      <div className="title">
        {name === "New" && <FiTruck />}
        {name === "Ready" && <FiCheck />}
        {name === "Running" && <FiPlay />}
        {name === "Blocked" && <FiLock />}
        {name === "Exit" && <FiLogOut />}
        <h1 className="text">{name}</h1>
      </div>

      {name === "New" &&
        <div className="content">
          {storeProcess.data.process.map(process => (
            process.state === PROCESS_STATE.NEW ? mountProcess(process) : null
          ))}
        </div>}

      {name === "Ready" &&
        <div className="content">
          {storeProcess.data.process.map(process => (
            process.state === PROCESS_STATE.READY ? mountProcess(process) : null
          ))}
        </div>}

      {name === "Running" &&
        <div className="content">
          {storeProcess.data.process.map(process => (
            process.state === PROCESS_STATE.RUNNING ? mountProcess(process) : null
          ))}
        </div>}

      {name === "Blocked" &&
        <div className="content">
          {storeProcess.data.process.map(process => (
            process.state === PROCESS_STATE.BLOCKED ? mountProcess(process) : null
          ))}
        </div>}

      {name === "Exit" &&
        <div className="content">
          {storeProcess.data.process.map(process => (
            process.state === PROCESS_STATE.EXIT ? mountProcess(process) : null
          ))}
        </div>}
    </div>
  );
}

export default Box;