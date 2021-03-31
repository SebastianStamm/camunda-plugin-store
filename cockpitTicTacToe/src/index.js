export default {
  id: "cockpit.cockpitTicTacToe",
  pluginPoint: "cockpit.dashboard",
  priority: 9001,
  render: (container) => {
    container.innerHTML = `<center><iframe width="640px" height="320px"  scrolling="no" frameborder="0"
    src="http://tic-tac-toe.com/?embed">
    </iframe></center>`;
  },
};
