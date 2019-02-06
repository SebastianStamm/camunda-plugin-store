define(["angular"], function(angular) {
  var ngModule = angular.module("cockpit.cockpitTicTacToe", []);

  ngModule.config([
    "ViewsProvider",
    function(ViewsProvider) {
      ViewsProvider.registerDefaultView("cockpit.dashboard", {
        id: "cockpit.cockpitTicTacToe",
        priority: 9001,
        template: `<center><iframe width="640px" height="320px"  scrolling="no" frameborder="0"
        src="http://tic-tac-toe.com/?embed">
        </iframe></center>`
      });
    }
  ]);

  return ngModule;
});
