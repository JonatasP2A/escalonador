import { useContext, useState } from "react";
import { StoreContext } from ".";
import { COLOR } from "../constants";


export const useCpuContext = () => {
  const store = useContext(StoreContext);
  return store.cpu;
}

export const __useCpuData = () => {
  const [cpu0, setCpu0] = useState({ id: -1, color: COLOR.CPU0 }); //id do processo em execução
  const [cpu1, setCpu1] = useState({ id: -1, color: COLOR.CPU1 }); //id do processo em execução
  const [cpu2, setCpu2] = useState({ id: -1, color: COLOR.CPU2 }); //id do processo em execução
  const [cpu3, setCpu3] = useState({ id: -1, color: COLOR.CPU3 }); //id do processo em execução


  return {
    data: {
      cpu0,
      cpu1,
      cpu2,
      cpu3
    },
    actions: {
      setCpus: (obj) => {
        setCpu0(obj.cpu0);
        setCpu1(obj.cpu1);
        setCpu2(obj.cpu2);
        setCpu3(obj.cpu3);
      }
    }
  }
}