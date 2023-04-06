import React, { Component } from "react";
import { styled } from "twin.macro";

interface Reading {
  name: string;
  value: number;
  color: string;
}

interface MultiColorProgressBarProps {
  readings: Reading[];
}

class MultiColorProgressBar extends Component<MultiColorProgressBarProps> {
  constructor(props: MultiColorProgressBarProps) {
    super(props);
  }

  render() {
    const parent = this.props;

    const values: any =
      parent.readings &&
      parent.readings.length &&
      parent.readings.map(function (item, i) {
        if (item.value > 0) {
          return (
            <div
              className="value"
              style={{ color: item.color, width: item.value + "%" }}
              key={i}
            >
              <span>{item.value * 2}</span>
            </div>
          );
        }
      }, this);

    const calibrations: any =
      parent.readings &&
      parent.readings.length &&
      parent.readings.map(function (item, i) {
        if (item.value > 0) {
          return (
            <div
              className="graduation"
              style={{ color: item.color, width: item.value + "%" }}
              key={i}
            >
              <span>|</span>
            </div>
          );
        }
      }, this);

    const bars: any =
      parent.readings &&
      parent.readings.length &&
      parent.readings.map(function (item, i) {
        if (item.value > 0) {
          return (
            <div
              className="bar"
              style={{ backgroundColor: item.color, width: item.value + "%" }}
              key={i}
            ></div>
          );
        }
      }, this);

    const legends: any =
      parent.readings &&
      parent.readings.length &&
      parent.readings.map(function (item, i) {
        if (item.value > 0) {
          return (
            <div className="legend" key={i}>
              <span className="dot" style={{ color: item.color }}>
                ●
              </span>
              <span className="label">{item.name}</span>
            </div>
          );
        }
      }, this);

    return (
      <MultiStlye>
        <div className="multicolor-bar">
          <div className="values">{values === "" ? "" : values}</div>
          <div className="scale">{calibrations === "" ? "" : calibrations}</div>
          <div className="bars">{bars === "" ? "" : bars}</div>
          {/* <div className="legends">{legends === "" ? "" : legends}</div> */}
        </div>
      </MultiStlye>
    );
  }
}

const MultiStlye = styled.div`
  .multicolor-bar {
    margin: 20px 200px;
  }

  .multicolor-bar .values .value {
    float: left;
    text-align: center;
  }

  .multicolor-bar .scale .graduation {
    float: left;
    text-align: center;
  }

  .multicolor-bar .bars .bar {
    float: left;
    height: 10px;
  }

  .multicolor-bar .bars div.bar:first-of-type {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  .multicolor-bar .bars div.bar:last-of-type {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .multicolor-bar .legends {
    text-align: center;
  }

  .multicolor-bar .legends .legend {
    display: inline-block;
    margin: 0 5px;
    text-align: center;
  }

  .multicolor-bar .legends .legend .dot {
    font-size: 25px;
    vertical-align: middle;
  }

  .multicolor-bar .legends .legend .label {
    margin-left: 2px;
    vertical-align: middle;
  }
`;

export default MultiColorProgressBar;
