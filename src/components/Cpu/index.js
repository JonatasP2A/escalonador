import React from 'react';
import { FiMonitor } from 'react-icons/fi';

import './styles.css';

const Cpu = ({ name, color }) => {
  return (
    <div className="cpuLegend">
      <FiMonitor size={24} color={color} />
      <h1 className = 'text' style={{ color: color }}>{name}</h1>
    </div>
  );
}

export default Cpu;