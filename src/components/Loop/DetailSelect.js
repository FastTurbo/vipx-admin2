import React, { PureComponent, Fragment } from 'react'
import { Checkbox, Radio, DatePicker, Form, Select, Button} from 'antd'
import moment from 'moment'

const { MonthPicker, RangePicker, WeekPicker } = DatePicker
const FormItem = Form.Item
const Option = Select.Option;

export class DetailSelect extends PureComponent {
  render() {
    return (
      <Fragment>
          <DatePicker style={{marginLeft:"30px"}} />
          <div>
            <Select defaultValue="allTextBook" style={{ width: 120,marginLeft:30 }} >
              <Option value="allTextBook">全部课程</Option>
              <Option value="reach">Reach</Option>
              <Option value="HE">HE</Option>
            </Select>
            <Select defaultValue="allType" style={{ width: 120,marginLeft:30 }} >
              <Option value="allType">全部类型</Option>
              <Option value="formal">正式课</Option>
              <Option value="experience">体验课</Option>
            </Select>
            <Select defaultValue="allLevel" style={{ width: 120,marginLeft:30 }} >
              <Option value="allLevel">全部级别</Option>
              <Option value="A">G1A</Option>
              <Option value="B">G2A</Option>
            </Select>
            <Select defaultValue="note" style={{ width: 120,marginLeft:30 }} >
              <Option value="note">讲义情况</Option>
              <Option value="1">是</Option>
              <Option value="2">否</Option>
            </Select>
            <Select defaultValue="proview" style={{ width: 120,marginLeft:30 }} >
              <Option value="proview">预习情况</Option>
              <Option value="1">是</Option>
              <Option value="2">否</Option>
            </Select>
          </div>
          <Button type="primary" style={{ marginLeft:30 }}>查询</Button>
          <Button type="primary" style={{ marginLeft:30 }}>查询</Button>
      </Fragment>
    )
  }
}

export default DetailSelect
