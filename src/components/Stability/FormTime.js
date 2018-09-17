import React from 'react';
import moment from 'moment'
import { Form, Menu, Dropdown, Button, Icon } from 'antd';
import DatePickerWrapper from './DatePickerWrapper'

const FormItem = Form.Item;
class Series extends React.Component {

  state = {
    profession: 'student',
    startDate:'',
    endDate: moment(),
    compareStartDate:'',
    compareEndDate:''
  };

  handleChangeTime = state => {

    this.setState({
      ...state
    })
  }

  handleMenuClick = e => {
    this.setState({
      profession: e.item.props.children,
    })
  }

  componentWillUpdate (nextProps, nextState) {
    // this.props.handleOptionChange(nextState)
  }

  render() {
    const { profession } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="student">学生</Menu.Item>
        <Menu.Item key="teacher">外教</Menu.Item>
      </Menu>
    );
    return (
      <div>
        <Form layout="inline" style={{ margin: '0 0 0 30px' }}>
          <Dropdown overlay={menu}>
            <Button style={{ margin: '5px 20px 0px 0px' }}>
              {profession} <Icon type="caret-down" />
            </Button>
          </Dropdown>
          <FormItem label="时间">
            <DatePickerWrapper handleTimeChange={ this.handleChangeTime }></DatePickerWrapper>
          </FormItem>

        </Form>
      </div>
    );
  }
}

export default Series;
