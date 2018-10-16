import React, { PureComponent, Fragment } from 'react'
import { Checkbox, Radio, DatePicker, Form, Select, Button, Input} from 'antd'
import moment from 'moment'

const FormItem = Form.Item
const Option = Select.Option;

export class DetailSelect extends PureComponent {
  state = {
    Today:moment(),
    Class:'allClass',
    Type:'',
    Level:'',
    Note:'',
    Proview:'',
    Homework:'',
    Port:'',
    NameOrTel:'',
    ClassTeacher:''
  }

  componentDidMount() {
    this.props.form.validateFields();
  }

  handleSubmit = e =>{
    e.preventDefault()
    const message = this.props.form.getFieldsValue()
    this.props.handleOptionChange({
      ...message
    })
  }

  render() {
    const { Today } = this.state
    const { afferent } = this.props
    const { getFieldProps } = this.props.form;
    // console.log(this.state)
    return (
      <Fragment>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem>
            <DatePicker defaultValue={ afferent.data || moment() } />
          </FormItem>
          <FormItem>
            <Select {...getFieldProps('Class',{ initialValue: afferent.Class || 'allClass' })}  style={{width:160}} >
              <Option value="allClass">全部课程</Option>
              <Option value="reach">Reach</Option>
              <Option value="HE">HE</Option>
            </Select>
          </FormItem>
           <FormItem>
            <Select {...getFieldProps('Type',{ initialValue: afferent.Type || 'allType' })} style={{width:160}}>
              <Option value="allType">全部类型</Option>
              <Option value="formal">正式课</Option>
              <Option value="experience">体验课</Option>
            </Select>
          </FormItem>
           <FormItem>
            <Select {...getFieldProps('Level',{ initialValue: afferent.Level || 'allLevel' })}  style={{width:160}}>
              <Option value="allLevel">全部级别</Option>
              <Option value="A">G1A</Option>
              <Option value="B">G2A</Option>
            </Select>
          </FormItem>
           <FormItem>
            <Select {...getFieldProps('Note',{ initialValue: 'note' })} style={{width:160}}>
              <Option value="note">讲义情况</Option>
              <Option value="1">是</Option>
              <Option value="2">否</Option>
            </Select>
          </FormItem>
           <FormItem>
            <Select {...getFieldProps('Proview',{ initialValue: 'proview' })}  style={{width:160}}>
              <Option value="proview">预习情况</Option>
              <Option value="1">是</Option>
              <Option value="2">否</Option>
            </Select>
          </FormItem>
           <FormItem>
            <Select {...getFieldProps('Homework',{ initialValue: 'homework' })}  style={{width:160}}>
              <Option value="homework">作业情况</Option>
              <Option value="1">是</Option>
              <Option value="2">否</Option>
            </Select>
          </FormItem>
           <FormItem>
            <Select {...getFieldProps('Port',{ initialValue: 'port' })} style={{width:160}}>
              <Option value="port">报告情况</Option>
              <Option value="1">是</Option>
              <Option value="2">否</Option>
            </Select>
          </FormItem>
           <FormItem>
            <Input placeholder="学员姓名/学员手机号" {...getFieldProps('NameOrTel')}/>
          </FormItem>
           <FormItem>
            <Select {...getFieldProps('ClassTeacher',{ initialValue: 'classTeacher' })} style={{width:160}}>
              <Option value="classTeacher">所属班主任</Option>
              <Option value="1">AA</Option>
              <Option value="2">BB</Option>
            </Select>
          </FormItem>
           <FormItem>
            <Button type="primary" htmlType='submit' >查询</Button>
          </FormItem>
        </Form>
      </Fragment>
    )
  }
}

export default Form.create()(DetailSelect)
