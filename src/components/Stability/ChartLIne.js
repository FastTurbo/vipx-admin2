import React from 'react';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';

class Series extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formLayout: 'today',
      profession: '学生',
      ifRadio: false,
      days: 1,
    };
  }
  render() {
    const { days, ifRadio, profession } = this.state;
    const data = [];

    for (let i = 0; i < days; ++i) {
      data.push({
        month: i + 1,
        总课程数: 7.0,
        影响课堂数: 3.9,
      });
    }
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'fold',
      fields: ['总课程数', '影响课堂数'],
      // 展开字段集
      key: 'city',
      // key字段
      value: 'temperature', // value字段
    });
    // console.log(dv);
    const cols = {
      month: {
        range: [0, 1],
      },
    };

    return (
      <div>
        <Chart height={400} data={dv} scale={cols} forceFit>
          <Legend />
          <Axis name="month" />
          <Axis
            name="temperature"
            label={{
              formatter: val => `${val}人`,
            }}
          />
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom
            type="line"
            position="month*temperature"
            size={2}
            color={['city', ['#ff0000', '#00ff00']]}
          />
          <Geom
            type="point"
            position="month*temperature"
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

export default Series;
