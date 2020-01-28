import React from "react";
import cheerSound from "../assets/sounds/cheer.wav";
import warHornSound from "../assets/sounds/warhorn.wav";

class Countdown extends React.Component {
  constructor() {
    super();
    this.state = {
      currentTime: "00:00",
      timerTime: 52,
      timerState: false,
      stoppedState: false,
      currentMode: true
    };
    this.timer = -1;
  }

  startTimer = () => {
    if (!this.state.timerState) {
      this.setState({ timerState: true, stoppedState: false });
    } else {
      this.setState({ timerState: false, stoppedState: true });
    }
    this.start = new Date().getTime();
    this.countDownDate = new Date(
      this.start + this.getCurrentMode() * 60000
    ).getTime();

    if (this.timer === -1) {
      this.timer = setInterval(() => {
        var now = new Date().getTime();
        var distance = this.countDownDate - now;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        var output = (minutes > 0 ? minutes : "0" + minutes) + ":" + seconds;
        this.setState({ currentTime: output });

        if (distance < 0) {
          if (this.state.currentMode) {
            this.playSound(cheerSound);
          } else {
            this.playSound(warHornSound);
          }
          clearInterval(this.timer);
          this.timer = -1;
          this.setState(prevState => ({
            currentTime: "00:00",
            timerState: false,
            currentMode: !prevState.currentMode
          }));
        }
      }, 100);
    } else {
      clearInterval(this.timer);
      this.timer = -1;
    }
  };

  playSound = soundName => {
    const sound = new Audio(soundName);
    sound.play();
  };

  getCurrentMode = () => {
    if (this.state.currentMode) {
      return 52;
    } else {
      return 17;
    }
  };

  stopTimer = () => {
    this.setState({
      currentTime: "00:00",
      timerState: false,
      stoppedState: true
    });
    clearInterval(this.timer);
    this.timer = -1;
  };

  handleReset = () => {
    this.setState({
      timerTime: 1,
      currentMode: true,
      stoppedState: false
    });
  };

  render() {
    return (
      <div className="countdown">
        <div className="timersdiv">
          <h1>
            <span className="activetimer">52</span> /{" "}
            <span className="coldtimer">17</span> Timer
          </h1>
          {this.state.currentMode ? (
            <h2 className="activetimer">{this.state.currentTime}</h2>
          ) : (
            <h2 className="coldtimer">{this.state.currentTime}</h2>
          )}
        </div>
        <div className="buttonsdiv">
          {this.state.timerState ? (
            <button disabled>START</button>
          ) : (
            <button
              className="circleanimation"
              onClick={() => this.startTimer()}
            >
              START
            </button>
          )}
          {this.state.timerState ? (
            <button className="circleanimation" onClick={this.stopTimer}>
              STOP
            </button>
          ) : (
            <button disabled>STOP</button>
          )}

          {this.state.stoppedState ? (
            <button className="circleanimation" onClick={this.handleReset}>
              RESET
            </button>
          ) : (
            <button disabled>RESET</button>
          )}
        </div>
      </div>
    );
  }
}

export default Countdown;
