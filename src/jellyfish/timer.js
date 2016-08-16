import {UPDATE_FPS_RATE} from '../data/const';

/** Class representing a timer. */
class Timer{

  constructor() {
    this.rotation = 0;
    this.lastUpdateTime = this.startTime = (new Date()).getTime();
    this.countForFPS = 0;
    this.averageFPS = "Wait for FPS update"
  };

  updateTime(){
    this.now = (new Date()).getTime(); // We are here in ms
    this.elapsedTime = (this.now - this.lastUpdateTime);
    this.lastUpdateTime = this.now;

    // Display the time only every 200 FPS - otherwise, the influence is not negligible.
    // Using gui.dat from Google for the nice interface doesn't impact performance since
    // We manually refresh the FPS at our desired rate (every 500 frames, for instance)...

    if (this.countForFPS++ == UPDATE_FPS_RATE) {
      this.endTime = this.now;
      this.countForFPS = 0; 
      this.averageFPS = (UPDATE_FPS_RATE * 1000 / (this.endTime - this.startTime)).toPrecision(4);

      var parent =document.getElementById("averageFPS");
      parent.removeChild(parent.children[0]);
      var input = document.createElement("input")
      input.setAttribute("type", "text")
      input.setAttribute("value", this.averageFPS);
      parent.appendChild(input)
 
      this.startTime = this.endTime;
    }
  };

}

export default Timer;


