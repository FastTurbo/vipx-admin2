import React from 'react';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import moment from 'moment';
import { Form, Radio, DatePicker, Menu, Dropdown, Button, Icon, message } from 'antd';
import DataSet from '@antv/data-set';
import DatePickerWrapper from './DatePickerWrapper'

const FormItem = Form.Item;
@Form.create()
class Series extends React.Component {
  state = {
    formLayout: 'today',
    profession: '学生',
    ifRadio: false,
    days: 1,
  }

  handleFormLayoutChange = e => {
    let formLayout = e.target.value;
    let dayNum;
    if (formLayout === 'today') {
      dayNum = 1;
    } else if (formLayout === 'seven') {
      dayNum = 7;
    } else {
      dayNum = 30;
    }
    this.setState({
      formLayout: e.target.value,
      days: dayNum,
    });
  };

  handleRadioClick = () => {
    this.setState({ ifRadio: !this.state.ifRadio });
  };

  handleData = e => {
    let newData = e.format('YYYY-MM-DD HH:mm:ss');
    console.log(newData);
  };

  handleMenuClick = e => {
    console.log(e.item.props.children);
    this.setState({
      profession: e.item.props.children,
    });
  };
  render() {
    const { days, ifRadio, profession } = this.state;
    const dateFormat = 'YYYY/MM/DD';
    const data = [];
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">学生</Menu.Item>
        <Menu.Item key="2">外教</Menu.Item>
      </Menu>
    );
    return (
      <div>
        <Form layout="inline" style={{ margin: '0 0 0 80px' }}>
          <Dropdown overlay={menu}>
            <Button style={{ margin: '5px 20px 0px 0px' }}>
              {profession} <Icon type="caret-down" />
            </Button>
          </Dropdown>
          <FormItem label="时间">
            <DatePickerWrapper></DatePickerWrapper>
          </FormItem>
          
        </Form>
      </div>
    );
  }
}

export default Series;
