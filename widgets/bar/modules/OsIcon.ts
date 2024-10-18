import { showQuickSettings } from "widgets/quicksettings/QuickSettings";

export default Widget.EventBox({
  class_name: "distro-icon",
  onPrimaryClick: () => {
    showQuickSettings.value = !showQuickSettings.value;
  },
  child: Widget.Label({
    label: "",
  }),
});
