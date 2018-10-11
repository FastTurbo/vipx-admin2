import React from 'react';
import { Tabs, Checkbox } from 'antd';

import TableData from '@/components/Loop/TableData';

const TabPane = Tabs.TabPane;
class chartLineData extends React.Component {
  checkBoxChange = e =>{
    console.log(e)
  }
  render() {
    const columns = [
      {title:'日期', dataIndex:'date',key:'date'}, 
      {title:'课堂数', dataIndex:'classNum', key:'classNum'},
      {title:'查看讲义人数（率）', dataIndex:'checkNoteNum', key:'checkNoteNum'},
      {title:'预习完成人数（率）', dataIndex:'proNum', key:'proNum'},
      {title:'作业完成人数（率）', dataIndex:'reNum', key:'reNum'},
      {title:'查看报告人数（率）', dataIndex:'checkPortNum', key:'checkPortNum'},
    ]
    const data = [
      {
        key:0,
        date:'2018.10.10-2018.11.10',
        classNum:1,
        checkNoteNum:1,
        proNum:1,
        reNum:1,
        checkPortNum:1,
      },
      {
        key:2,
        date:'2018.11.10-2018.12.10',
        classNum:1,
        checkNoteNum:1,
        proNum:1,
        reNum:1,
        checkPortNum:1,
      }
    ]
    return (
      <div style={{height:500}}>
       <Tabs defaultActiveKey="1" >
        <TabPane tab="按学周" key="1">
            <p>数据概览</p>
            <TableData colType={columns} dataArr={data} pagination={false} />
            <span style={{ marginRight:20 }}>指标:</span>
            <Checkbox.Group onChange={this.checkBoxChange}>
              <Checkbox value="classNum">课堂数</Checkbox>
              <Checkbox value="note">查看讲义率</Checkbox>
              <Checkbox value="pro">预习完成率</Checkbox>
              <Checkbox value="re">作业完成率</Checkbox>
              <Checkbox value="port">报告查看率</Checkbox>
            </Checkbox.Group>

        </TabPane>
        <TabPane tab="按闭环" key="2">敬请期待...</TabPane>
      </Tabs>
      </div>
    );
  }
}

export default chartLineData;
