import React from "react";

class Countdown extends React.Component {
  constructor() {
    super();
    this.state = { currentTime: "00:00", timerTime: 1, timerState: false };
    this.start = new Date().getTime();
  }

  startTimer = () => {
    if (!this.state.timerState) {
      this.setState({ timerState: true });
    } else {
      this.setState({ timerState: false });
    }

    const countDownDate = new Date(
      this.start + this.state.timerTime * 60000
    ).getTime();

    this.mytimer = setInterval(() => {
      if (this.state.timerState) {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        var output = (minutes > 0 ? minutes : "0" + minutes) + ":" + seconds;
        this.setState({ currentTime: output });
        console.log(this.state.currentTime);

        if (distance < 0) {
          clearInterval(this.mytimer);
          this.setState({ currentTime: "00:00" });
          console.log("EXPIRED");
        }
      } else if (this.state.timerState === false) {
        clearInterval(this.mytimer);
      }
    }, 1000);
  };

  stopTimer = () => {
    this.setState({ currentTime: "00:00" });
    this.setState({ timerState: false });
  };

  render() {
    return (
      <div>
        <h1>Timer Div</h1>
        <h2>{this.state.currentTime}</h2>

        <button onClick={() => this.startTimer()}>
          {this.state.timerState ? "Pause" : "Start"}
        </button>

        <button onClick={this.stopTimer}>STOP</button>
      </div>
    );
  }
}

export default Countdown;
