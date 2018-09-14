import React from 'react';
import { Table } from 'antd';

class TableProblem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { colType, dataArr } = this.props;
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
        <Table columns={columns} dataSource={dataArr} />
      </div>
    );
  }
}

export default TableProblem;
