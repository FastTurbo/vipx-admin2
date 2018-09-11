import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Card
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect()
class Forhelp extends PureComponent {
  
  render() {
    return (
      <PageHeaderWrapper title="求助数据" >
        <Card bordered={false}>
            这里 是求助数据页面           
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Forhelp;
