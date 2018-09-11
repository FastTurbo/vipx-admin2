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
            这里是问题课堂数据页面           
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ProblemClass;
