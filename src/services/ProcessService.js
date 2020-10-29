import { PROCESS_STATE } from "../constants";

const formatData = (text) => {

  const lines = text.split("\n");
  let vetor = [];

  for (var i = 0; i < lines.length; i++) {
    lines[i] = lines[i].replace(/\s/g, '');
    const text = lines[i].split(',');

    const aux = { //Montando processos
      id: null,
      state: PROCESS_STATE.WAITING,
      arrivalTime: text[0],
      priority: text[1],
      processorTime: text[2],
      Mbytes: text[3],
      printers: text[4],
      disks: text[5],
      color: null
    }
    vetor.push(aux);
  }
  return vetor;
}

export const readFile = (e) => new Promise((resolve, reject) => { //Lendo arquivo

  e.preventDefault();
  try {
    const reader = new FileReader();
    reader.onload = async (e) => {
      resolve(formatData(e.target.result));
    };
    reader.readAsText(e.target.files[0])
  } catch (error) {
    reject(error);
  }
});

export const setIdForProcessList = (process) => new Promise((resolve, reject) => { //Atribuindo ID para os processos

  let id = 0;
  console.log(process);
  for (let i = 0; i < process.length; i++) {
    if (process[i].id != null) {
      id = process[i].id + 1;
    } else {
      process[i].id = id;
      id++;
    }
  }
  resolve(process);
});

export const updateWaitingProcessToNew = (process, currentTime) => new Promise((resolve, reject) => {  // (WAITING -> NEW)
  try {
    let modifiedProcess = []; //Criado apenas para logs
    for (let i = 0; i < process.length; i++) {
      if (process[i].state === PROCESS_STATE.WAITING && process[i].arrivalTime === currentTime.toString()) { // Processo está esperando e tempo "Arrive" é igual ao tempo atual?
        process[i].state = PROCESS_STATE.NEW;
        modifiedProcess.push(process[i]);
      }
    }
    resolve({ process, modifiedProcess });
  } catch (error) {
    console.log("Erro ao mudar estado do processo: (WAITING -> NEW)", error);
  }
});


export const updateNewProcessToReady = (process, memoryFreeSize) => new Promise((resolve, reject) => {  // (NEW -> READY)
  try {
    let modifiedProcess = []; // Criado apenas para logs
    for (let i = 0; i < process.length; i++) {
      if (memoryFreeSize >= process[i].Mbytes && process[i].state === PROCESS_STATE.NEW) { //Tem memória livre e o processo é novo? 
        memoryFreeSize = memoryFreeSize - process[i].Mbytes;
        process[i].state = PROCESS_STATE.READY;
        modifiedProcess.push(process[i]);
      }
    }
    resolve({ process, memoryFreeSize, modifiedProcess });
  } catch (error) {
    console.log("Erro ao mudar estado do processo: (NEW -> READY)", error);
  }
});

export const updateReadyProcessToRunning = (process, cpus) => new Promise((resolve, reject) => {
  try {
    let modifiedProcess = [];
    for (let i = 0; i < process.length; i++) {
      if (process[i].state === PROCESS_STATE.READY) {
        if (cpus.cpu0.id < 0) {
          process[i].state = PROCESS_STATE.RUNNING;
          cpus.cpu0.id = process[i].id;
          process[i].color = cpus.cpu0.color;
          modifiedProcess.push(process[i]);
        }
        else if (cpus.cpu1.id < 0) {
          process[i].state = PROCESS_STATE.RUNNING;
          cpus.cpu1.id = process[i].id;
          process[i].color = cpus.cpu1.color;
          modifiedProcess.push(process[i]);
        }
        else if (cpus.cpu2.id < 0) {
          process[i].state = PROCESS_STATE.RUNNING;
          cpus.cpu2.id = process[i].id;
          process[i].color = cpus.cpu2.color;
          modifiedProcess.push(process[i]);
        }
        else if(cpus.cpu3.id < 0){
          process[i].state = PROCESS_STATE.RUNNING;
          cpus.cpu3.id = process[i].id;
          process[i].color = cpus.cpu3.color;
          modifiedProcess.push(process[i]);
        }
      }
    }

    resolve({process, cpus, modifiedProcess});
  } catch (error) {

  }
});