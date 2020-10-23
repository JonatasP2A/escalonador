import { useContext, useState } from "react";
import { StoreContext } from ".";
import { ProcessService } from "../services"


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
      updateProcessListByFile: (e) => {
        ProcessService.readFile(e).then(newVector => {
          ProcessService.setIdForProcessList(process.concat(newVector)).then(result => {
            setProcess(result);
          }).catch(erro => {
            console.log("Erro ao setar ID: ", erro);
          });
        }).catch(erro => {
          console.log("Erro ao ler arquivo", erro);
        });
      },
      updateNewProcessToReady: (memoryFreeSize) => {
        ProcessService.updateNewProcessToReady(process, memoryFreeSize).then((obj) => {
          setProcess(obj.process);
          return (obj.memoryFreeSize);
        });
      }
    }
  }
}