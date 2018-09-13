import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableProblem from './TableProblem';
import ChartPic from './ChartPic';
import ChartForhelp from './ChartForhelp';

@connect(state => ({
  list: state.forhelp.list,
  loading: loading.models.forhelp
}))
class Forhelp extends PureComponent {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({type: 'forhelp/fetch'})
  }
  
  render() {
    const columns = ['日期', '求助人数', '求助率'];
    const data = [];
    for (let i = 0; i < 20; ++i) {
      data.push({
        key: i,
        日期: '2018-01-01',
        求助人数: i,
        求助率: i * 9,
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
          <ChartForhelp />
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
