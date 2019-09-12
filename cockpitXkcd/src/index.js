define(["angular"], function(angular) {
  var ngModule = angular.module("cockpit.xkcd", []);

  ngModule.config([
    "ViewsProvider",
    function(ViewsProvider) {
      ViewsProvider.registerDefaultView("cockpit.dashboard", {
        id: "cockpit.cockpitXkcd",
        priority: 9001,
        template: `<center><img src="https://imgs.xkcd.com/comics/tree.png "></center>`
      });
    }
  ]);

  return ngModule;
});
