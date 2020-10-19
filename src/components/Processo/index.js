import React from 'react';

import './styles.css';

const Processo = (props) => {
  return (
    <div className="container">
      <div className="circle">
        <h1 className="circle">P{props.id}</h1>
        <div className="info">
          <h2>Arrive: 2</h2>
          <h2>Priority: 1(user)</h2>
          <h2>Duration: 15</h2>
          <h2>Memory: 64MB</h2>
          <h2>Impressora: 0</h2>
          <h2>Disco: 0</h2>
        </div>
      </div>
    </div>
  );
}

export default Processo;