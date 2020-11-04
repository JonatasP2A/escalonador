import { useContext, useState } from "react";
import { StoreContext } from ".";

export const usePrinterContext = () => {
  const store = useContext(StoreContext);
  return store.printer;
}

export const __usePrinterData = () => {
  const [printer0, setPrinter0] = useState({ id: -1}); //id do processo em execução na impressora
  const [printer1, setPrinter1] = useState({ id: -1}); //id do processo em execução na impressora


  return {
    data: {
      printer0,
      printer1
    },
    actions: {
      setPrinters: (obj) => {
        setPrinter0(obj.printer0);
        setPrinter1(obj.printer1);
      }
    }
  }
}