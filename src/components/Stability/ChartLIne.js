import React from 'react';
import { connect } from 'dva';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';

@connect(state => ({
  days: state.problemClass.days
}))
class ChartLine extends React.Component {
  
  render() {
    const { days, list } = this.props;
    const data = [];
    if(list.length > 0){
      for (let i = 0; i < days; ++i) {
        data.push({
          classNum: list[i].date,
          总课程数: list[i].classesNum,
          影响课堂数: list[i].problemClassesNum,
        });
      }
    }
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'fold',
      fields: ['总课程数', '影响课堂数'],
      // 展开字段集
      key: 'city',
      // key字段
      value: 'date', // value字段
    });
    const cols = {
      classNum: {
        range: [0, 1],
      },
    };

    return (
      <div>
        <Chart height={400} data={dv} scale={cols} forceFit>
          <Legend />
          <Axis name="classNum" />
          <Axis
            name="date"
            label={{
              formatter: val => `${val}`,
            }}
          />
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom
            type="line"
            position="classNum*date"
            size={2}
            color={'city'}
          />
          <Geom
            type="point"
            position="classNum*date"
            size={4}
            shape={'circle'}
            color={'city'}
            style={{
              stroke: '#fff',
              lineWidth: 1,
            }}
          />
        </Chart>
      </div>
    );
  }
}

export default ChartLine;
