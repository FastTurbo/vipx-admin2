import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment'
import { Card, Spin } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableProblem from '@/components/Stability/TableProblem';
import ChartLine from '@/components/Stability/ChartLine';
import FormTime from '@/components/Stability/FormTime';

@connect(({ problemClass, loading}) => ({
  list: problemClass.list,
  loading: loading.effects['problemClass/fetch']
}))
class ProblemClass extends PureComponent {


  handleOptionChange = data => {
    const { dispatch } = this.props
    let params = {}
    params.radioTime = data.radioTime
    params.startDate = moment(data.startDate).format('YYYY-MM-DD')
    params.endDate = moment(data.endDate).format('YYYY-MM-DD')
    if (data.compare) {
      params.compare = data.compare
      params.compareStartDate = moment(data.compareStartDate).format('YYYY-MM-DD')
      params.compareEndDate = moment(data.compareEndDate).format('YYYY-MM-DD')
    }
    dispatch({type: 'problemClass/fetch', params})
  }

  render() {
    const { list, loading } = this.props;
    const columns = [
      {title:'日期',dataIndex:'date'}, 
      {title:'总课堂数', dataIndex:'classesNum'},
      {title:'影响课堂数', dataIndex:'problemClassesNum'}
    ];

    return (
      <PageHeaderWrapper title="问题课堂数据">
        <Spin spinning={ loading } size="large">
            <Card bordered={false}>
              < FormTime handleOptionChange={ this.handleOptionChange } / >
            </Card>
            <br/>
            <Card bordered={false}>
              <ChartLine list={list}/>
            </Card>
            <br />
            <Card bordered={false}>
              <TableProblem colType={columns} dataArr={list.data} />
            </Card>
        </Spin>
      </PageHeaderWrapper>
    );
  }
}

export default ProblemClass;
