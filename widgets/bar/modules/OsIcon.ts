export default Widget.EventBox({
  class_name: "distro-icon",
  onPrimaryClick: () => App.toggleWindow("quicksettings"),
  child: Widget.Label({
    label: "",
  }),
});
