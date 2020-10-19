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
          <h2>Arrive: {props.arrive}</h2>
          {props.priority === 1 ? <h2>Prioridade: 1(usuário)</h2> : <h2>Prioridade: 0(Tempo real)</h2> }
          <h2>Duration: {props.processorTime}</h2>
          <h2>Memory: {props.Mbytes}MB</h2>
          <h2>Impressora: {props.printers}</h2>
          <h2>Disco: {props.disks}</h2>
        </div>
      </div>
    </div>
  );
}

export default Processo;