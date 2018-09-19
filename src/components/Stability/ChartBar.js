import React from "react";
import {
  Chart, Geom, Axis, Tooltip, Guide, Label
} from "bizcharts";

class ChartBar extends React.Component {
  render() {
    const { Html,Text } = Guide;
    const { title,data } = this.props;
    const cols = {
      问题类型占比: {
        tickInterval: 0.2
      },
    };
    console.log(data)
    let datas = []
    for(let i = 0; i < data.length; ++i){
      datas.push({
        problemType:data.msg,
        问题类型占比:data.percent
      })
    }
    return (
      <div>
        <Chart height={400} data={datas} scale={cols} forceFit>
          <Guide>
            {/* <Html position={['50%', '50%']} html={title} offsetX={-100}  offsetY={100} /> */}
            <Text top= {true} position= {['41%','130%']} content= {title} 
              style= {{
                fill: '#000', 
                fontSize: '16'
              }} />
          </Guide>

          <Axis name="problemType" />
          <Axis name="问题类型占比" />
          {/* <Tooltip
            crosshairs={{
              type: "x",
              style: {
                lineWidth:2,
                  stroke:"#ff0000",
              }
            }}
            itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
          /> */}
          <Geom 
            type="interval" 
            position="problemType*问题类型占比" 
          >
          <Label
              offset={10}
              content={["problemType*问题类型占比", (problemType, 问题类型占比)=>{
                return `${问题类型占比 * 100}%`;
              }]}
            />
          </Geom>
          
        </Chart>
      </div>
    );
  }
}

export default ChartBar;