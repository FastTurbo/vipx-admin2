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
  constructor(props){
    super(props)
    this.state = {
      profession:'学生',
      radioTime:1,
      tableTitle:'学生定义问题类型占比'
    }
  }
  componentDidMount() {
    const { dispatch } = this.props
    // dispatch({type: 'forhelp/fetch'})
   // dispatch({type: 'forhelp/fetchStudentForProblem'})
  }

  handleOptionChange = data => {
    const { dispatch } = this.props
    // console.log(data)
    let params = {}
    params.radioTime = data.radioTime
    params.startDate = moment(data.startDate).format('YYYY-MM-DD')
    params.endDate = moment(data.endDate).format('YYYY-MM-DD')
    if(data.compare){
      params.compare = data.compare
      params.compareStartDate = moment(data.compareStartDate).format('YYYY-MM-DD')
      params.compareEndDate = moment(data.compareEndDate).format('YYYY-MM-DD')
    }
    let title;
    if(data.profession == '学生'){
      title = '学生'
    }else if(data.profession == '外教'){
      title = '外教'
    }

    this.setState({
      profession:data.profession,
      radioTime:data.radioTime,
      tableTitle:title
    })
    dispatch({ type:'forhelp/fetch', params})
  }
  
  render() {
    const { list, studentForhelp } = this.props;
    const { profession, tableTitle } = this.state;

    console.log(list)
    let datasOne = [];
    let datasTwo = [];
    let datasThree = [];
    let dataLine = []
    const data = [];
    const columns = [
      {title:'日期',dataIndex:'date'}, 
      {title:'求助人数', dataIndex:'helpNum'},
      {title:'求助率', dataIndex:'helpRate'}
    ]

    if(list && list.data){
      dataLine = list.data.trend;
      datasOne = list.data.error;                 //求助问题类型占比
      datasTwo = list.data.module;               //影响功能模块占比
      datasThree = list.data.definition;
      const problemtype = studentForhelp.problemType;  
      for (let i = 0; i < dataLine.length; ++i) {
        if( profession == '学生'){
          data.push({
            key: i,
            date: dataLine[i].date,
            helpNum: dataLine[i].count,
            helpRate: dataLine[i].percent + "%"
          });
        }else if( profession == '外教'){
          data.push({
            key: i,
            date: dataLine[i].date,
            helpNum: dataLine[i].count,
            helpRate: dataLine[i].percent + "%"
          });
        }
      }

    }
    
    return (
      <PageHeaderWrapper title="求助数据">
        <Card bordered={false}>
          <FormTime handleOptionChange={ this.handleOptionChange } {...this.props} />
        </Card>
        <br/>
        <Card bordered={false}>
          <ChartLine list={dataLine} />
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
      </PageHeaderWrapper>
    );
  }
}

export default Forhelp;
