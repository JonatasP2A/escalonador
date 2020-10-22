import React from 'react';
import './styles.css';
import { CgTranscript } from 'react-icons/cg';
//import { useLogContext } from '../../store/Log';

const Log = (props) => {

  //const storeLog = useLogContext();

  /*const mountLogPost = (post) =>{
    return(
    <h1>teste</h1>
    );
  }*/

  return (
    <div>
      <div className="titleLog">
        <CgTranscript />
        <h1 className="text">Log</h1>
      </div>
      <div className="containerLog">
      
      </div>
    </div>
  );
}

export default Log;