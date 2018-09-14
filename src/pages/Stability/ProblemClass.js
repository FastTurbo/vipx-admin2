import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableProblem from '@/components/Stability/TableProblem';
import ChartLine from '@/components/Stability/ChartLine';
import FormTime from '@/components/Stability/FormTime';

@connect(state => ({
  list: state.problemClass.list
}))
class ProblemClass extends PureComponent {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({type: 'problemClass/fetch'})
  }

  render() {
    const { list } = this.props;
    const columns = [
      {title:'日期',dataIndex:'date'}, 
      {title:'总课堂数', dataIndex:'classesNum'},
      {title:'影响课堂数', dataIndex:'problemClassesNum'}
    ];
    const data = [];
    for (let i = 0; i < list.length; ++i) {
      data.push({
        key: i,
        date: list[i].date,
        classesNum: list[i].classesNum,
        problemClassesNum: list[i].problemClassesNum
      });
    }

    return (
      <PageHeaderWrapper title="问题课堂数据">
        <Card bordered={false}>
          <FormTime />
        </Card>
        <Card bordered={false}>
          <ChartLine list={list} />
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
