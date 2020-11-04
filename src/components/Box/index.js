import React from 'react';
import { FiTruck, FiCheck, FiPlay, FiLock, FiLogOut, FiClock, FiDatabase, FiPrinter } from 'react-icons/fi';
import Processo from '../Processo/index'
import { useProcessContext } from '../../store/Process';
import './styles.css';
import { PROCESS_STATE } from '../../constants'


const Box = ({ name }) => {

  const storeProcess = useProcessContext();

  const mountProcess = (process) => {


    return (
      <Processo
        key={process.id}
        id={process.id}
        arrivalTime={process.arrivalTime}
        priority={process.priority}
        processorTime={process.processorTime}
        Mbytes={process.Mbytes}
        printers={process.printers}
        disks={process.disks}
        color={process.color}
      />
    );
  }

  return (
    <div className="bloco">
      <div className="title">
        {name === "Waiting" && <FiClock/>}
        {name === "New" && <FiTruck />}
        {name === "Ready" && <FiCheck />}
        {name === "Running" && <FiPlay />}
        {name === "Blocked" && <FiLock />}
        {name === "Exit" && <FiLogOut />}
        {name === "Printer" && <FiPrinter />}
        {name === "Disk" && <FiDatabase />}

        <h1 className="text">{name}</h1>
      </div>

      {name === "Waiting" &&
        <div className="content">
          {storeProcess.data.process.map(process => (
            process.state === PROCESS_STATE.WAITING ? mountProcess(process) : null
          ))}
        </div>}

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
            process.state === PROCESS_STATE.BLOCKED_PRINTER || process.state === PROCESS_STATE.BLOCKED_DISK || process.state === PROCESS_STATE.BLOCKED ? mountProcess(process) : null
          ))}
        </div>}

      {name === "Exit" &&
        <div className="content">
          {storeProcess.data.process.map(process => (
            process.state === PROCESS_STATE.EXIT ? mountProcess(process) : null
          ))}
        </div>}

        {name === "Printer" &&
        <div className="content">
          {storeProcess.data.process.map(process => (
            process.state === PROCESS_STATE.BLOCKED_PRINTER ? mountProcess(process) : null
          ))}
        </div>}

        {name === "Disk" &&
        <div className="content">
          {storeProcess.data.process.map(process => (
            process.state === PROCESS_STATE.BLOCKED_DISK ? mountProcess(process) : null
          ))}
        </div>}
    </div>
  );
}

export default Box;
