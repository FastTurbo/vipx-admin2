import React from 'react';
import moment from 'moment'
import { Radio } from 'antd';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import DataSet from '@antv/data-set'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title' 
const RadioGroup = Radio.Group;
class ChartLine extends React.Component {
  state = {
    value:1,
    radio: 'schedule_count'
  }

  componentDidMount(){
    this.activeCharts(this.props, this.state.value)
  }

  componentWillUpdate(nextProps,nextState){
    this.activeCharts(nextProps, nextState.value)
  }

  activeCharts(props, value) {
    console.log(value)
    let myCharts = echarts.init(document.getElementById('mycharts'))
    const { list = [], compareData = [] } = props
    let dateArr = []
    let scheduleArr = []
    let helpArr = []
    list.map(item => {
      dateArr.push(item.date)
      scheduleArr.push(item.schedule_count)
      helpArr.push(item.help_count)
    })
    let dateLength = new Date(dateArr[dateArr.length - 1]).getTime() - new Date(dateArr[0]).getTime()
    let compareScheduleArr = []
    let compareHelpArr = []
    let compareDateArr = []
    let series = []
    let tooltip = {
      trigger:'axis'
    }
    
    if(compareData.length !== 0){
        compareData.map(item => {
          compareDateArr.push(item.date)
          compareScheduleArr.push(item.schedule_count)
          compareHelpArr.push(item.help_count)
        })
        tooltip = {
          trigger: 'axis',
          formatter: (params) => {
            let res = params[0].seriesName
            res += '<br/>' + params[0].name + ': ' + params[0].value
            res += '<br/>' + moment(new Date(params[1].name).getTime() - dateLength).format('YYYY-MM-DD') + ': ' + params[1].value
            return res
          }
        }
        if(value == 2){
          series = [
            {
              name: '总课堂数',
              type: 'line',
              lineStyle: {
                color: '#1C86EE'
              },
              data: scheduleArr
            },
            {
              name: '总课堂数',
              type: 'line',
              lineStyle: {
                color: '#1C86EE'
              },
              data: compareScheduleArr
            }
          ]
        }else{
          series = [
            {
              name: '问题课堂数',
              type: 'line',
              lineStyle: {
                color: '#1C86EE'
              },
              data: helpArr
            },
            {
              name: '问题课堂数',
              type: 'line',
              lineStyle: {
                color: '#1C86EE'
              },
              data: compareHelpArr
            }
          ]
        }
    }else{
      series = [
        {
          name:'总课堂数',
          type:'line',
          lineStyle:{
            color: '#1C86EE'
          },
          data:scheduleArr
        },
        {
          name: '问题课堂数',
          type: 'line',
          lineStyle: {
            color: '#00ff00',
            type:'dashed'
          },
          data: helpArr
        }
      ]
    }
    let options = {
      tooltip: tooltip,
      legend:{
        data:['总课堂数', '问题课堂数']
      },
      xAxis:[
        {
          type: 'category',
          data: dateArr
        }
      ],
      yAxis:[
        {
          type:'value'
        }

      ],
      series:series,
      itemStyle:{
        color: '#87CEFA',
        borderColor: '#87CEFA'
      }
    }
    myCharts.setOption(options)
  }

  handleChange = e => {
    this.setState({
      value: e.target.value
    })
  }

  render() {
    
    return (
      <div>
        { this.props.compareData.length !== 0 && (
          <RadioGroup style={{paddingLeft: 60}} onChange={this.handleChange} value={this.state.value}>
              <Radio value={1}>总课堂数</Radio>
              <Radio value={2}>问题课堂数</Radio>
          </RadioGroup>
        )}
        <div id='mycharts' style={{width:'100%', height:400}}></div>
      </div>
    );
  }
}

export default ChartLine;
