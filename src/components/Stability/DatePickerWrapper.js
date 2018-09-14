import React, { PureComponent, Fragment } from 'react'
import { Checkbox, Radio, DatePicker, Form } from 'antd'
import moment from 'moment'

const { RangePicker } = DatePicker
const FormItem = Form.Item

export class DatePickerWrapper extends PureComponent {
    state = {
        time: '1',
        compare:false,
        startDate: moment(),
        endDate: moment(),
        compareStartDate: moment(),
        compareEndDate: moment()
    }
    handleChange = e => {
        const value = e.target.value
        this.setState({ 
            time: value,
            endDate: moment()
        })
        this.initTime(value)
    }

    handleCompare = e => {
        this.setState({ compare: e.target.checked })
        this.initTime()
    }

    initTime(time){
        const today = new Date().getTime()
        if (time === '1') {
          this.setState({
            compareEndDate: moment(new Date(today - 1000 * 60 * 60 * 24 * 1))
          })
        } else if (time === '7') {
          this.setState({
            startDate: moment(new Date(today - 1000 * 60 * 60 * 24 * 7)),
            compareStartDate: moment(new Date(today - 1000 * 60 * 60 * 24 * 14)),
            compareEndDate: moment(new Date(today - 1000 * 60 * 60 * 24 * 8))
          })

        } else if (time === '30') {
          this.setState({
            startDate: moment(new Date(today - 1000 * 60 * 60 * 24 * 30)),
            compareStartDate: moment(new Date(today - 1000 * 60 * 60 * 24 * 60)),
            compareEndDate: moment(new Date(today - 1000 * 60 * 60 * 24 * 31))
          })
        }

    }
  render() {
    const { time, compare, startDate, endDate, compareStartDate, compareEndDate } = this.state
    console.log(this.state)
    return (
      <Fragment>
          <FormItem>
              <Radio.Group defaultValue={ time } onChange={this.handleChange}>
                <Radio.Button value="1">今天</Radio.Button>
                <Radio.Button value="7">最近7天</Radio.Button>
                <Radio.Button value="30">最近30天</Radio.Button>
            </Radio.Group>
          </FormItem>
          <FormItem>
              { 
                time === '1' ? 
                ( <DatePicker value={ endDate }/>) :
                ( <RangePicker value={[ startDate, endDate ]}/>)
              }
          </FormItem>
          {
              compare && (
                  <Fragment>
                    <FormItem>与</FormItem>
                    <FormItem>
                        { 
                            time === '1' ? 
                            ( <DatePicker value={ compareEndDate }/>) :
                            ( <RangePicker value={[ compareStartDate, compareEndDate ]}/>)
                        }
                    </FormItem>
                 </Fragment>
              )
          }
          
          <FormItem>
            <Checkbox value={ compare } onChange={ this.handleCompare }>
              对比时间段
            </Checkbox>
          </FormItem>
      </Fragment>
    )
  }
}

export default DatePickerWrapper
