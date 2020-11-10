import * as React from "react";
import { Pie } from "@nivo/pie";
import { useProcessContext } from '../../store/Process';
import { useMemoryContext } from '../../store/Memory';
import {PROCESS_STATE} from '../../constants';

//A ideia é exibir esse cara apenas quando passar o mouse por cima da memória
//A cor não está funcionando :( 

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const MemoryChart = () => {

  const storeProcess = useProcessContext();
  const storeMemory = useMemoryContext();

  const generateChartData = () =>{
    let data = [];
    let process = storeProcess.data.process;
    data.push({id: 'Livre', label: 'Livre', value: storeMemory.data.memoryFreeSize, "color": "hsl(345, 70%, 50%)"});
    for(let i = 0; i < process.length; i++){
      if(process[i].state !== PROCESS_STATE.WAITING && process[i].state !== PROCESS_STATE.NEW && process[i].state !== PROCESS_STATE.EXIT){
        data.push({id: "P" + process[i].id, label: "P" + process[i].id, value: process[i].Mbytes, color: '#fff'});
      } 
    }
    console.log("Esta é a data: ", data);
    return data;
  }

  let data = generateChartData();

  return(
  <div style={styles}>
    <Pie
      width={400}
      height={400}
      data={data}
      margin={{
        top: 40,
        right: 80,
        bottom: 80,
        left: 80
      }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      colors="nivo"
      colorBy="id"
      borderColor="inherit:darker(0.6)"
      radialLabelsSkipAngle={10}
      radialLabelsTextXOffset={6}
      radialLabelsTextColor="#333333"
      radialLabelsLinkOffset={0}
      radialLabelsLinkDiagonalLength={16}
      radialLabelsLinkHorizontalLength={24}
      radialLabelsLinkStrokeWidth={1}
      radialLabelsLinkColor="inherit"
      slicesLabelsSkipAngle={10}
      slicesLabelsTextColor="#333333"
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      theme={{
        tooltip: {
          container: {
            fontSize: "13px"
          }
        },
        labels: {
          textColor: "#555"
        }
      }}
      legends={[
        {
          anchor: "crap",
          direction: "row",
          translateY: 56,
          itemWidth: 100,
          itemHeight: 14,
          symbolSize: 14,
          symbolShape: "circle"
        }
      ]}
    />
  </div>
  )};

export default MemoryChart;