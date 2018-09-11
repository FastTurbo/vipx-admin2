import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Card
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect()
class ProblemClass extends PureComponent {
  
  render() {
    return (
      <PageHeaderWrapper title="问题课堂数据" >
        <Card bordered={false}>
            form        
        </Card>
        <br/>
        <Card bordered={false}>
            chart        
        </Card>
        <br/>
        <Card bordered={false}>
            table        
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ProblemClass;
