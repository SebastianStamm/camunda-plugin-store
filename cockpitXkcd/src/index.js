export default {
  id: "cockpit.xkcd",
  pluginPoint: "cockpit.dashboard",
  priority: 9001,
  render: (container) => {
    container.innerHTML = `<center><img src="https://imgs.xkcd.com/comics/tree.png "></center>`;
  },
};
