import React from 'react';
import { connect } from 'dva';
import { Radio } from 'antd';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';

const RadioGroup = Radio.Group;
class ChartLine extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      value:1
    }
  }

  rateChange = (e) =>{
    this.setState({
      value: e.target.value,
    });
  }
  render() {
    const { value } = this.state
    const { list = [], compareData = [] } = this.props

    let dataArr = [];
    let axisX = [0,1];
    list && list.map((item, index) => {
      let obj = {
        date: item.date,
        求助率: +item.percent,
        求助课堂数: item.count,
      }
      if(compareData.length !== 0){
        obj.compareDate = compareData[index].date
        obj.比较求助率 = +compareData[index].percent
        obj.比较求助课堂数 = compareData[index].count
      }
      dataArr.push(obj)
    })

    if(list.length ==  1){
      axisX = [0.5,1];
    }else if(list.length ==  2){
      axisX = [0.2,0.8];
    }else{
      axisX = [0,1];
    }

    const cols = {
      求助率:{
        min:0,
        alias:'求助率'
      },
      比较求助率: {
        min: 0,
        alias:'比较求助率'
      },
      求助课堂数: {
        min: 0,
        alias: '求助课堂数'
      },
      比较求助课堂数: {
        min: 0,
        alias: '比较求助课堂数'
      },
      date:{
        range: axisX,
        alias:'日期'
      }
    }
    const tt = 'dsdsds'
    return (
      <div>
        <Chart height={400} forceFit padding={[50,80,100,80]} scale={ cols } data={ dataArr }>
          <RadioGroup onChange={this.rateChange} value={value} style={{marginLeft:'35px'}}>
              <Radio value={1}>求助率</Radio>
              <Radio value={2}>求助课堂数</Radio>
          </RadioGroup>
          <Axis name="date" ></Axis>
          {/* <Axis name="dataHelp"></Axis> */}
         
          {
            compareData && compareData.length == 0 ?
            (
              <Tooltip showTitle={true} itemTpl="<li><span style=&quot;color:{color}&quot;>{name}:</span><span>{value}%</span></li>"/>
            ):
            (
              <Tooltip
                showTitle={false}
                containerTpl="<div class=&quot;g2-tooltip&quot;><ul class=g2-tooltip-list></ul></div>"
                itemTpl={`
                  <li class=&quot;g2-tooltip-list-item&quot;>
                    <p style=&quot;color:{color}&quot;>{title}:{value}%</p>
                    // <p style=&quot;color:{color}&quot;>${tt}:{value}%</p>
                  </li>
                `}
                offset={50}
                g2-tooltip={{
                  position: "absolute",
                  visibility: "hidden",
                  border: "1px solid #efefef",
                  backgroundColor: "white",
                  color: "#000",
                  opacity: "0.8",
                  padding: "5px 15px",
                  transition: "top 200ms,left 200ms"
                }}
                g2-tooltip-list={{
                  margin: "10px"
                }}
              />
            )

          }
          <Legend textStyle={ {fontSize:18, fill:'#1890FF'} } />
          { value == 1 ? 
            <div>
              <Geom type="line" color="#396fff" position="date*求助率"></Geom>
              <Geom type="line" color="#ee7655" position="date*比较求助率"></Geom>
            </div>
            :
            <div>
              <Geom type="line" color="#396fff" position="date*求助课堂数"></Geom>
              <Geom type="line" color="#ee7655" position="date*比较求助课堂数"></Geom>
            </div>
          }
        </Chart>
      </div>
    );
  }
}

export default ChartLine;
