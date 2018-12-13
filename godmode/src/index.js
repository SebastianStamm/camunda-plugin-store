define(["angular"], function(angular) {
  const template = `
  <style>
  .godmode li {
    list-style: none;
    border: 1px solid black;
    padding: 15px 15px 15px 85px;
    margin: 10px;
    box-shadow: 5px 5px 5px #0000001f;
    font-size: 2rem;
    position: relative;
    transition: 0.2s;
  }

  .godmode li.on {
    background-color: #e5ffec;
  }

  .godmode li.off, .godmode li.off li {
    background-color: #ffe5e5;
  }

  .godmode ul {
    padding-inline-start: 0;
    margin-top: 15px;
  }

  .godmode .toggleBtn {
    display:inline-block;
    padding:0.7em 1.4em;
    margin:0 0.3em 0.3em 0;
    box-sizing: border-box;
    text-decoration:none;
    font-family:'Roboto',sans-serif;
    text-transform:uppercase;
    font-weight:400;
    background-color: #33ff79;
    // background-color: #bcc5bed4;
    box-shadow:inset 0 -0.6em 0 -0.35em rgba(0,0,0,0.17);
    text-align:center;
    border: none;
    position: absolute;
    left: 0;
    top: 0;
    height: 58px;
    width: 68px;
    transition: 0.2s;
  }

  .godmode li.on .toggleBtn {
    background-color: #33ff79;
  }
  .godmode li.off .toggleBtn {
    background-color: #ff3333;
  }


  .checkmark {
    display:inline-block;
    width: 22px;
    height:22px;
    transform: scale(4) rotate(45deg);
    filter: drop-shadow(0 0 .4px green);
    margin-left: -5px;
    pointer-events: none;
  }

  .checkmark div {
    background-color:#29e61a;
    transition: 0.2s;
  }

  .checkmark_stem {
    position: absolute;
    width:3px;
    height:9px;
    left:11px;
    top:6px;
  }

  .checkmark_kick {
    position: absolute;
    width:3px;
    height:3px;
    left:8px;
    top:12px;
  }

  li.off .toggleBtn .checkmark div {
    background-color: red;
  }

  li.off .toggleBtn .checkmark_stem {
    left:10px;
    top:7px;
  }

  li.off .toggleBtn .checkmark_kick {
    width:9px;
    left:7px;
    top:10px;
  }

  </style>
  <!--div class="dashboard godmode" style="background-image: url(https://www.deseretnews.com/images/article/hires/1408818/1408818.jpg); background-size: cover; background-color: #f3f3f3; padding: 0 15em;"-->
  <div class="dashboard godmode" style="background-color: #f3f3f3; padding: 0 15em;">
    <h1>Hello World! <i style="font-size: 0.5em">--God</i></h1>
    <ul id="godmodeList"></ul>
  </div>
  `;

  var ngModule = angular.module("cockpit.godmode", []);

  ngModule.config([
    "ViewsProvider",
    "$routeProvider",
    function(ViewsProvider, routeProvider) {
      routeProvider.when("/god", {
        template,
        authentication: "required",
        controller: [
          "$scope",
          "Plugins",
          function($scope, Plugins) {
            $scope.$root.showBreadcrumbs = false;
            const groupedPlugins = Plugins.getAllProviders("view");
            const pluginList = Object.keys(groupedPlugins).reduce(
              (acc, curr) => [
                ...acc,
                ...groupedPlugins[curr].map(({ id }) => `${curr}:${id}`)
              ],
              []
            );

            const disabledPlugins = JSON.parse(
              localStorage.getItem("godmodePlugins") || "[]"
            );

            const allPlugins = [];

            [...pluginList, ...disabledPlugins]
              .sort()
              .map(plugin => plugin.split(":"))
              .forEach(([pluginPoint, id]) => {
                const path = pluginPoint.split(".");
                let curr = allPlugins;

                for (let i = 0; i < path.length; i++) {
                  if (!curr[path[i]]) {
                    curr[path[i]] = [];
                  }
                  curr = curr[path[i]];
                }

                curr.push(id);
              });

            console.log(allPlugins);

            const list = document.querySelector("#godmodeList");

            addEntries(allPlugins, list);
          }
        ]
      });

      ViewsProvider.registerDefaultView("cockpit.navigation", {
        id: "cockpit.godmode",
        label: "Godmode",
        pagePath: "#/god",
        priority: 7235,
        checkActive: function(path) {
          return path.indexOf("#/god") > -1;
        },
        template: "<!-- nothing to show, but needed -->"
      });
    }
  ]);

  function addEntries(plugins, node, context = "") {
    const submenus = Object.keys(plugins);

    submenus.forEach(submenu => {
      const subnode = document.createElement("li");
      if (typeof plugins[submenu] === "object") {
        const sublist = document.createElement("ul");
        sublist.style.display = "none";
        const btn = createToggleButton(subnode);
        subnode.appendChild(btn);
        subnode.appendChild(document.createTextNode(submenu));
        node.appendChild(subnode);
        subnode.appendChild(sublist);
        addEntries(plugins[submenu], sublist, context + submenu + ".");

        let nodeOpen = false;
        subnode.addEventListener("click", evt => {
          evt.stopPropagation();
          if (nodeOpen) {
            // close
            sublist.style.display = "none";
            nodeOpen = false;
          } else {
            sublist.style.display = "block";
            nodeOpen = true;
          }
        });
      } else {
        subnode.appendChild(document.createTextNode(plugins[submenu]));
        subnode.setAttribute(
          "data-identifier",
          context.slice(0, -1) + ":" + plugins[submenu]
        );
        node.appendChild(subnode);
        const btn = createToggleButton(subnode);
        subnode.appendChild(btn);
        let on = true;
        subnode.addEventListener("click", evt => {
          evt.stopPropagation();
          if (on) {
            // off
            subnode.classList.remove("on");
            subnode.classList.add("off");
            on = false;
          } else {
            subnode.classList.remove("off");
            subnode.classList.add("on");
            on = true;
          }
          refreshPluginStorage();
        });
      }
    });
  }

  function createToggleButton(li) {
    const btn = document.createElement("div");
    btn.classList.add("toggleBtn");
    li.classList.add("on");
    btn.innerHTML = `<span class="checkmark">
      <div class="checkmark_stem"></div>
      <div class="checkmark_kick"></div>
    </span>`;
    let on = true;
    btn.addEventListener("click", evt => {
      evt.stopPropagation();
      if (on) {
        // off
        li.classList.remove("on");
        li.classList.add("off");
        on = false;
      } else {
        li.classList.remove("off");
        li.classList.add("on");
        on = true;
      }
      refreshPluginStorage();
    });

    return btn;
  }

  function refreshPluginStorage() {
    const nodes = document.querySelectorAll("[data-identifier]");
    const disabled = [];

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.closest(".off")) {
        disabled.push(node.getAttribute("data-identifier"));
      }
    }

    console.log("disabled", disabled);

    localStorage.setItem("godmodePlugins", JSON.stringify(disabled));
  }

  return ngModule;
});
