export default {
  id: "cockpit.cockpitSpaceInvaders",
  pluginPoint: "cockpit.dashboard",
  priority: 9001,
  render: (container) => {
    container.innerHTML = `<center><iframe src="https://funhtml5games.com?embed=spaceinvaders" style="width:800px;height:550px;border:none;" frameborder="0" scrolling="no"></iframe></center>`;
  },
};
