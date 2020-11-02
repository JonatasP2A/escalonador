import { PROCESS_STATE, COLOR } from "../constants";

const formatData = (text) => {

  const lines = text.split("\n");
  let vetor = [];

  for (var i = 0; i < lines.length; i++) {
    lines[i] = lines[i].replace(/\s/g, '');
    const text = lines[i].split(',');

    const aux = { //Montando processos
      id: null,                       //Identificador do processo
      state: PROCESS_STATE.WAITING,   //Estado do processo
      color: COLOR.PROCESS_DEFAULT,   //Cor do processo
      elapsedExecutionTime: 0,        //Contador pra identificar se o processo terminou de executar
      arrivalTime: text[0],
      priority: text[1],
      processorTime: text[2],
      Mbytes: text[3],
      printers: text[4],
      disks: text[5]
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
        else if (cpus.cpu3.id < 0) {
          process[i].state = PROCESS_STATE.RUNNING;
          cpus.cpu3.id = process[i].id;
          process[i].color = cpus.cpu3.color;
          modifiedProcess.push(process[i]);
        }
      }
    }

    resolve({ process, cpus, modifiedProcess });
  } catch (error) {
    reject(error)
  }
});

export const checkEndOfExecution = (process, cpus, memoryFreeSize) => new Promise((resolve, reject) => {
  try {
    let modifiedProcess = [];
    for (let i = 0; i < process.length; i++) {
      if (process[i].state === PROCESS_STATE.RUNNING) {
        if (process[i].elapsedExecutionTime >= process[i].processorTime) { // Processo acabou de executar?
          process[i].state = PROCESS_STATE.EXIT;
          process[i].color = COLOR.PROCESS_DEFAULT;
          memoryFreeSize = memoryFreeSize + parseInt(process[i].Mbytes);
          //console.log("Cpus antes: ", cpus);
          cpus = resetCpu(process[i].id, cpus);
          modifiedProcess.push(process[i]);
        } else {
          process[i].elapsedExecutionTime = process[i].elapsedExecutionTime + 1;  // Se não acabou de executar, adiciona +1 ao tempo de execução
        }  
      }
    }
    resolve({ process, memoryFreeSize, cpus, modifiedProcess});
  } catch (error) {
    reject(error);
  }
});

//generateTimeSliceInterruption

export const generateTimeSliceInterruption = (process, cpus) => new Promise((resolve, reject) => {
  try {
    let modifiedProcess = [];
    for (let i = 0; i < process.length; i++) {
      if (process[i].state === PROCESS_STATE.RUNNING) {
          process[i].state = PROCESS_STATE.READY;
          process[i].color = COLOR.PROCESS_DEFAULT;
          cpus = resetCpu(process[i].id, cpus);
          modifiedProcess.push(process[i]);
      }
    }

    resolve({ process, cpus, modifiedProcess });
  } catch (error) {
    reject(error)
  }
});

const resetCpu = (processId, cpus) => { //Apaga Id do processo que estava na cpu

  //console.log("Nossas cpus: ", cpus);


  if (cpus.cpu0.id === processId) {
    cpus.cpu0.id = -1;
  }else if (cpus.cpu1.id === processId) {
    cpus.cpu1.id = -1;
  }else if (cpus.cpu2.id === processId) {
    cpus.cpu2.id = -1;
  }else if (cpus.cpu3.id === processId) {
    cpus.cpu3.id = -1;
  }
  return cpus; 
}