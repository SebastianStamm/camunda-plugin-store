define(["angular"], function(angular) {
  var ngModule = angular.module("cockpit.cockpitSpaceInvaders", []);

  ngModule.config([
    "ViewsProvider",
    function(ViewsProvider) {
      ViewsProvider.registerDefaultView("cockpit.dashboard", {
        id: "cockpit.cockpitSpaceInvaders",
        priority: 9001,
        template: `<center><iframe src="https://funhtml5games.com?embed=spaceinvaders" style="width:800px;height:550px;border:none;" frameborder="0" scrolling="no"></iframe></center>`
      });
    }
  ]);

  return ngModule;
});
