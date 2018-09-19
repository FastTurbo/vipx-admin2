import React from 'react';
import { connect } from 'dva';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';

class ChartLine extends React.Component {

  render() {
    const { data, compareData } = this.props.list
    // console.log(this.props)
    let dataArr = []
    data && data.map((item, index) => {
      let obj = {
        date: item.date,
        classesNum: item.classesNum,
        problemClassesNum: item.problemClassesNum,
      }
      if(compareData.length !== 0){
        obj.compareDate = compareData[index].date
        obj.compareClassesNum = compareData[index].classesNum
        obj.compareProblemClassesNum = compareData[index].problemClassesNum
      }
      dataArr.push(obj)
    })

    const cols = {
      classesNum:{
        min:0,
        alias:'总课堂数'
      },
      compareClassesNum: {
        min: 0,
        alias:'比较总课堂数'
      },
      problemClassesNum: {
        min: 0,
        alias: '问题课堂数'
      },
      compareProblemClassesNum: {
        min: 0,
        alias: '比较问题课堂数'

      },
      date:{
        range:[0, 1],
        alias:'日期'
      }
    }
    // console.log(dataArr)
    return (
      <div>
        <Chart height={400} forceFit padding={[50,80,100,80]} scale={ cols } data={ dataArr }>
          <Axis name="date"></Axis>
          <Axis name="classesNum"></Axis>
          <Tooltip/>
          <Legend textStyle={{fontSize:18, fill:'#1890FF'}} />
          <Geom type="line" color="#00ffff" position="date*classesNum"></Geom>
          <Geom type="line" color="#a61c00" position="date*problemClassesNum"></Geom>
          <Geom type="line" color="#00ff00" position="date*compareClassesNum"></Geom>
          <Geom type="line" color="#4a86e8" position="date*compareProblemClassesNum"></Geom>
        </Chart>
      </div>
    );
  }
}

export default ChartLine;
