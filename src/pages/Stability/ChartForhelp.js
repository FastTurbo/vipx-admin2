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

    for (let i = 0; i < days; ++i) {
      data.push({
        month: i + 1,
        总课程数: 7.0,
        影响课堂数: 3.9,
      });
    }
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'fold',
      fields: ['总课程数', '影响课堂数'],
      // 展开字段集
      key: 'city',
      // key字段
      value: 'temperature', // value字段
    });
    // console.log(dv);
    const cols = {
      month: {
        range: [0, 1],
      },
    };

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
        <Chart height={400} data={dv} scale={cols} forceFit>
          <Legend />
          <Axis name="month" />
          <Axis
            name="temperature"
            label={{
              formatter: val => `${val}人`,
            }}
          />
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom
            type="line"
            position="month*temperature"
            size={2}
            color={['city', ['#ff0000', '#00ff00']]}
          />
          <Geom
            type="point"
            position="month*temperature"
            size={4}
            shape={'circle'}
            color={'city'}
            style={{
              stroke: '#fff',
              lineWidth: 1,
            }}
          />
        </Chart>
      </div>
    );
  }
}

export default Series;
