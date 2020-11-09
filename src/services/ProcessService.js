import { PROCESS_STATE, PROCESS_PRIORITY, COLOR, MAX_INTERRUPTION_TIME } from "../constants";

const formatData = (text) => {

  const lines = text.split("\n");
  let vetor = [];

  for (var i = 0; i < lines.length; i++) {
    lines[i] = lines[i].replace(/\s/g, '');
    const text = lines[i].split(',');

    const aux = { //Montando processos
      id: null,                           //Identificador do processo
      state: PROCESS_STATE.WAITING,       //Estado do processo
      color: COLOR.PROCESS_DEFAULT,       //Cor do processo
      elapsedExecutionTime: 0,            //Contador pra identificar se o processo terminou de executar
      elapsedPrinterInterruptionTime: 0,  //Contador para identificar se a interrupção por impressora já acabou
      elapsedDiskInterruptionTime: 0,     //Contador para identificar se a interrupção por disco já acabou
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
    resolve({ process, memoryFreeSize, cpus, modifiedProcess });
  } catch (error) {
    reject(error);
  }
});

export const generateTimeSliceInterruption = (process, cpus) => new Promise((resolve, reject) => {
  try {
    let modifiedProcess = [];
    for (let i = 0; i < process.length; i++) {
      if (process[i].state === PROCESS_STATE.RUNNING && process[i].priority === PROCESS_PRIORITY.USER) { //Está rodando e é um processo do usuário (Se for tempo real, não sofre interrupção)
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

  if (cpus.cpu0.id === processId) {
    cpus.cpu0.id = -1;
  } else if (cpus.cpu1.id === processId) {
    cpus.cpu1.id = -1;
  } else if (cpus.cpu2.id === processId) {
    cpus.cpu2.id = -1;
  } else if (cpus.cpu3.id === processId) {
    cpus.cpu3.id = -1;
  }
  return cpus;
}

export const checkPrinterInterruption = (process, printers, cpus) => new Promise((resolve, reject) => {  //Gera interrupção por impressora
  try {
    let modifiedProcess = [];

    for (let i = 0; i < process.length; i++) {
      if ((process[i].state === PROCESS_STATE.RUNNING || process[i].state === PROCESS_STATE.BLOCKED) && parseInt(process[i].printers) >= 1) {

        if (printers.printer0.id < 0) { //impressora 0 livre
          printers.printer0.id = process[i].id;
          process[i].state = PROCESS_STATE.BLOCKED_PRINTER;
          process[i].color = COLOR.PROCESS_DEFAULT;
          modifiedProcess.push(process[i]);
        } else if (printers.printer1.id < 0) { //Impressora 1 livre
          printers.printer1.id = process[i].id;
          process[i].state = PROCESS_STATE.BLOCKED_PRINTER;
          process[i].color = COLOR.PROCESS_DEFAULT;
          modifiedProcess.push(process[i]);
        } else {                              //Nenhuma impressora livre. Processo deve esperar
          process[i].state = PROCESS_STATE.BLOCKED;
          process[i].color = COLOR.PROCESS_DEFAULT;
          modifiedProcess.push(process[i]);
        }
        cpus = resetCpu(process[i].id, cpus);
      }
    }
    resolve({ process, printers, cpus, modifiedProcess });
  } catch (error) {
    reject(error);
  }
});

export const checkEndOfPrinterInterruption = (process, printers) => new Promise((resolve, reject) => {  //Encerra interrupção por impressora
  try {
    let modifiedProcess = [];
    for (let i = 0; i < process.length; i++) {
      if (process[i].state === PROCESS_STATE.BLOCKED_PRINTER) {  
        if (parseInt(process[i].elapsedPrinterInterruptionTime) >= MAX_INTERRUPTION_TIME) { //Quando terminar a execução da impressora, remover process[i].printers
          process[i].state = PROCESS_STATE.READY;
          process[i].printers = '0';  //Para não solicitar mais a impressora
          modifiedProcess.push(process[i]);
          if (printers.printer0.id === process[i].id) {
            printers.printer0.id = -1;
          } else {
            printers.printer1.id = -1;
          }
        }
        else {
          process[i].elapsedPrinterInterruptionTime = process[i].elapsedPrinterInterruptionTime + 1;
        }
      }
    }
    resolve({ process, printers, modifiedProcess });
  } catch (error) {
    reject(error);
  }
});


export const checkDiskInterruption = (process, disks, cpus) => new Promise((resolve, reject) => {  //Gera interrupção por impressora
  try {
    let modifiedProcess = [];
    for (let i = 0; i < process.length; i++) {
      if ((process[i].state === PROCESS_STATE.RUNNING) && (parseInt(process[i].printers) <= 0 && (parseInt(process[i].disks) >= 1 ))){    //Só executa discos após impressoras
        if (disks.disk0.id < 0) { //disco 0 livre
          disks.disk0.id = process[i].id;
          process[i].state = PROCESS_STATE.BLOCKED_DISK;
          process[i].color = COLOR.PROCESS_DEFAULT;
          modifiedProcess.push(process[i]);
        } else if (disks.disk1.id < 0) { //disco 1 livre
          disks.disk1.id = process[i].id;
          process[i].state = PROCESS_STATE.BLOCKED_DISK;
          process[i].color = COLOR.PROCESS_DEFAULT;
          modifiedProcess.push(process[i]);
        } else {                              //Nenhum disco livre. Processo deve esperar
          process[i].state = PROCESS_STATE.BLOCKED;
          process[i].color = COLOR.PROCESS_DEFAULT;
          modifiedProcess.push(process[i]);
        }
        cpus = resetCpu(process[i].id, cpus);
      }
    }
    resolve({ process, disks, cpus, modifiedProcess });
  } catch (error) {
    reject(error);
  }
});


export const checkEndOfDiskInterruption = (process, disks) => new Promise((resolve, reject) => {  //Encerra interrupção por impressora
  try {
    let modifiedProcess = [];
    for (let i = 0; i < process.length; i++) {
      if (process[i].state === PROCESS_STATE.BLOCKED_DISK) {  
        if (parseInt(process[i].elapsedDiskInterruptionTime) >= MAX_INTERRUPTION_TIME) { //Quando terminar a execução do disco, remover process[i].disks
          process[i].state = PROCESS_STATE.READY;
          process[i].disks = '0';  //Para não solicitar mais a impressora
          modifiedProcess.push(process[i]);
          if (disks.disk0.id === process[i].id) {
            disks.disk0.id = -1;
          } else {
            disks.disk1.id = -1;
          }
        }
        else {
          process[i].elapsedDiskInterruptionTime = process[i].elapsedDiskInterruptionTime + 1;
        }
      }
    }
    resolve({ process, disks, modifiedProcess });
  } catch (error) {
    reject(error);
  }
});