export default Widget.EventBox({
  onPrimaryClick: () =>
    Utils.exec("bash -c ~/.config/rofi/powermenu/launch.sh"),
  child: Widget.Label({
    class_name: "powermenu-icon",
    label: "",
  }),
});
