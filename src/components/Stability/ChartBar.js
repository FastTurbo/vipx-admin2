import React from "react";
import {
  Chart, Geom, Axis, Tooltip, Guide, Label
} from "bizcharts";

class ChartBar extends React.Component {
  render() {
    const { Html,Text } = Guide;
    const { title,data } = this.props;
    const cols = {
      percent: {
        tickInterval: 10
      },
    };
    
    let datas = []
      for(let i = 0; i < data.length; ++i){
          datas.push({
            problemType:data[i].msg,
            percent: +data[i].percent
          })
      }
      const label = {
        autoRotate:true,
        textStyle:{
          textAlign: 'center',
        },
        formatter(text, item, index) {
          if(text.indexOf('(') > 0){
            let arr = text.split('(');
            return `${arr[0]}\n(${arr[1]}`;
          }else{
            return text;
          }
        },
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

          <Axis name="problemType" label={label}/>
          <Axis name="percent"/>
          <Tooltip
            crosshairs={{
              type: "x",
              style: {
                lineWidth:2,
                  stroke:"#ff0000",
              }
            }}
            itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>问题占比: {value}%</li>"
          />
          <Geom 
            type="interval" 
            size={['percent', [30, 50]]}
            position="problemType*percent" 
          >
          <Label
              offset={10}
              content={["problemType*percent", (problemType, percent)=>{
                return `${percent}%`;
              }]}
            />
          </Geom>
          
        </Chart>
      </div>
    );
  }
}

export default ChartBar;