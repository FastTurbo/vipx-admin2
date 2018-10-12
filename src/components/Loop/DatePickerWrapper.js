import React, { PureComponent, Fragment } from 'react'
import { Checkbox, Radio, DatePicker, Form, Select, Button} from 'antd'
import moment from 'moment'

const { MonthPicker, RangePicker, WeekPicker } = DatePicker
const FormItem = Form.Item
const Option = Select.Option;

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
    }

    handleCompare = e =>{
      const select = e.target.checked
      this.setState({
        compare:select
      })
    }

    

  render() {
    const { time, radioTime, compare, startDate, endDate, compareStartDate, compareEndDate } = this.state
    let DateSelect
    if(time === '1'){
      DateSelect = <DatePicker />
    }else if(time === '7'){
      DateSelect = <WeekPicker />
    }else{
      DateSelect = <MonthPicker />
    }
    return (
      <Fragment>
         <Form layout="inline" style={{ margin: '0 0 0 30px' }}>
          <FormItem label="时间">
              <Radio.Group value={ radioTime } onChange={this.handleChange}>
                <Radio.Button value="1">按日</Radio.Button>
                <Radio.Button value="7">按周</Radio.Button>
                <Radio.Button value="30">按月</Radio.Button>
            </Radio.Group>
          </FormItem>
          <FormItem>
              { DateSelect }
          </FormItem>
          {
              compare && (
                  <Fragment>
                    <FormItem>与</FormItem>
                    <FormItem>
                        { DateSelect }
                    </FormItem>
                 </Fragment>
              )
          }

          <FormItem>
            <Checkbox value={ compare } onChange={ this.handleCompare }>
              对比时间段
            </Checkbox>
          </FormItem>
          <FormItem>
             <Select defaultValue="allClass">
              <Option value="allClass">全部课程</Option>
              <Option value="reach">Reach</Option>
              <Option value="HE">HE</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Select defaultValue="allType" >
              <Option value="allType">全部类型</Option>
              <Option value="formal">正式课</Option>
              <Option value="experience">体验课</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Select defaultValue="allLevel">
              <Option value="allLevel">全部级别</Option>
              <Option value="A">G1A</Option>
              <Option value="B">G2A</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button type="primary">查询</Button>
          </FormItem>
          
          </Form>
      </Fragment>
    )
  }
}

export default DatePickerWrapper
