import icons from "lib/icons";

export default Widget.Button({
  class_name: "qs-button",
  onPrimaryClick: () => App.toggleWindow("quicksettings"),
  child: Widget.Icon({
    class_name: "qs icon",
    icon: icons.ui.link,
  }),
});
