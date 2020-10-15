import React from "react";
// import Process from './components/Process/index';
// import Cpu from './components/Cpu/index';
// import { PROCESS_STATE } from "./constants";
import Header from './components/Header';
import Box from './components/Box';
import Cpu from './components/Cpu';
import './styles.css';

const App = () => {
  return (
    <div>
      <Header />
      <div className='allBox'>
        <div className ='containerCpu'>
          <Cpu />
          <Cpu />
          <Cpu />
          <Cpu />
        </div>
        <div className='containerBox'>
          <div className='boxGrid'><Box /></div>
          <div className='boxGrid'><Box /></div>
          <div className='boxGrid'><Box /></div>
          <div className='boxGrid'><Box /></div>
          <div className='boxGrid'><Box /></div>
        </div>
      </div>
    </div>
  );
}

export default App;