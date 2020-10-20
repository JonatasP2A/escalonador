import React from 'react';
import { FiTruck, FiCheck, FiPlay, FiLock, FiLogOut } from 'react-icons/fi';
import Processo from '../Processo/index'
import { useProcessContext } from '../../contexts/Process';
import './styles.css';



const Box = ({ name }) => {

  const storeProcess = useProcessContext();

  //console.log("Dentro de box: ", storeProcess.data.process);

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
          <Processo
            arrivalTime = {process.arrivalTime}
            priority = {process.priority}
            processorTime = {process.processorTime}
            Mbytes = {process.Mbytes}
            printers = {process.printers}
            disks = {process.disks}
          
          />
        ))}
      </div>}
    </div>
  );
}

export default Box;