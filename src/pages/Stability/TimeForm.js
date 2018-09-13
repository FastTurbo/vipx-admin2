import React from 'react';
import moment from 'moment';
import { Form, Radio, DatePicker } from 'antd';

const FormItem = Form.Item;
class TimeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formLayout: 'today',
      ifRadio: false,
    };
  }
  handleFormLayoutChange = e => {
    this.setState({ formLayout: e.target.value });
  };
  handleRadioClick = () => {
    this.setState({ ifRadio: !this.state.ifRadio });
  };

  render() {
    const { ifRadio } = this.state;
    const dateFormat = 'YYYY/MM/DD';
    return (
      <div>
        <Form layout="inline">
          <FormItem label="时间">
            <Radio.Group defaultValue="today" onChange={this.handleFormLayoutChange}>
              <Radio.Button value="today">今天</Radio.Button>
              <Radio.Button value="seven">最近7天</Radio.Button>
              <Radio.Button value="thirty">最近30天</Radio.Button>
            </Radio.Group>

            <DatePicker defaultValue={moment('2018/01/01', dateFormat)} format={dateFormat} />
            <Radio checked={ifRadio} onClick={this.handleRadioClick}>
              对比时间段
            </Radio>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default TimeForm;
