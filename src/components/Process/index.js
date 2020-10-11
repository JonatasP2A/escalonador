import React, { useState, useEffect } from 'react';
import './styles.css'
import { PROCESS_STATE, COLOR } from '../../constants';


const Process = props => {

  const [textDescription, setTextDescription] = useState(''); //Dar um jeito de setar esse cara em tempo de execução
  const [backgroundColor, setBackgroundColor] = useState(COLOR.GRAY);
  useEffect(() => {
    if(props.stateProcess === PROCESS_STATE.RUNNING){
      setTextDescription("Executando");
      setBackgroundColor(COLOR.GREEN);
    }
    else if(props.stateProcess === PROCESS_STATE.READY){
      setTextDescription("Pronto");
      setBackgroundColor(COLOR.BLUE);
    }
    else{
      setTextDescription("Bloqueado");
      setBackgroundColor(COLOR.RED);
    }
  });

  return (
    <div className='backgroundProcess' style={{ backgroundColor: backgroundColor}} >
      <h4 className='idProcess'>{props.id}</h4>
      <p className='stateProcess'>{textDescription}</p>
    </div>
  );
}

export default Process;
