import React from 'react';
import { Table } from 'antd';


class TableProblem extends React.Component {
  state = {
    pagination: {
      defaultCurrent:1
    }
  }
  render() {
    const { colType, dataArr = [], loading } = this.props;
    const { pagination } = this.state
    const columns = [];
    for (let i = 0; i < colType.length; ++i) {
      columns.push({
        title: colType[i].title,
        dataIndex: colType[i].dataIndex,
        key: colType[i].dataIndex,
      });
    }
    return (
      <div>
        <Table loading={ loading } pagination={ pagination } columns={columns} dataSource={ dataArr } />
      </div>
    );
  }
}

export default TableProblem;
