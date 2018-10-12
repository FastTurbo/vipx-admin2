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
        <Form layout="inline">
          <FormItem>
            <DatePicker />
          </FormItem>
          <FormItem>
            <Select defaultValue="allTextBook" style={{width:160}}>
              <Option value="allTextBook">全部课程</Option>
              <Option value="reach">Reach</Option>
              <Option value="HE">HE</Option>
            </Select>
          </FormItem>
           <FormItem>
            <Select defaultValue="allType" style={{width:160}}>
              <Option value="allType">全部类型</Option>
              <Option value="formal">正式课</Option>
              <Option value="experience">体验课</Option>
            </Select>
          </FormItem>
           <FormItem>
            <Select defaultValue="allLevel" style={{width:160}}>
              <Option value="allLevel">全部级别</Option>
              <Option value="A">G1A</Option>
              <Option value="B">G2A</Option>
            </Select>
          </FormItem>
           <FormItem>
            <Select defaultValue="note" style={{width:160}}>
              <Option value="note">讲义情况</Option>
              <Option value="1">是</Option>
              <Option value="2">否</Option>
            </Select>
          </FormItem>
           <FormItem>
            <Select defaultValue="proview" style={{width:160}}>
              <Option value="proview">预习情况</Option>
              <Option value="1">是</Option>
              <Option value="2">否</Option>
            </Select>
          </FormItem>
           <FormItem>
            <Select defaultValue="homework" style={{width:160}}>
              <Option value="homework">作业情况</Option>
              <Option value="1">是</Option>
              <Option value="2">否</Option>
            </Select>
          </FormItem>
           <FormItem>
            <Select defaultValue="port" style={{width:160}}>
              <Option value="port">报告情况</Option>
              <Option value="1">是</Option>
              <Option value="2">否</Option>
            </Select>
          </FormItem>
           <FormItem>
            <Input placeholder="学员姓名/学员手机号"/>
          </FormItem>
           <FormItem>
            <Select defaultValue="classTeacher" style={{width:160}}>
              <Option value="classTeacher">所属班主任</Option>
              <Option value="1">AA</Option>
              <Option value="2">BB</Option>
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

export default DetailSelect
