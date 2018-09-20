import React from 'react';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';

class ChartLine extends React.Component {

  render() {
    // console.log(this.props)
    const { list = [], compareData = [] } = this.props
    // console.log(this.props)
    let dataArr = []
    list && list.map((item, index) => {
      let obj = {
        '日期': item.date,
        '总课堂数': item.schedule_count,
        '问题课堂数': item.help_count,
      }
      if(compareData.length !== 0){
        obj['比较日期'] = compareData[index].date
        obj['比较总课堂数'] = compareData[index].schedule_count
        obj['比较问题课堂数'] = compareData[index].help_count
      }
      dataArr.push(obj)
    })

    const cols = {
      classesNum:{
        alias:'总课堂数'
      },
      compareClassesNum: {
        alias:'比较总课堂数'
      },
      problemClassesNum: {
        alias: '问题课堂数'
      },
      compareProblemClassesNum: {
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
          <Axis name="classesNum"></Axis>
          <Tooltip/>
          <Legend textStyle={ {fontSize:18, fill:'#1890FF'} } />
          <Geom type="line" color="#396fff" position="日期*总课堂数"></Geom>
          <Geom type="line" color="#ee7655" position="日期*问题课堂数"></Geom>
          <Geom type="line" color="#02b449" position="日期*比较总课堂数"></Geom>
          <Geom type="line" color="#884ffc" position="日期*比较问题课堂数"></Geom>
        </Chart>
      </div>
    );
  }
}

export default ChartLine;
