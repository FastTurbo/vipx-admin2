import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableProblem from '@/components/Stability/TableProblem';
import ChartPic from '@/components/Stability/ChartPic';
import ChartLine from '@/components/Stability/ChartLine';
import FormTime from '@/components/Stability/FormTime';

@connect(state => ({
  list: state.forhelp.list
}))
class Forhelp extends PureComponent {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({type: 'forhelp/fetch'})
  }
  
  render() {
    const { list } = this.props;
    const columns = [
      {title:'日期',dataIndex:'date'}, 
      {title:'求助人数', dataIndex:'helpNum'},
      {title:'求助率', dataIndex:'helpRate'}
    ];
    const data = [];

    for (let i = 0; i < list.length; ++i) {
      data.push({
        key: i,
        date: list[i].date,
        helpNum: list[i].studentForHelpNum,
        helpRate: list[i].studentForHelpNum / (list[i].studentForHelpNum + list[i].teacherForHelpNum) + "%"
        ,
      });
    }
    const datasOne = [
      { item: '无法使用画笔', count: 9 },
      { item: '无法显示课件', count: 9 },
      { item: '画面模糊', count: 9 },
    ];
    return (
      <PageHeaderWrapper title="求助数据">
        <Card bordered={false}>
          <FormTime />
        </Card>
        <Card bordered={false}>
          <ChartLine />
        </Card>
        <br />
        <Row gutter={24}>
          <Col md={12}>
            <Card>
              <ChartPic datas={datasOne} title={'学生求助问题类型占比'} />
            </Card>
          </Col>
          <Col md={12}>
            <Card>
              <ChartPic datas={datasOne} title={'学生定义问题类型占比'} />
            </Card>
          </Col>
        </Row>
        <br />
        <Row gutter={24}>
          <Col md={12}>
            <Card>
              <ChartPic datas={datasOne} title={'影响功能模块占比'} />
            </Card>
          </Col>
          <Col md={12}>
            <Card>
              <ChartPic datas={datasOne} title={'学生版本分布'} />
            </Card>
          </Col>
        </Row>
        <br />
        <Card bordered={false}>
          <TableProblem colType={columns} dataArr={data} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Forhelp;
