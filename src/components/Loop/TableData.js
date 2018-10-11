import React from 'react';
import { Table, Pagination } from 'antd';


class TableData extends React.Component {
  render() {
    const { colType, dataArr = [], loading, pagination} = this.props;
    return (
      <div>
        <Table  loading={ loading } 
                pagination={ pagination } 
                columns={ colType } 
                dataSource={ dataArr }
        />
      </div>
    );
  }
}

export default TableData;
