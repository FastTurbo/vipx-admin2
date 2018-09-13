import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableProblem from './TableProblem';
import ChartProblem from './ChartProblem';

@connect()
class ProblemClass extends PureComponent {
  render() {
    const columns = ['日期', '总课堂数', '影响课堂数', '直播云影响课堂数'];
    const data = [];
    for (let i = 0; i < 20; ++i) {
      data.push({
        key: i,
        日期: '2018-01-01',
        总课堂数: i,
        影响课堂数: i * 9,
        直播云影响课堂数: i * 9,
      });
    }

    return (
      <PageHeaderWrapper title="问题课堂数据">
        <Card bordered={false}>
          <ChartProblem />
        </Card>
        <br />
        <Card bordered={false}>
          <TableProblem colType={columns} dataArr={data} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ProblemClass;
