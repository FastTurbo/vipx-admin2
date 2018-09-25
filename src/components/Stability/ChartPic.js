import React from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, Guide } from 'bizcharts';
import DataSet from '@antv/data-set';

class ChartPic extends React.Component {
  render() {
    const { DataView } = DataSet;
    const { Html } = Guide;
    const { datas, title } = this.props;
    const data = [];

    
    if(datas.length > 0){
      for (let i = 0; i < datas.length; ++i) {
        data.push({
          item: datas[i].msg,
          count: +datas[i].percent,
        });
      }
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
        <Chart height={430} data={dv} scale={cols} padding={[180, 80, 80, 80]} forceFit>
          <Coord type={'theta'} radius={0.75} innerRadius={0.6} />
          <Axis name="percent" />
          <Legend position="top" offsetY={-50} offsetX={0} clickable={false}/>
          <Tooltip
            showTitle={false}
            itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
          />
          <Guide>
            <Html position={['50%', '50%']} html={title} alignX="middle" alignY="middle" />
          </Guide>
          <Geom
            type="intervalStack"
            position="percent"
            color="item"
            tooltip={[
              'item*percent',
              (item, percent) => {
                percent = (percent * 100).toFixed(2) + '%';
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

export default ChartPic;
