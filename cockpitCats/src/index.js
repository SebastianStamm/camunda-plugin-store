export default {
  id: "cockpit.cats",
  pluginPoint: "cockpit.dashboard",
  priority: 9001,
  render: (container) => {
    container.innerHTML =
      '<h1>Cats!</h1><img src="http://thecatapi.com/api/images/get?size=medium" width="400" />';
  },
};
