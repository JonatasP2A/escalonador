export const PROCESS_STATE = {
  WAITING: 0,
  NEW: 1,
  READY: 2,
  RUNNING: 3,
  BLOCKED: 4,
  EXIT: 5
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
  RUNNING_TO_EXIT: 3
}

export const MEMORY_SIZE = 16000;