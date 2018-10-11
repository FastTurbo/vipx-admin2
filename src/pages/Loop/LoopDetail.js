import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment'
import { message, Row, Col, Card, Spin } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import DetailSelect from '@/components/Loop/DetailSelect';
import TableData from '@/components/Loop/TableData';
@connect()
class LoopDetail extends Component {
  
  render() {
    const columns = [
      {title:'课堂ID', dataIndex:'id',key:'id'}, 
      {title:'上课时间', dataIndex:'classTime', key:'classTime'},
      {title:'学生姓名/手机号', dataIndex:'nameAndTel', key:'nameAndTel'},
      {title:'讲义', dataIndex:'note', key:'note'},
      {title:'预习', dataIndex:'proview', key:'proview'},
      {title:'作业', dataIndex:'homework', key:'homework'},
      {title:'报告',dataIndex:'port', key:'port'}
    ]
    const data = [
      {
        key:0,
        id:123123,
        classTime:'2018.9.8-09:10',
        nameAndTel:'张伟/15269391727',
        note:'是',
        proview:'是',
        homework:'是',
        port:'否',
      }
    ]
    return (
      <PageHeaderWrapper title="语文课学习详情">
        <Spin spinning={false} size="large">
          <Card bordered={false}>
            <DetailSelect />
          </Card>
          <br />
          <Card bordered={false}>
            <TableData colType={columns} dataArr={data} />
          </Card>
        </Spin>
      </PageHeaderWrapper>
    );
  }
}
export default LoopDetail;
