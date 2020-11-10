import React, { useEffect, useState } from 'react';
import { FiSave, FiPieChart, FiClock, FiPlus, FiMinus } from 'react-icons/fi';
import Header from '../components/Header';
import Box from '../components/Box';
import Cpu from '../components/Cpu';
import './styles.css';
import { useProcessContext } from '../store/Process';
import Log from '../components/Log'
import { useLogContext } from '../store/Log';
import { useTimeContext } from '../store/Time';
import { useMemoryContext } from '../store/Memory';
import { useCpuContext } from '../store/Cpu';
import { COLOR, CHANGES } from '../constants';
import { usePrinterContext } from '../store/Printer';
import { useDiskContext } from '../store/Disk';
import MemoryChart from '../components/Chart';

let count = 0;
let logs = [];

const checkQuantum = (currentTime, quantum) => {

  if (currentTime !== 0 && count >= quantum) { //Tá certo isso?
    count = 0;
    return true; //Gera interrupção por fatia de tempo
  }
  count = count + 1;
  return false; //Não gera interrupção
}

const LandingPage = () => { //Vulgo PLACA MÃE

  const storeProcess = useProcessContext();
  const storeLog = useLogContext();
  const storeTime = useTimeContext();
  const storeMemory = useMemoryContext();
  const storeCpu = useCpuContext();
  const storePrinter = usePrinterContext();
  const storeDisk = useDiskContext();
  const [quantum, setQuantum] = useState(3);

  const generateMsgLogs = (process, msg, time) => {
    for (let i = 0; i < process.length; i++) {
      logs.push({ message: 'P' + process[i].id + msg, time: time });
    }
  }

  const generateLog = (modifiedProcess, changes) => {

    switch (changes) {
      case CHANGES.WAITING_TO_NEW:
        generateMsgLogs(modifiedProcess, " foi admitido no sistema.", storeTime.data.time);
        break;

      case CHANGES.NEW_TO_READY:
        generateMsgLogs(modifiedProcess, " passou para pronto.", storeTime.data.time);
        break;

      case CHANGES.READY_TO_RUNNING:
        generateMsgLogs(modifiedProcess, " entrou em execução", storeTime.data.time);
        break;

      case CHANGES.RUNNING_TO_EXIT:
        generateMsgLogs(modifiedProcess, " terminou a execução", storeTime.data.time);
        break;

      case CHANGES.RUNNING_TO_READY:
        generateMsgLogs(modifiedProcess, " sofreu interrupção por fatia de tempo", storeTime.data.time);
        break;

      case CHANGES.RUNNING_TO_BLOCKED_BY_PRINTER:
        generateMsgLogs(modifiedProcess, " solicitou a impressora", storeTime.data.time);
        break;

      case CHANGES.RUNNING_TO_BLOCKED_BY_DISK:
        generateMsgLogs(modifiedProcess, " solicitou acesso ao disco", storeTime.data.time);
        break;

      case CHANGES.RUNNING_TO_BLOCKED:
        generateMsgLogs(modifiedProcess, "solicitou acesso ao disco ou a impressora, porém eles estavam ocupados", storeTime.data.time);
        break;

      case CHANGES.BLOCKED_BY_PRINTER_TO_RUNNING:
        generateMsgLogs(modifiedProcess, " terminou de usar a impressora", storeTime.data.time);
        break;

      case CHANGES.BLOCKED_BY_DISK_TO_RUNNING:
        generateMsgLogs(modifiedProcess, " terminou de usar o disco", storeTime.data.time);
        break;

      default:
        break;
    }
  }

  const showLogs = () => {
    storeLog.actions.addNewLog(logs);
  }

  const incrementTime = () => {
    if (storeProcess.data.process.length > 0)
      storeTime.actions.incrementTime();
  }

  //Funções de atualização de processos

  const updateWaitingProcessToNew = async () => {
    return await storeProcess.actions.updateWaitingProcessToNew(storeTime.data.time);
  }

  const updateNewProcessToReady = async () => {
    return await storeProcess.actions.updateNewProcessToReady(storeMemory.data.memoryFreeSize).then((response) => {
      if (response.memoryFreeSize) {

        checkEndOfExecution(response.memoryFreeSize).then((obj) => {
          if (obj.modifiedProcess.length > 0)
            generateLog(obj.modifiedProcess, CHANGES.RUNNING_TO_EXIT);
        }); //Fazendo dessa forma para evitar duas escritas na memória na mesma interação
        return response;
      }
    });
  }

  const checkEndOfExecution = async (memoryFreeSize) => {
    return await storeProcess.actions.checkEndOfExecution(memoryFreeSize, storeCpu.data).then((response) => {
      if (response.memoryFreeSize) {
        storeMemory.actions.setNewFreeMemoryValue(response.memoryFreeSize); //Chama set para novo valor de memória
        if (response.cpus) {
          storeCpu.actions.setCpus(response.cpus);
        }
        return response;
      }
    });
  }

  const updateReadyProcessToRunning = async () => {
    return await storeProcess.actions.updateReadyProcessToRunning(storeCpu.data);
  }

  const generateTimeSliceInterruption = async () => {
    let response = await storeProcess.actions.generateTimeSliceInterruption(storeCpu.data);
    if (response) {
      storeCpu.actions.setCpus(response.cpus);
    }
    return response;
  }

  const checkPrinterInterruption = async () => {
    let response = await storeProcess.actions.checkPrinterInterruption(storePrinter.data, storeCpu.data);
    if (response) {
      storePrinter.actions.setPrinters(response.printers);
      storeCpu.actions.setCpus(response.cpus);
    }
    return response;
  }

  const checkEndOfPrinterInterruption = async () => {
    let response = await storeProcess.actions.checkEndOfPrinterInterruption(storePrinter.data);
    if (response) {
      storePrinter.actions.setPrinters(response.printers);
    }
    return response;
  }

  const checkDiskInterruption = async () => {
    let response = await storeProcess.actions.checkDiskInterruption(storeDisk.data, storeCpu.data);
    if (response) {
      storeDisk.actions.setDisks(response.disks);
      storeCpu.actions.setCpus(response.cpus);
    }
    return response;
  }

  const checkEndOfDiskInterruption = async () => {
    let response = await storeProcess.actions.checkEndOfDiskInterruption(storeDisk.data);
    if (response) {
      storeDisk.actions.setDisks(response.disks);
    }
    return response;
  }

  // Função principal chamada dentro do useEffect com a responsabilidade de atualizar os renders

  const updateAll = async () => {

    let response = await updateWaitingProcessToNew();
    if (response.modifiedProcess.length > 0) {
      generateLog(response.modifiedProcess, CHANGES.WAITING_TO_NEW);
    }

    response = await updateNewProcessToReady();
    if (response.modifiedProcess.length > 0) {
      generateLog(response.modifiedProcess, CHANGES.NEW_TO_READY);
    }

    response = await updateReadyProcessToRunning();
    if (response.modifiedProcess.length > 0) {
      generateLog(response.modifiedProcess, CHANGES.READY_TO_RUNNING);
    }

    response = await checkPrinterInterruption();
    if (response.modifiedProcess.length > 0) {
      generateLog(response.modifiedProcess, CHANGES.RUNNING_TO_BLOCKED_BY_PRINTER);
    }

    response = await checkEndOfPrinterInterruption();
    if (response.modifiedProcess.length > 0) {
      generateLog(response.modifiedProcess, CHANGES.BLOCKED_BY_PRINTER_TO_RUNNING);
    }

    response = await checkDiskInterruption();
    if (response.modifiedProcess.length > 0) {
      generateLog(response.modifiedProcess, CHANGES.RUNNING_TO_BLOCKED_BY_DISK);
    }

    response = await checkEndOfDiskInterruption();
    if (response.modifiedProcess.length > 0) {
      generateLog(response.modifiedProcess, CHANGES.BLOCKED_BY_DISK_TO_RUNNING);
    }

    if (checkQuantum(storeTime.data.time, quantum)) {
      response = await generateTimeSliceInterruption();
      if (response.modifiedProcess.length > 0) {
        generateLog(response.modifiedProcess, CHANGES.RUNNING_TO_READY);
      }
    }

    if (logs.length > 0) {
      showLogs();
      logs = [];
    }
  }


  useEffect(() => { //Chamado sempre que o tempo é incrementado
    updateAll();
  }, [storeTime.data.time]);

  return (
    <div id="page-landing">
      <Header />
      <div className='allBox'>
        <div className='containerCpu'>
          <Cpu name="CPU 1" color={COLOR.CPU0} />
          <Cpu name="CPU 2" color={COLOR.CPU1} />
          <Cpu name="CPU 3" color={COLOR.CPU2} />
          <Cpu name="CPU 4" color={COLOR.CPU3} />

          <div className="informations">
            <div className="info">
              <div className='chart'>
                <MemoryChart />
              </div>
              <div className="info">
                <div className="info-header">
                  <FiSave />
                  <h2>Memória</h2>
                </div>
                <h3>{storeMemory.data.memorySize - storeMemory.data.memoryFreeSize}/{storeMemory.data.memorySize}</h3>
              </div>
            </div>

            <div className="info">
              <div className="info-header">
                <FiPieChart />
                <h2>Quantum</h2>
              </div>
              <div className="increment-quantum">
                <button onClick={() => { if (quantum > 0) setQuantum(quantum + -1) }}>
                  <FiMinus />
                </button>
                <h3>{quantum}</h3>
                <button onClick={() => { setQuantum(quantum + 1) }}>
                  <FiPlus />
                </button>
              </div>
            </div>

            <div className="info">
              <div className="info-header">
                <FiClock />
                <h2>Tempo</h2>
              </div>
              <div className="increment-time">
                <h3>{storeTime.data.time}</h3>
                <button onClick={() => { incrementTime() }}>
                  <FiPlus />
                </button>
              </div>
            </div>

            <div className="info">
              <label htmlFor="arquivo">Enviar arquivo</label>
              <input type="file" onChange={(e) => storeProcess.actions.updateProcessListByFile(e)} id="arquivo" />
            </div>
          </div>
        </div>
        <div className='containerBox'>
          <Box name="Waiting" />
          <Box name="New" />
          <Box name="Ready" />
          <Box name="Running" />
          <Box name="Blocked" />
          <Box name="Exit" />

          <div className="printer">
            <Box name="Printer" />
          </div>
          <div></div>
          <div className="disk">
            <Box name="Disk" />
          </div>
        </div>
        <Log />
      </div>
    </div>
  );
}


export default LandingPage;
