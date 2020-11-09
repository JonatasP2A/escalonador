import { useContext, useState } from "react";
import { StoreContext } from ".";

export const useDiskContext = () => {
  const store = useContext(StoreContext);
  return store.disk;
}

export const __useDiskData = () => {
  const [disk0, setDisk0] = useState({ id: -1}); //id do processo em execução na impressora
  const [disk1, setDisk1] = useState({ id: -1}); //id do processo em execução na impressora


  return {
    data: {
      disk0,
      disk1
    },
    actions: {
      setDisks: (obj) => {
        setDisk0(obj.disk0);
        setDisk1(obj.disk1);
      }
    }
  }
}