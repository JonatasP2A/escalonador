import React, { useState } from "react";
import Process from './components/Process/index';
import Cpu from './components/Cpu/index';
import './styles.css';
import { PROCESS_STATE } from "./constants";

const App = () => {

  return (
    <>
      <p className='pageTitle'>Escalonador de processos</p>
      <div className='App' style={{ padding: 10 }}>
        <Cpu
          id={0}
          process={2}//Arrumar uma forma de só com o Id identificar todos os atributos do processo
        />
        <br />
        <Cpu
          id={1}
          process={5}//Arrumar uma forma de só com o Id identificar todos os atributos do processo
        />
        <br />
        <Cpu
          id={2}
          process={1}//Arrumar uma forma de só com o Id identificar todos os atributos do processo
        />
        <br />
        <Cpu
          id={3}
          process={15}//Arrumar uma forma de só com o Id identificar todos os atributos do processo
        />
        <br />
        <Process
          id={30}
          stateProcess={PROCESS_STATE.READY}
        />
        <Process
          id={31}
          stateProcess={PROCESS_STATE.BLOCKED}
        />

      </div>
    </>
  );
}

export default App;