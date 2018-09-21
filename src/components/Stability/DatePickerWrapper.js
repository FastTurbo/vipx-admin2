import React, { PureComponent, Fragment } from 'react'
import { Checkbox, Radio, DatePicker, Form } from 'antd'
import moment from 'moment'

const { RangePicker } = DatePicker
const FormItem = Form.Item

export class DatePickerWrapper extends PureComponent {
    state = {
        time: '1',
        radioTime:'1',
        compare:false,
        startDate: moment(),
        endDate: moment(),
        compareStartDate: moment(new Date(new Date().getTime() - 1000 * 60 * 60 * 24)),
        compareEndDate: moment(new Date(new Date().getTime() - 1000 * 60 * 60 * 24))
    }
    handleChange = e => {
        const value = e.target.value
        this.setState({
            time: value,
            radioTime: value,
            startDate: moment(),
            endDate: moment()
        })
        this.initTime(value)
        
    }

    handleCompare = e => {
        this.setState({ compare: e.target.checked })
        this.initTime()
    }

    handleDateChange = date => {
      this.setState({startDate: date, endDate: date, radioTime: ''})
    }

    handleRangeDateChange = dates => {
      this.setState({
        startDate: dates[0],
        endDate: dates[1],
        radioTime: ''
      })
    }

    handleCompareDateChange = date => {
      this.setState({
        compareEndDate: date
      })
    }

    handleCompareRangeDateChange = dates => {
      let {startDate, endDate} = this.state
      let leng = new Date(endDate).getTime() - new Date(startDate).getTime()
      let compareEndDate = moment(new Date(dates[0]).getTime() + leng)
      this.setState({
        compareStartDate: dates[0],
        compareEndDate: compareEndDate
      })
    }

    componentDidMount() {
      this.props.handleTimeChange({ ...this.state })
    }

    componentDidUpdate() {
      this.props.handleTimeChange({...this.state})
    }

    disabledDate = current => {
      return current > moment().endOf('day')
    }

    initTime(time){
        const today = new Date().getTime()
        if (time === '1') {
          this.setState({
            compareEndDate: moment(new Date(today - 1000 * 60 * 60 * 24 ))
          })
        } else if (time === '7') {
          this.setState({
            startDate: moment(new Date(today - 1000 * 60 * 60 * 24 * 6)),
            compareStartDate: moment(new Date(today - 1000 * 60 * 60 * 24 * 13)),
            compareEndDate: moment(new Date(today - 1000 * 60 * 60 * 24 * 7))
          })

        } else if (time === '30') {
          this.setState({
            startDate: moment(new Date(today - 1000 * 60 * 60 * 24 * 29)),
            compareStartDate: moment(new Date(today - 1000 * 60 * 60 * 24 * 59)),
            compareEndDate: moment(new Date(today - 1000 * 60 * 60 * 24 * 30))
          })
        }

    }
  render() {
    const { time, radioTime, compare, startDate, endDate, compareStartDate, compareEndDate } = this.state
    return (
      <Fragment>
          <FormItem>
              <Radio.Group value={ radioTime } onChange={this.handleChange}>
                <Radio.Button value="1">今天</Radio.Button>
                <Radio.Button value="7">最近7天</Radio.Button>
                <Radio.Button value="30">最近30天</Radio.Button>
            </Radio.Group>
          </FormItem>
          <FormItem>
              {
                time === '1' ?
                ( <DatePicker value={ endDate }
                              disabledDate={ this.disabledDate }
                              onChange={ this.handleDateChange } />) :
                ( <RangePicker value={[ startDate, endDate ]}
                               disabledDate={ this.disabledDate }
                               onChange={ this.handleRangeDateChange }/>)
              }
          </FormItem>
          {
              compare && (
                  <Fragment>
                    <FormItem>与</FormItem>
                    <FormItem>
                        {
                            time === '1' ?
                            ( <DatePicker value={ compareEndDate }
                                          disabledDate={ this.disabledDate }
                                          onChange={ this.handleCompareDateChange }/>) :
                            ( <RangePicker
                              value={[ compareStartDate, compareEndDate ]}
                              disabledDate={ this.disabledDate }
                              onChange={ this.handleCompareRangeDateChange }
                              />)
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
