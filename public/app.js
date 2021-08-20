/* global Vue */
var app = new Vue({
  el: "#app",
  data: () => {
    return {
      message : 'Vue is working 👍'
    };
  },
  computed: {
    sum() {
      return 2 + 2;
    }
  },
  methods : {
    doStuff() {
      this.message = 'I did it! ✅'
    }
    
  }
});