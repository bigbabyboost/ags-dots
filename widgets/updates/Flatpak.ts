import { bash } from "lib/utils";
import {
  type Flatpak,
  flatpakUpdates,
  refetchFlatpakUpdates,
} from "module-vars/updates/flatpak";

const WINDOW_NAME = "flatpak-updates";

const UpdateItem = (update: Flatpak) => {
  const name = Widget.Label({
    class_name: "name",
    max_width_chars: 22,
    truncate: "end",
    label: update.name,
  });

  const version = Widget.Label({ label: update.version });
  const downloadIcon = Widget.Label({
    class_name: "download-icon",
    label: "󰇚 ",
  });

  const meta = Widget.Box({
    children: [
      downloadIcon,
      name,
      Widget.Separator({ hexpand: true }),
      version,
    ],
  });

  return Widget.Button({
    class_name: "update-item",
    on_primary_click: () => {
      App.closeWindow(WINDOW_NAME);
      bash(`foot -e --hold flatpak update ${update.id}`).then(() =>
        refetchFlatpakUpdates(),
      );
    },
    child: meta,
  });
};

const UpdateList = () =>
  Widget.Scrollable({
    class_name: "update-list",
    child: Widget.Box({
      vexpand: true,
      vertical: true,
      children: flatpakUpdates.bind().as((updates) => updates.map(UpdateItem)),
    }),
  });

const UpdateAll = Widget.Box({
  children: [
    Widget.Box({
      class_name: "update-all",
      children: [
        Widget.Separator({ hexpand: true }),
        Widget.Button({
          label: "󰚰 Update All",
          on_primary_click: () => {
            App.closeWindow(WINDOW_NAME);
            bash("foot -e --hold flatpak update").then(() =>
              refetchFlatpakUpdates(),
            );
          },
        }),
      ],
    }),
  ],
});

const Updates = Widget.Box({
  vertical: true,
  css: "min-width:28rem; min-height: 16rem;",
  spacing: 8,
  children: [UpdateList(), UpdateAll],
});

const Fallback = Widget.CenterBox({
  class_name: "fallback",
  vertical: true,
  hexpand: true,
  centerWidget: Widget.Box({
    vertical: true,
    spacing: 10,
    children: [
      Widget.Label({ label: "🎊", css: "font-size: 42;" }),
      Widget.Label({ label: "All apps are updated :)" }),
    ],
  }),
});

const UpdatesPopup = () =>
  Widget.Box({
    css: "min-width:28rem; min-height: 16rem; padding: 8px;",
    children: [
      Widget.Box({ children: [Fallback] }).hook(flatpakUpdates, (self) => {
        if (flatpakUpdates.value.length > 0) {
          self.remove(Fallback);
          self.add(Updates);
        }
      }),
    ],
  });

export default () =>
  Widget.Window({
    name: WINDOW_NAME,
    visible: false,
    anchor: ["left", "top"],
    margins: [6, 360],
    child: UpdatesPopup(),
  });
