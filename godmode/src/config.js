document
  .querySelector("base")
  .setAttribute(
    "cam-exclude-plugins",
    JSON.parse(localStorage.getItem("godmodePlugins") || "[]").join(",")
  );
