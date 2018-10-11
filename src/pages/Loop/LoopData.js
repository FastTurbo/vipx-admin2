import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment'
import { Card, Spin, Button } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import DatePickerWrapper from '@/components/Loop/DatePickerWrapper';
import TableData from '@/components/Loop/TableData';
import ChartLineData from '@/components/Loop/chartLineData';
@connect()
class LoopData extends Component {

  render() {
    const columns = [
      {title:'日期', dataIndex:'date',key:'date'}, 
      {title:'课堂量', dataIndex:'classNum', key:'classNum'},
      {title:'查看讲义人数（率）', dataIndex:'checkNoteNum', key:'checkNoteNum'},
      {title:'预习完成人数（率）', dataIndex:'proNum', key:'proNum'},
      {title:'作业完成人数（率）', dataIndex:'reNum', key:'reNum'},
      {title:'查看报告人数（率）', dataIndex:'checkPortNum', key:'checkPortNum'},
      {title:'操作',
        render:(text, record) => (
            <Button type="primary" size="small">查看详情</Button>
        )
      },
    ]
    const data = [
      {
        key:0,
        date:'2018-10-10',
        classNum:1,
        checkNoteNum:1,
        proNum:1,
        reNum:1,
        checkPortNum:1,
      },
      {
        key:2,
        date:'2018-10-11',
        classNum:1,
        checkNoteNum:1,
        proNum:1,
        reNum:1,
        checkPortNum:1,
      }
    ]
    return (
      <PageHeaderWrapper title="语文课闭环数据">
        <Spin spinning={false} size="large">
          <Card bordered={false}>
            <DatePickerWrapper />
          </Card>
          <br/>
          <Card bordered={false}>
            <ChartLineData />
          </Card>
          <br />

          <Card bordered={false}>
            <p>详情</p>
            <TableData colType={columns} dataArr={data} />
          </Card>
        </Spin>
      </PageHeaderWrapper>
    );
  }
}

export default LoopData;
