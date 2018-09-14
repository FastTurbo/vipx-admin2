import React from 'react';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import moment from 'moment';
import { Form, Radio, DatePicker, Menu, Dropdown, Button, Icon, message } from 'antd';
import DataSet from '@antv/data-set';

const FormItem = Form.Item;
class Series extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formLayout: 'today',
      profession: '学生',
      ifRadio: false,
      days: 1,
    };
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
            <Radio.Group defaultValue="today" onChange={this.handleFormLayoutChange}>
              <Radio.Button value="today">今天</Radio.Button>
              <Radio.Button value="seven">最近7天</Radio.Button>
              <Radio.Button value="thirty">最近30天</Radio.Button>
            </Radio.Group>

            <DatePicker
              defaultValue={moment('2018/01/01', dateFormat)}
              format={dateFormat}
              onChange={this.handleData}
            />
            <Radio checked={ifRadio} onClick={this.handleRadioClick}>
              对比时间段
            </Radio>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Series;
