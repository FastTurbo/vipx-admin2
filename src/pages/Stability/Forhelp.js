import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment'
import { message, Row, Col, Card, Spin } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableProblem from '@/components/Stability/TableProblem';
import ChartPic from '@/components/Stability/ChartPic';
import ChartBar from '@/components/Stability/ChartBar';
import ChartLineHelp from '@/components/Stability/ChartLineHelp';
import FormTime from '@/components/Stability/FormTime';

@connect(({ forhelp, loading}) => ({
  list: forhelp.list,
  error: forhelp.error,
  loading: loading.effects['forhelp/fetch']
}))
class Forhelp extends Component {
  constructor(props){
    super(props)
    this.state = {
      profession:'学生',
      radioTime:1,
      tableTitle:'学生'
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.error !== this.props.error && nextProps.error !== ''){
      message.destroy();
      message.error(nextProps.error)
    }
    return true
  }
 
  handleOptionChange = data => {
    const { dispatch } = this.props
    // console.log(data)
    let params = {}
    let type = 1;
    let title;
    if(data.profession == '学生'){
      title = '学生'
      type = 1
    }else if(data.profession == '外教'){
      title = '外教'
      type = 2
    }
    params.type = type;
    params.radioTime = data.radioTime
    params.startDate = moment(data.startDate).format('YYYY-MM-DD')
    params.endDate = moment(data.endDate).format('YYYY-MM-DD')
    if(data.compare){
      params.compare = data.compare
      params.compareStartDate = moment(data.compareStartDate).format('YYYY-MM-DD')
      params.compareEndDate = moment(data.compareEndDate).format('YYYY-MM-DD')
    }
    
    this.setState({
      profession:data.profession,
      radioTime:data.radioTime,
      tableTitle:title
    })
    dispatch({ type:'forhelp/fetch', params})
  }
  
  render() {
    const { list, loading, error } = this.props;
    const { tableTitle } = this.state;


    let datasOne = [];
    let datasTwo = [];
    let datasThree = [];
    let dataLine = []
    let compareData = []
    const data = [];
    const columns = [
      {title:'日期',dataIndex:'date'}, 
      {title:'求助课堂数', dataIndex:'helpNum'},
      {title:'求助率', dataIndex:'helpRate'}
    ]

    if(list && list.data){
      compareData = list.compareData.trend || [];
      dataLine = list.data.trend;
      datasOne = list.data.error;                 //求助问题类型占比
      datasTwo = list.data.module;               //影响功能模块占比
      datasThree = list.data.definition;
      for (let i = 0; i < dataLine.length; ++i) {
          data.push({
            key: i,
            date: dataLine[i].date,
            helpNum: dataLine[i].count,
            helpRate: dataLine[i].percent + "%"
          });
      }

    }
    return (
      <PageHeaderWrapper title="求助数据">
        <Spin spinning={ loading } size="large">
          <Card bordered={false}>
            <FormTime dropdown={true} handleOptionChange={ this.handleOptionChange } />
          </Card>
          <br/>
          <Card bordered={false}>
            <ChartLineHelp list={ dataLine } compareData={ compareData }></ChartLineHelp>
          </Card>
          <br />

          <Row gutter={24}>
            <Col md={12}>
              <Card>
                <ChartPic datas={datasOne} title={tableTitle + '求助问题类型占比'} />
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
            <ChartBar data={datasThree} title={tableTitle + '定义问题类型占比'}/>
          </Card>
          <br />
          <Card bordered={false}>
            <TableProblem colType={columns} dataArr={data} />
          </Card>
        </Spin>
      </PageHeaderWrapper>
    );
  }
}

export default Forhelp;
