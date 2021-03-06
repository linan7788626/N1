import React from 'react';
import Moment from 'moment';
import classNames from 'classnames';

export default class CurrentTimeIndicator extends React.Component {
  static propTypes = {
    gridHeight: React.PropTypes.number,
    numColumns: React.PropTypes.number,
    todayColumnIdx: React.PropTypes.number,
    visible: React.PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this._movementTimer = null;
    this.state = this.getStateFromTime();
  }

  componentDidMount() {
    // update our displayed time once a minute
    this._movementTimer = setInterval(() => {
      this.setState(this.getStateFromTime())
    }, 60 * 1000);
  }

  componentWillUnmount() {
    clearTimeout(this._movementTimer);
    this._movementTimer = null;
  }

  getStateFromTime() {
    const now = Moment();
    return {
      msecIntoDay: now.millisecond() + (now.second() + (now.minute() + (now.hour() * 60)) * 60) * 1000,
    }
  }

  render() {
    const {gridHeight, numColumns, todayColumnIdx, visible} = this.props;
    const msecsPerDay = 24 * 60 * 60 * 1000;
    const {msecIntoDay} = this.state;

    const todayMarker = (todayColumnIdx !== -1) ? <div style={{left: `${Math.round(todayColumnIdx * 100 / numColumns)}%`}} /> : null

    return (
      <div
        className={classNames({"current-time-indicator": true, "visible": visible})}
        style={{top: gridHeight * (msecIntoDay / msecsPerDay)}}
      >
        {todayMarker}
      </div>
    )
  }
}
