import React, { useEffect, useState } from 'react';
import './styles.css';
import { CgTranscript } from 'react-icons/cg';
import { useLogContext } from '../../store/Log';

const Log = (props) => {

  const storeLog = useLogContext();
  const [auxLogList, setAuxLogList] = useState(storeLog.data.logPosts);

  const mountLogPost = (post) => {
    return (
      <div className="containerPost">
        <p className="menssageLog">{post.message}</p>
        <p className="timeLog">Tempo: {post.time}</p>
      </div>
    );
  }

  useEffect(() => {//Atualizando lista de logs
    setAuxLogList(storeLog.data.logPosts);
  }, [storeLog.data.logPosts]);

  return (
    <div>
      <div className="titleLog">
        <CgTranscript />
        <h1 className="text">Log</h1>
      </div>
      <div className="containerLog">
        {auxLogList.map(log => (
          mountLogPost(log)
        ))}
      </div>
    </div>
  );
}

export default Log;