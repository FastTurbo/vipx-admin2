import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment'
import { message, Row, Col, Card, Spin, Icon } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import DetailSelect from '@/components/Loop/DetailSelect';
import TableData from '@/components/Loop/TableData';
@connect()
class LoopDetail extends Component {

  componentDidMount() {
    
  }
  handleOptionChange = data =>{
    console.log(data)
  }
  
  render() {
    const columns = [
      {title:'课堂ID', dataIndex:'id',key:'id'}, 
      {title:'上课时间', dataIndex:'classTime', key:'classTime'},
      {title:'学生姓名/手机号', dataIndex:'nameAndTel', key:'nameAndTel'},
      {title:'讲义', dataIndex:'note', key:'note', render: note => (<Icon type={ note ? 'check' : 'close' } style={{fontSize:'20px', color: note ? '#52c41a' : '#f5222d'}}/>)},
      {title:'预习', dataIndex:'preview', key:'preview', render: preview => (<Icon type={ preview ? 'check' : 'close' } style={{fontSize:'20px', color: preview ? '#52c41a' : '#f5222d'}}/>)},
      {title:'作业', dataIndex:'homework', key:'homework', render: homework => (<Icon type={ homework ? 'check' : 'close' } style={{fontSize:'20px', color: homework ? '#52c41a' : '#f5222d'}}/>)},
      {title:'报告', dataIndex:'port', key:'port', render: port => (<Icon type={ port ? 'check' : 'close' } style={{fontSize:'20px', color: port ? '#52c41a' : '#f5222d'}}/>)}
    ]
    const data = [
      {
        key:0,
        id:123123,
        classTime:'2018.9.8-09:10',
        nameAndTel:'张伟/15269391727',
        note: 1,
        preview: 0,
        homework: 1,
        port: 0,
      },
      {
        key:1,
        id:123123,
        classTime:'2018.9.8-09:10',
        nameAndTel:'张伟/15269391727',
        note: 1,
        preview: 1,
        homework: 0,
        port: 1,
      },
      {
        key:2,
        id:123123,
        classTime:'2018.9.8-09:10',
        nameAndTel:'张伟/15269391727',
        note: 1,
        preview: 0,
        homework: 0,
        port: 0,
      },
      {
        key:3,
        id:123123,
        classTime:'2018.9.8-09:10',
        nameAndTel:'张伟/15269391727',
        note: 0,
        preview: 0,
        homework: 1,
        port: 1,
      },
      {
        key:4,
        id:123123,
        classTime:'2018.9.8-09:10',
        nameAndTel:'张伟/15269391727',
        note: 1,
        preview: 0,
        homework: 0,
        port: 0,
      },{
        key:5,
        id:123123,
        classTime:'2018.9.8-09:10',
        nameAndTel:'张伟/15269391727',
        note: 1,
        preview: 1,
        homework: 1,
        port: 0,
      }
    ]
    let loopData 
    if(false){
      loopData= {
        data:moment('2018-01-01'),
        Class:'reach',
        Type:'formal',
        Level:'A'
      }
    }else{
      loopData = false;
    }
    
    return (
      <PageHeaderWrapper title="语文课学习详情">
        <Spin spinning={false} size="large">
          <Card bordered={false}>
            <DetailSelect afferent={loopData} handleOptionChange={this.handleOptionChange}/>
          </Card>
          <br />
          <Card bordered={false}>
            <TableData colType={columns} dataArr={data} />
          </Card>
        </Spin>
      </PageHeaderWrapper>
    );
  }
}
export default LoopDetail;
