import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment'
import { message, Row, Col, Card, Spin } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import DetailSelect from '@/components/Loop/DetailSelect';
@connect()
class LoopDetail extends Component {
  
  render() {
    return (
      <PageHeaderWrapper title="语文课学习详情">
        <Spin spinning={false} size="large">
          <Card bordered={false}>
            <DetailSelect />
          </Card>
          <br />
          <Card bordered={false}>
          </Card>
        </Spin>
      </PageHeaderWrapper>
    );
  }
}
export default LoopDetail;
