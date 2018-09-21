import React from 'react';
import moment from 'moment'
import { Radio } from 'antd';
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
    let myCharts = echarts.init(document.getElementById('mycharts'))
    myCharts.clear()
    const { list = [], compareData = [] } = props
    let dateArr = []
    let rateArr = []
    let helpArr = []
    list.map(item => {
      dateArr.push(item.date)
      rateArr.push(item.percent)
      helpArr.push(item.count)
    })
    let dateLength = dateArr.length<= 2 ? 0 : (new Date(dateArr[dateArr.length - 1]).getTime() - new Date(dateArr[0]).getTime())
    let compareRateArr = []
    let compareHelpArr = []
    let compareDateArr = []
    let series = []
    let tooltip = {
      trigger:'axis'
    }
    
    if(compareData.length !== 0){
        compareData.map(item => {
          compareDateArr.push(item.date)
          compareRateArr.push(item.percent)
          compareHelpArr.push(item.count)
        })
        
        if(value == 1){
          series = [
            {
              name: '求助率',
              type: 'line',
              symbol: 'circle',
              symbolSize: 16,
              itemStyle: {
                normal: {
                  color: '#396fff',
                  lineStyle: {
                    color: '#396fff'
                  }
                }
              },
              data: rateArr
            },
            {
              name: '求助率',
              type: 'line',
              symbolSize: 16,
              itemStyle: {
                normal: {
                  color: '#ee7655',
                  lineStyle: {
                    color: '#ee7655',
                    type: 'dashed'
                  }
                }
              },
              data: compareRateArr
            }
          ]
          tooltip = {
            trigger: 'axis',
            formatter: (params) => {
              let res = params[0].seriesName
              res += '<br/>' + params[0].name + ': ' + params[0].value + '%'
              res += '<br/>' + moment(new Date(params[1].name).getTime() - dateLength).format('YYYY-MM-DD') + ': ' + params[1].value + '%'
              return res
            }
          }
        }else{
          series = [
            {
              name: '求助课堂数',
              type: 'line',
              symbol:'circle',
              symbolSize: 16,
              itemStyle: {
                normal: {
                  color: '#396fff',
                  lineStyle: {
                    color: '#396fff'
                  }
                }
              },
              data: helpArr
            },
            {
              name: '求助课堂数',
              type: 'line',
              symbolSize: 16,
              itemStyle: {
                normal: {
                  color: '#ee7655',
                  lineStyle: {
                    color: '#ee7655',
                    type: 'dashed'
                  }
                }
              },
              data: compareHelpArr
            }
          ]

          tooltip = {
            trigger: 'axis',
            formatter: (params) => {
              let res = params[0].seriesName
              res += '<br/>' + params[0].name + ': ' + params[0].value
              res += '<br/>' + moment(new Date(params[1].name).getTime() - dateLength).format('YYYY-MM-DD') + ': ' + params[1].value
              return res
            }
          }
        }
    }else{
      if(value == 1){
        series = [{
            name: '求助率',
            type: 'line',
            symbol: 'circle',
            symbolSize: 16,
            itemStyle: {
              normal: {
                color: '#1C86EE',
                lineStyle: {
                  color: '#1C86EE'
                }
              }
            },
            data: rateArr
          }
        ]
        tooltip = {
          trigger: 'axis',
          formatter: (params) => {
            let res = params[0].name
            res += '<br/>' + params[0].seriesName + ': ' + params[0].value + '%'
            return res
          }
        }
      }else{
        series = [
          {
            name: '求助课堂数',
            type: 'line',
            symbol: 'circle',
            symbolSize: 16,
            itemStyle: {
              normal: {
                color: '#ee7655',
                lineStyle: {
                  color: '#ee7655'
                }
              }
            },
            data: helpArr
          }
        ]
        tooltip = {
          trigger: 'axis',
          formatter: (params) => {
            let res = params[0].name
            res += '<br/>' + params[0].seriesName + ': ' + params[0].value 
            return res
          }
        }
      }
      
    }
    let options = {
      tooltip: tooltip,
      legend:{
        data:['总课堂数', '问题课堂数']
      },
      xAxis:[
        {
          type: 'category',
          data: dateArr,
          nameTextStyle: {
            fontSize: 16
          },
          axisLabel:{
            textStyle: {
              fontSize: 16
            }
          },
          axisLine: {
            lineStyle: {
              color: '#0087ed',
              width: 2
            }
          }
        }
      ],
      yAxis:[
        {
          type:'value',
          minInterval: 1,
          splitLine: {
            lineStyle: {
              color: ['#0087ed'],
              type: 'dashed'
            }
          },
          nameTextStyle: {
              fontSize:16
          },
          axisLabel: {
            textStyle: {
              fontSize: 16
            }
          },
          axisLine: {
            lineStyle: {
              color: '#0087ed',
              width: 2
            }
          }
        }

      ],
      series: series,
    }
    myCharts.setOption(options)
  }

  handleChange = e => {
    this.setState({
      value: e.target.value
    })
  }

  render() {
    const { compareData = [] } = this.props
    return (
      <div>
        <RadioGroup style={{paddingLeft: 60}} onChange={this.handleChange} value={this.state.value}>
            <Radio value={1}>求助率</Radio>
            <Radio value={2}>求助课堂数</Radio>
        </RadioGroup>
        <div id='mycharts' style={{width:'100%', height:400}}></div>
      </div>
    );
  }
}

export default ChartLine;
