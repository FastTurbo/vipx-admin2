import React from 'react';
import { Radio } from 'antd'
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, Guide } from 'bizcharts';
import DataSet from '@antv/data-set';

class ChartPicApp extends React.Component {
  state = {
    termType:'pc'
  }
  render() {
    const { DataView } = DataSet;
    const { Html } = Guide;
    const { datas, title } = this.props;
    const data = [];
    for (let i = 0; i < datas.length; ++i) {
      data.push({
        item: datas[i].item,
        count: datas[i].count,
      });
    }
    const dv = new DataView();
    dv.source(data).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent',
    });
    const cols = {
      percent: {
        formatter: val => {
          val = (val * 100).toFixed(2) + '%';
          return val;
        },
      },
    };
    return (
      <div>
        <Chart height={300} data={dv} scale={cols} padding={[80, 80, 80, 80]} forceFit>
          <Guide>
            <Html position={['0', '110']} html={title}  />
          </Guide>
          <Radio.Group value='1' onChange={this.handleChange}>
                <Radio.Button value="pc">PC</Radio.Button>
                <Radio.Button value="mac">MAC</Radio.Button>
          </Radio.Group>
          <Coord type={'theta'} radius={0.75} innerRadius={0.6} />
          <Axis name="percent" />
          <Legend position="top" offsetY={-50} offsetX={-10} />
          <Tooltip
            showTitle={false}
            itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
          />
          
          <Geom
            type="intervalStack"
            position="percent"
            color="item"
            tooltip={[
              'item*percent',
              (item, percent) => {
                percent = percent * 100 + '%';
                return {
                  name: item,
                  value: percent,
                };
              },
            ]}
            style={{
              lineWidth: 1,
              stroke: '#fff',
            }}
          >
            <Label
              content="percent"
              formatter={(val, item) => {
              // return item.point.item + ': ' + val;
              return  val;
              }}
            />
          </Geom>
        </Chart>
      </div>
    );
  }
}

export default ChartPicApp;
