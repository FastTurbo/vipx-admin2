import React from "react";
import {
  Chart, Geom, Axis, Tooltip, Guide, Label
} from "bizcharts";

class ChartBar extends React.Component {
  render() {
    const { Html,Text } = Guide;
    const { title,data } = this.props;
    
    let datas = []
    for(let i = 0; i < data.length; ++i){
        datas.push({
          problemType:data[i].msg,
          percent: +data[i].percent
        })
    }
    const scale = {
      percent:{
        alias:'比例(%)    '
      }
    };
    const label = {
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
    const titleBar = {
      autoRotate: false, // 是否需要自动旋转，默认为 true
      textStyle: {
        fontSize: '12',
        textAlign: 'center',
        fill: '#999',
        fontWeight: 'bold',
        rotate: 0
      }, // 坐标轴文本属性配置
      position: 'end' , // 标题的位置，**新增**
    }
    return (
      <div>
        <Chart height={400} data={datas} scale={scale} forceFit>
          <Guide>
            <Text top= {true} position= {['41%','130%']} content= {title} 
              style= {{
                fill: '#000', 
                fontSize: '16'
              }} />
          </Guide>

          <Axis name="problemType" label={label} />
          <Axis name="percent" title={titleBar || false} />
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