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
      updateWaitingProcessToNew: (currentTime) => { //Passa os processos de esperando para novo
        return ProcessService.updateWaitingProcessToNew(process, currentTime).then((obj) => {
          setProcess(obj.process);
          return (obj); //Retorna lista com todos os processos que mudaram de estado e qtd de memória livre
        });
      },
      updateNewProcessToReady: (memoryFreeSize) => { //Passa os processos de novo para pronto se tiver memória
        return ProcessService.updateNewProcessToReady(process, memoryFreeSize).then((obj) => {
          setProcess(obj.process);
          return (obj); //Retorna lista com todos os processos que mudaram de estado e qtd de memória livre
        });
      },
      updateReadyProcessToRunning: (cpus) => {
        return ProcessService.updateReadyProcessToRunning(process, cpus).then((obj) => {
          setProcess(obj.process);
          return (obj);
        });
      },
      checkEndOfExecution: (memoryFreeSize, cpus) => {
        return ProcessService.checkEndOfExecution(process, cpus, memoryFreeSize).then((obj) => {
          setProcess(obj.process);
          return (obj); //Retorna lista com todos os processos que mudaram de estado e qtd de memória livre
        });
      },
      generateTimeSliceInterruption: (cpus) => {
        return ProcessService.generateTimeSliceInterruption(process, cpus).then((obj) => {
          setProcess(obj.process);
          return (obj);
        });
      }
    }
  }
}