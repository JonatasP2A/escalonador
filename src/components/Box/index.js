import React from 'react';
import { FiTruck } from 'react-icons/fi';
import Processo from '../Processo';

import './styles.css';

const Box = () => {
  return (
    <div className="bloco">
      <div className="title">
        <FiTruck size={24} color="#000" />
        <h1 className="text">New</h1>
      </div>

      <div className="content">
        <Processo />
      </div>
    </div>
  );
}

export default Box;