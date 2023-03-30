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

    let values =
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
              <span>{item.value}%</span>
            </div>
          );
        }
      }, this);

    let calibrations =
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

    let bars =
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

    let legends =
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
          <div className="legends">{legends === "" ? "" : legends}</div>
        </div>
      </MultiStlye>
    );
  }
}

// let readings: Reading[] = [
//   {
//     name: "Apples",
//     value: 60,
//     color: "#eb4d4b",
//   },
//   {
//     name: "Blueberries",
//     value: 7,
//     color: "#22a6b3",
//   },
//   {
//     name: "Guavas",
//     value: 23,
//     color: "#6ab04c",
//   },
//   {
//     name: "Grapes",
//     value: 10,
//     color: "#e056fd",
//   },
// ];

// ReactDOM.render(
//   <MultiColorProgressBar readings={readings} />,
//   document.getElementById("root")
// );

const MultiStlye = styled.div`
  .multicolor-bar {
    margin: 20px 20%;
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
