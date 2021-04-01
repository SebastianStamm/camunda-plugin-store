let active = false;

export default {
  id: "cockpit.nightmode",
  pluginPoint: "cockpit.navigation",
  priority: 9002,
  render: (container) => {
    container.innerHTML = "<button>Hello</button>";
    container.style.position = "absolute";
    container.style.right = "155px";
    container.style.top = "8px";

    document.body.style.transition = "filter 0.5s";

    container.querySelector("button").addEventListener("click", () => {
      active = !active;

      if (active) {
        document.body.style.filter = "invert(1)";
      } else {
        document.body.style.filter = "invert(0)";
      }
    });
  },
};
