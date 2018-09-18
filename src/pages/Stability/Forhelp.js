import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment'
import { Row, Col, Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableProblem from '@/components/Stability/TableProblem';
import ChartPic from '@/components/Stability/ChartPic';
import ChartBar from '@/components/Stability/ChartBar';
import ChartLine from '@/components/Stability/ChartLine';
import FormTime from '@/components/Stability/FormTime';

@connect(state => ({
  list: state.forhelp.list,
  studentForhelp: state.forhelp.studentForhelp
}))
class Forhelp extends PureComponent {
  componentDidMount() {
    const { dispatch,list, studentForhelp } = this.props
    // dispatch({type: 'forhelp/fetch'})
    dispatch({type: 'forhelp/fetchStudentForProblem'})
  }

  handleOptionChange = data => {
    console.log(data)
    const { dispatch } = this.props
    let params = {}
    params.radioTime = data.radioTime
    params.startDate = moment(data.startDate).format('YYYY-MM-DD')
    params.endDate = moment(data.endDate).format('YYYY-MM-DD')
    if(data.compare){
      params.compare = data.compare
      params.compareStartDate = moment(data.compareStartDate).format('YYYY-MM-DD')
      params.compareEndDate = moment(data.compareEndDate).format('YYYY-MM-DD')
    }
    // console.log(params)
    dispatch({ type:'forhelp/fetch', params})
  }
  
  render() {
    const { list, studentForhelp } = this.props;
    // const { columns, data, datasOne, datasTwo, datasThree, datasFour } = this.state;
    let datasOne = [];
    let datasTwo = [];
    let datasThree = [];
    const data = [];
    const columns = [
      {title:'日期',dataIndex:'date'}, 
      {title:'求助人数', dataIndex:'helpNum'},
      {title:'求助率', dataIndex:'helpRate'}
    ]
    console.log(list)
    if(list && list.data && list.data.length > 0){
      const datas = list.data
      for (let i = 0; i < datas.length; ++i) {
        data.push({
          key: i,
          date: datas[i].date,
          helpNum: datas[i].studentForHelpNum,
          helpRate: datas[i].studentForHelpNum / (datas[i].studentForHelpNum + datas[i].teacherForHelpNum) + "%"
          ,
        });
      }
    }
    if(studentForhelp.length > 0){
      datasOne = [
        { item: '无法使用画笔', count: studentForhelp[0].penNofind },
        { item: '无法显示课件', count: studentForhelp[0].classNoshow },
        { item: '画面模糊', count: studentForhelp[0].screenBlur }
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
    }
    
    return (
      <PageHeaderWrapper title="求助数据">
        <Card bordered={false}>
          <FormTime handleOptionChange={ this.handleOptionChange } {...this.props} />
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
              <ChartPic datas={datasTwo} title={'影响功能模块占比'} />
            </Card>
          </Col>
        </Row>
        <br />
        <Card>
          <ChartBar  />
        </Card>
        <br />
        <Card bordered={false}>
          <TableProblem colType={columns} dataArr={data} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Forhelp;
