import { useContext, useState} from "react";
import { StoreContext } from ".";
import { LogService }  from "../services";


export const useLogContext = () => {
  const store = useContext(StoreContext);
  return store.log;
}

export const __useLogData = () => {
  const [logPosts, setLogPosts] = useState([]);

  return {
    data: {
      logPosts,
    },
    actions: {
      addNewLog: (obj) => {
          LogService.addNewLog(logPosts, obj).then(newLogList => {
             setLogPosts(newLogList);
          });
      }
    }
  }
}