import React from 'react';
import moment from 'moment'
import { Form, Menu, Dropdown, Button, Icon } from 'antd';
import DatePickerWrapper from './DatePickerWrapper'

const FormItem = Form.Item;
class Series extends React.Component {

  state = {
    profession: '学生',
    radioTime:'1',
    startDate: moment(),
    endDate: moment(),
    compareStartDate:'',
    compareEndDate:''
  };

  componentDidMount() {
    this.props.handleOptionChange({...this.state})
  }

  handleChangeTime = state => {
    this.setState({
      ...state
    })
    this.props.handleOptionChange({
      ...this.state,
      ...state
    })
  }
  

  handleMenuClick = e => {
    this.setState({
      profession: e.item.props.children,
    })
    this.props.handleOptionChange({
      ...this.state,
      profession: e.item.props.children})
  }

  render() {
    const { profession } = this.state;
    const { dropdown } = this.props
    const menu = (
      <Menu onClick={ this.handleMenuClick }>
        <Menu.Item key="student">学生</Menu.Item>
        <Menu.Item key="teacher">外教</Menu.Item>
      </Menu>
    );
    return (
      <div>
        <Form layout="inline" style={{ margin: '0 0 0 30px' }}>
          {
            dropdown && (
              <Dropdown overlay={menu}>
                <Button style={{ margin: '5px 20px 0px 0px' }}>
                  {profession} <Icon type="caret-down" />
                </Button>
              </Dropdown>
            )
          }
          
          <FormItem label="时间">
            <DatePickerWrapper handleTimeChange={ this.handleChangeTime }></DatePickerWrapper>
          </FormItem>

        </Form>
      </div>
    );
  }
}

export default Series;
