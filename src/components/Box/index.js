import React from 'react';
import { FiTruck, FiCheck, FiPlay, FiLock, FiLogOut } from 'react-icons/fi';
import Processo from '../Processo';

import './styles.css';

const Box = ({ name }) => {
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

      <div className="content">
        <Processo />
      </div>
    </div>
  );
}

export default Box;