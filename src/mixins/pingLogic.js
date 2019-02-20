const Monitor = require("ping-monitor");
export default {
  created() {
    if (this.remote.monitoring) {
      this.monitorCreate()
    }
  },
  updated(){
    this.monitorDestroy()
    if(this.remote.monitoring)
      this.monitorCreate()
  },
  destroyed(){
    this.monitorDestroy()
  },
  methods: {
    monitorCreate(){
      this.monitor = new Monitor({
        website: this.remote.uri,
        interval: this.remote.interval / 60
      });

      const audio = {
        up: new Audio("../../public/audio/notif-up.wav"),
        err: new Audio("../../public/audio/notif-err.wav")
      }
      let notifications = {
        up: null,
        down: null
      }

      let downCallback = res => {
        console.warn(`${this.remote.alias} is down :(`)
        //this.currentStatus = 'offline'

        if (!notifications.down) {
          notifications.down = notification || new Notification(`${this.remote.alias} is down :(`, {
            body: '\n \n No response from the health point.'
          })

          notification.onshow = () => {
            audio.err.play()
          }
        }  
      }

      this.monitor.on("up", res => {
        console.log(`${this.remote.alias} is up!`)
        //this.currentStatus = 'online'
        
        if (notifications.up) {
          notifications.up = notification || new Notification(`${this.remote.alias} is up!`, {
            body: '\n \n Health endpoint is responding.'
          })
          notification.onshow = () => {
            audio.up.play()
          }
        }
      })

      this.monitor.on("error", downCallback)

      this.monitor.on('down', downCallback)
    },
    monitorDestroy(){
      if(this.monitor){
        this.monitor.stop()
        this.monitor = null
      }
    }
  }
};
