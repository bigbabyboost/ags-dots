import { flatpakUpdates } from "module-vars/updates/flatpak";

export default () => {
  const icon = Widget.Label({
    class_name: "icon",
    css: "padding-right: 5px;",
    label: " ",
  });

  const value = Widget.Label({
    class_name: "value",
    label: flatpakUpdates.bind().as((o) => o.length.toString()),
  });

  return Widget.Button({
    class_name: "flatpak-updates-count",
    on_primary_click: () => App.toggleWindow("flatpak-updates"),
    child: Widget.Box([icon, value]),
    setup: (self) => {
      if (!Utils.exec("pgrep flatpak")) {
        self.hide();
      }
    },
  });
};
