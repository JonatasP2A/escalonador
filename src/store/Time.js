import { useContext, useState} from "react";
import { StoreContext } from ".";


export const useTimeContext = () => {
  const store = useContext(StoreContext);
  return store.time;
}

export const __useTimeData = () => {
  const [time, setTime] = useState(0);

  return {
    data: {
      time,
    },
    actions: {
      incrementTime: () => {
          setTime(time + 1);
      }
    }
  }
}