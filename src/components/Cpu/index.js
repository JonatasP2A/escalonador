import React from 'react';
import './styles.css'
import Process from '../Process/index';
import { PROCESS_STATE } from "../../constants";

const Cpu = props => {

  return (
    <div className='cpuContainer'>
      <p className='cpuIdentifier'>Cpu {props.id}</p>
      <div className='processContainer'>
        <Process
          id={props.process}
          stateProcess={PROCESS_STATE.RUNNING}
        />
      </div>
    </div>
  );
}

export default Cpu;
