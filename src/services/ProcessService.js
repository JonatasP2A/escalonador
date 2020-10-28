import { PROCESS_STATE } from "../constants";

const formatData = (text) => {

  const lines = text.split("\n");
  let vetor = [];

  for (var i = 0; i < lines.length; i++) {
    lines[i] = lines[i].replace(/\s/g, '');
    const text = lines[i].split(',');

    const aux = {
      id: null,
      state: PROCESS_STATE.NEW,
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

export const readFile = (e) => new Promise((resolve, reject) => {

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

export const setIdForProcessList = (process) => new Promise((resolve, reject) => {

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

export const updateNewProcessToReady = (process, memoryFreeSize) => new Promise((resolve, reject) => { 
  try {
    let modifiedProcess = [];
    for (let i = 0; i < process.length; i++) {
      if (memoryFreeSize >= process[i].Mbytes && process[i].state == PROCESS_STATE.NEW) { //Tem memória livre e o processo é novo? 
        memoryFreeSize = memoryFreeSize - process[i].Mbytes;
        process[i].state = PROCESS_STATE.READY;
        modifiedProcess.push(process[i]);
      }
    }
    resolve( {process, memoryFreeSize, modifiedProcess});
  }catch(error){
    console.log("Erro ao mudar estado do processo: ", error);
  }
});