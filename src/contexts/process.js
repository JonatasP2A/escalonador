import { useContext, useState } from "react";
import { StoreContext } from ".";


export const useProcessContext = () => {
  const store = useContext(StoreContext);
  return store.process;
}

export const __useProcessData = () => {
  const [process, setProcess] = useState([]);

  return {
    data: {
      process,
    },
    actions: {
      addVector: (value) => {
        let aux = process;
        for(let i = 0; i < value.length; i++)
          aux.push(value[i]);

        setProcess(aux);

        console.log("process", process);

        //setProcess(value);

        //console.log("process", process);
      }
    }
  }
}