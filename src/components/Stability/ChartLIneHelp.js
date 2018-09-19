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
    // console.log(this.props)
    const { value } = this.state
    const { list = [], compareData = [] } = this.props
    // console.log(this.props)
    let dataArr = []
    list && list.map((item, index) => {
      let obj = {
        date: item.date,
        helpRate: item.percent,
        HelpNum: item.count,
      }
      if(compareData.length !== 0){
        obj.compareDate = compareData[index].date
        obj.compareHelpRate = compareData[index].percent
        obj.compareHelpNum = compareData[index].count
      }
      dataArr.push(obj)
    })

    const cols = {
      helpRate:{
        min:0,
        alias:'求助率'
      },
      compareHelpRate: {
        min: 0,
        alias:'比较求助率'
      },
      HelpNum: {
        min: 0,
        alias: '求助课堂数'
      },
      compareHelpNum: {
        min: 0,
        alias: '比较求助课堂数'
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
          <RadioGroup onChange={this.rateChange} value={this.state.value}>
              <Radio value={1}>求助率</Radio>
              <Radio value={2}>求助课堂数</Radio>
          </RadioGroup>
          <Axis name="date"></Axis>
          {/* <Axis name="classesNum"></Axis> */}
          <Tooltip/>
          {/* <Legend  name="helpRate" textStyle={ {fontSize:18, fill:'#1890FF'} } /> */}
          { value == 1 ? 
            <div>
              <Geom type="line" color="#00ffff" position="date*helpRate"></Geom>
              <Geom type="line" color="#00ff00" position="date*compareHelpRate"></Geom>
            </div>
            :
            <div>
              <Geom type="line" color="#a61c00" position="date*HelpNum"></Geom>
              <Geom type="line" color="#4a86e8" position="date*compareHelpNum"></Geom>
            </div>
          }
        </Chart>
      </div>
    );
  }
}

export default ChartLine;
