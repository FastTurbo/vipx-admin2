import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableProblem from '@/components/Stability/TableProblem';
import ChartLine from '@/components/Stability/ChartLine';
import FormTime from '@/components/Stability/FormTime';

@connect()
class ProblemClass extends PureComponent {
  render() {
    const columns = [
      {title:'日期',dataIndex:'date'}, 
      {title:'总课堂数', dataIndex:'helpNum'},
      {title:'影响课堂数', dataIndex:'helpRate'}
    ];
    const data = [];
    for (let i = 0; i < 20; ++i) {
      data.push({
        key: i,
        日期: '2018-01-01',
        总课堂数: i,
        影响课堂数: i * 9
      });
    }

    return (
      <PageHeaderWrapper title="问题课堂数据">
        <Card bordered={false}>
          <FormTime />
        </Card>
        <Card bordered={false}>
          <ChartLine />
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
