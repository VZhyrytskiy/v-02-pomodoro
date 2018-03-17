const pomodoroStates = {
  work: 'work',
  rest: 'rest'
};

const states = {
  started: 'started',
  stopped: 'stopped',
  paused: 'paused'
};

const workingTimeLengthInMinutes = 25;
const restingTimeLengthInMinutes = 5;

new Vue({
  el: '#app',
  data: {
    state: states.stopped,
    minute: workingTimeLengthInMinutes,
    second: 0,
    pomodoroState: pomodoroStates.work,
    timestamp: 0
  },
  computed: {
    title() {
      return this.pomodoroState === pomodoroStates.work ? 'Work!' : 'Rest!';
    },
    min() {
      return this.minute.toString().padStart(2, '0');
    },
    sec() {
      return this.second.toString().padStart(2, '0');
    }
  },
  methods: {
    start() {
      this.state = states.started;
      this._tick();
      this.interval = setInterval(this._tick, 1000);
    },

    pause() {
      this.state = states.paused;
      clearInterval(this.interval);
    },

    stop() {
      this.state = states.stopped;
      clearInterval(this.interval);
      this.pomodoroState = pomodoroStates.work;
      this.minute = workingTimeLengthInMinutes;
      this.second = 0;
    },

    _tick() {
      if (this.second !== 0) {
        this.second--;
        return;
      }

      if (this.minute !== 0) {
        this.minute--;
        this.second = 59;
        return;
      }

      this.pomodoroState =
        this.pomodoroState === pomodoroStates.work
          ? pomodoroStates.rest
          : pomodoroStates.work;

      if (this.pomodoroState === pomodoroStates.work) {
        this.minute = workingTimeLengthInMinutes;
      } else {
        this.minute = restingTimeLengthInMinutes;
      }
    }
  }
});
