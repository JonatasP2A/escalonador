import React from 'react';

import './styles.css';
//<arrival time>, <priority>, <processor time>, <#Mbytes>, <# impressoras>, <# disco>
//{name === "New" && <FiTruck />}
const Processo = (props) => {
  return (
    <div className="container">
      <div className="circle">
        <h1 className="circle">P{props.id}</h1>
        <div className="info">
          <p>Arrive: {props.arrivalTime}</p>
          {props.priority === '1' ? <p>Prioridade: 1 (usuário)</p> : <p>Prioridade: 1 (Tempo real)</p> }
          <p>Duration: {props.processorTime}</p>
          <p>Memory: {props.Mbytes}MB</p>
          <p>Impressora: {props.printers}</p>
          <p>Disco: {props.disks}</p>
        </div>
      </div>
    </div>
  );
}

export default Processo;