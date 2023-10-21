const Notification = new Vue({
  el: "#MutinyNotifications",

  methods: {
    Notification(data) {
      this.$vs.notification({
        title: data.title,
        text: data.text,
        position: data.position,
        color: data.color,
        border: data.border,
        icon: data.icon,
        duration: data.duration,
        flat: data.flat,
        sticky: data.sticky,
        square: data.square,
        width: data.width,
        progress: data.progress,
        notPadding: data.notPadding,
      });
    },
  },
});

document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    window.addEventListener("message", ({ data }) => {
      if (data.type !== "notification") return;
      Notification(data);
    });
  }
};
