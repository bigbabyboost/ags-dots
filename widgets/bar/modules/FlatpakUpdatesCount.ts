import { flatpakUpdates } from "module-vars/updates/flatpak";

export default () =>
  Widget.Revealer({
    child: Widget.Box({
      class_name: "flatpak-updates-count",
      children: [
        Widget.Button({
          class_name: "icon",
          on_primary_click: () => App.toggleWindow("flatpak-updates"),
          css: "padding-right: 5px; padding-left: 8px;",
          label: " ",
        }),
        Widget.Label({
          class_name: "value",
          label: flatpakUpdates.bind().as((o) => o.length.toString()),
        }),
      ],
    }),

    setup: (self) => {
      const isRunning = Utils.exec("pgrep flatpak");

      if (isRunning) {
        self.reveal_child = true;
      }
    },
  });
