import React from 'react';
import { FiTruck, FiCheck, FiPlay, FiLock, FiLogOut } from 'react-icons/fi';
import Processo from '../Processo';
import { useProcess } from '../../contexts/process';

import './styles.css';



const Box = ({ name }) => {

  const { process } = useProcess();
  console.log(process.length);
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
        {process.map(process => (
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