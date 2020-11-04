export const PROCESS_STATE = {
  WAITING: 0,
  NEW: 1,
  READY: 2,
  RUNNING: 3,
  BLOCKED: 4,         //Representa o processo bloqueado por E/S ou Impressora, porém estes recursos estão ocupados
  BLOCKED_PRINTER: 5, //Representa o processo que está na impressora
  BLOCKED_DISK: 6,    //Representa o processo que está em disco
  EXIT: 7
}

export const PROCESS_PRIORITY = {
  REAL_TIME: '0',
  USER: '1'
}

export const COLOR = {
  CPU0: '#233D4D',
  CPU1: '#FFB7C3',
  CPU2: '#708D81',
  CPU3: '#8C4843',
  PROCESS_DEFAULT: '#FFFFFF',
}

export const CHANGES = {
  WAITING_TO_NEW: 0,
  NEW_TO_READY: 1,
  READY_TO_RUNNING: 2,
  RUNNING_TO_EXIT: 3,
  RUNNING_TO_READY: 4,
  RUNNING_TO_BLOCKED_BY_PRINTER: 5,
  RUNNING_TO_BLOCKED_BY_DISK: 6,
  RUNNING_TO_BLOCKED: 7,
  BLOCKED_BY_PRINTER_TO_RUNNING: 8
}

export const MEMORY_SIZE = 16000;
export const MAX_INTERRUPTION_TIME = 2;