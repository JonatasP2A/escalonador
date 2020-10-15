import React from 'react';
import { FiMonitor } from 'react-icons/fi';

import './styles.css';

const Cpu = () => {
  return (
    <div className="cpuLegend">
      <FiMonitor size={24} color="#000" />
      <h1 className = 'text'>Cpu 1</h1>
    </div>
  );
}

export default Cpu;