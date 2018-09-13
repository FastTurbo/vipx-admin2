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
        title: colType[i],
        dataIndex: colType[i],
        key: colType[i],
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
