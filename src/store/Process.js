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
      updateReadyProcessToRunning: (cpus, reverse_flag) => {
        return ProcessService.updateReadyProcessToRunning(process, cpus, reverse_flag).then((obj) => {
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
      },
      checkPrinterInterruption: (printers, cpus) => {
        return ProcessService.checkPrinterInterruption(process, printers, cpus).then((obj) => {
          setProcess(obj.process);
          return (obj);
        });
      },
      checkEndOfPrinterInterruption: (printers) => {
        return ProcessService.checkEndOfPrinterInterruption(process, printers).then((obj) => {
          setProcess(obj.process);
          return (obj); 
        });
      },
      checkDiskInterruption: (disks, cpus) => {
        return ProcessService.checkDiskInterruption(process, disks, cpus).then((obj) => {
          setProcess(obj.process);
          return (obj); //resolve({ process, disks, cpus, modifiedProcess });
        });
      },
      checkEndOfDiskInterruption: (disks) => {
        return ProcessService.checkEndOfDiskInterruption(process, disks).then((obj) => {
          setProcess(obj.process);
          return (obj); //resolve({ process, disks, modifiedProcess });
        });
      },
    }
  }
}