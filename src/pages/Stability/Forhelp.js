import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

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
    return (
      <PageHeaderWrapper title="求助数据" >
        
        <Card bordered={false}>
            form        
        </Card>
        <br/>
        <Card bordered={false}>
            chart        
        </Card>
        <br/>
        <Row gutter={24}>
            <Col md={12}>
              <Card>1</Card>
            </Col>  
            <Col md={12}>
            <Card>2</Card></Col>  
        </Row>
        <br/>
        <Row gutter={24}>
            <Col md={12}>
              <Card>1</Card>
            </Col>  
            <Col md={12}>
            <Card>2</Card></Col>  
        </Row>
        <br/>
        <Card bordered={false}>
            table        
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Forhelp;
