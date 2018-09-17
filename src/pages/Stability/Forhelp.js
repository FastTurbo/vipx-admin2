import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableProblem from '@/components/Stability/TableProblem';
import ChartPic from '@/components/Stability/ChartPic';
import ChartPicApp from '@/components/Stability/ChartPicApp';
import ChartLine from '@/components/Stability/ChartLine';
import FormTime from '@/components/Stability/FormTime';

@connect(state => ({
  list: state.forhelp.list,
  studentForhelp: state.forhelp.studentForhelp
}))
class Forhelp extends PureComponent {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({type: 'forhelp/fetch'})
    dispatch({type: 'forhelp/fetchSFBT'})
  }
  
  render() {
    const { list, studentForhelp } = this.props;
    const columns = [
      {title:'日期',dataIndex:'date'}, 
      {title:'求助人数', dataIndex:'helpNum'},
      {title:'求助率', dataIndex:'helpRate'}
    ];
    const data = [];
    // console.log(studentForhelp)

    for (let i = 0; i < list.length; ++i) {
      data.push({
        key: i,
        date: list[i].date,
        helpNum: list[i].studentForHelpNum,
        helpRate: list[i].studentForHelpNum / (list[i].studentForHelpNum + list[i].teacherForHelpNum) + "%"
        ,
      });
    }
    let datasOne= [];
    let datasTwo= [];
    let datasThree= [];
    let datasFour = [];
    if(studentForhelp.length > 0){
      datasOne = [
        { item: '无法使用画笔', count: studentForhelp[0].penNofind },
        { item: '无法显示课件', count: studentForhelp[0].classNoshow },
        { item: '画面模糊', count: studentForhelp[0].screenBlur },
      ];
      datasTwo = [
        { item: 'IPPT', count: studentForhelp[1].penNofind },
        { item: '音频', count: studentForhelp[1].classNoshow },
        { item: '视频', count: studentForhelp[1].screenBlur },
      ];
      datasThree = [
        { item: 'PPT课件', count: studentForhelp[2].penNofind },
        { item: '音频模块', count: studentForhelp[2].classNoshow },
        { item: '视频模块', count: studentForhelp[2].screenBlur },
      ];
      datasFour = [
        { item: '最新版本1', count: studentForhelp[3].penNofind },
        { item: '最新版本2', count: studentForhelp[3].classNoshow },
        { item: '其他', count: studentForhelp[3].screenBlur },
      ];
    }
    
    return (
      <PageHeaderWrapper title="求助数据">
        <Card bordered={false}>
          <FormTime {...this.props} />
        </Card>
        <br/>
        <Card bordered={false}>
        <ChartLine list={list} />
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
              <ChartPic datas={datasTwo} title={'学生定义问题类型占比'} />
            </Card>
          </Col>
        </Row>
        <br />
        <Row gutter={24}>
          <Col md={12}>
            <Card>
              <ChartPic datas={datasThree} title={'影响功能模块占比'} />
            </Card>
          </Col>
          <Col md={12}>
            <Card>
              <ChartPicApp datas={datasFour} title={'学生版本分布'} />
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
