import React from "react";
import {
  Chart, Geom, Axis, Tooltip, Guide
} from "bizcharts";

class ChartBar extends React.Component {
  render() {
    const { Html } = Guide;
    const { title } = this.props;
    const data = [
      {
        problemType: "IPPT",
        percent: 0.3,
        value: 3
      },
      {
        problemType: "音频",
        percent: 1,
        value: 100
      },
      {
        problemType: "视频",
        percent: 1,
        value: 100
      },
    ];
    const cols = {
      percent: {
        tickInterval: 0.2
      }
    };
    return (
      <div>
        <Chart height={400} data={data} scale={cols} forceFit>
          <Guide>
            <Html position={['50%', '50%']} html={title} offsetX={-100}  offsetY={100} />
          </Guide>
          <Axis name="problemType" />
          <Axis name="percent" />
          <Tooltip
            crosshairs={{
              type: "x",
              style: {
                lineWidth:2,
                  stroke:"#ff0000",
              }
            }}
            // itemTpl='<li>{name}:{value}</li>'
          />
          <Geom type="interval" position="problemType*percent" />
          
        </Chart>
      </div>
    );
  }
}

export default ChartBar;