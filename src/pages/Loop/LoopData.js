import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment'
import { message, Row, Col, Card, Spin } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
@connect()
class LoopData extends Component {
  

  
  render() {
    
    return (
      <PageHeaderWrapper title="语文课闭环数据">
        <Spin spinning={false} size="large">
          <Card bordered={false}>
          </Card>
          <br/>
          <Card bordered={false}>
          </Card>
          <br />

          <Card bordered={false}>
          </Card>
        </Spin>
      </PageHeaderWrapper>
    );
  }
}

export default LoopData;
