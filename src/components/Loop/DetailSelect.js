import React, { PureComponent, Fragment } from 'react'
import { Checkbox, Radio, DatePicker, Form, Select, Button, Input} from 'antd'
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
            <Select defaultValue="allTextBook" style={{ width: 130,marginLeft:30 }} >
              <Option value="allTextBook">全部课程</Option>
              <Option value="reach">Reach</Option>
              <Option value="HE">HE</Option>
            </Select>
            <Select defaultValue="allType" style={{ width: 130,marginLeft:30 }} >
              <Option value="allType">全部类型</Option>
              <Option value="formal">正式课</Option>
              <Option value="experience">体验课</Option>
            </Select>
            <Select defaultValue="allLevel" style={{ width: 130,marginLeft:30 }} >
              <Option value="allLevel">全部级别</Option>
              <Option value="A">G1A</Option>
              <Option value="B">G2A</Option>
            </Select>
            <Select defaultValue="note" style={{ width: 130,marginLeft:30 }} >
              <Option value="note">讲义情况</Option>
              <Option value="1">是</Option>
              <Option value="2">否</Option>
            </Select>
            <Select defaultValue="proview" style={{ width: 130,marginLeft:30 }} >
              <Option value="proview">预习情况</Option>
              <Option value="1">是</Option>
              <Option value="2">否</Option>
            </Select>
          </div>
          <br />
          <div>
            <Select defaultValue="homework" style={{ width: 130,marginLeft:30 }} >
              <Option value="homework">作业情况</Option>
              <Option value="1">是</Option>
              <Option value="2">否</Option>
            </Select>
            <Select defaultValue="port" style={{ width: 130,marginLeft:30 }} >
              <Option value="port">报告情况</Option>
              <Option value="1">是</Option>
              <Option value="2">否</Option>
            </Select>
            <Input placeholder="学员姓名/学员手机号" style={{ width: 130,marginLeft:30 }}/>
            <Select defaultValue="classTeacher" style={{ width: 130,marginLeft:30 }} >
              <Option value="classTeacher">所属班主任</Option>
              <Option value="1">AA</Option>
              <Option value="2">BB</Option>
            </Select>
            <Button type="primary" style={{ marginLeft:40 }}>查询</Button>
          </div>
          
      </Fragment>
    )
  }
}

export default DetailSelect
