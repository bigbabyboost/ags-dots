import { Fallback } from "custom-widgets/Fallback";
import icons from "lib/icons";
import { bash } from "lib/utils";
import {
  type Flatpak,
  flatpakUpdates,
  loading,
  refetchFlatpakUpdates,
} from "module-vars/updates/flatpak";
import { options } from "options";

const WINDOW_NAME = "flatpak-updates";

const UpdateItem = (update: Flatpak) => {
  const name = Widget.Label({
    class_name: "name",
    max_width_chars: 22,
    truncate: "end",
    label: update.name,
  });

  const icon = Widget.Icon({ icon: update.id, size: 20 });

  const version = Widget.Label({
    class_name: "update-value",
    label: update.version,
  });
  const updateIcon = Widget.Label({
    class_name: "update-icon",
    label: "󰁡 ",
  });

  const meta = Widget.Box({
    spacing: 6,
    children: [
      icon,
      name,
      Widget.Separator({ hexpand: true }),
      version,
      updateIcon,
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

const ActionButtons = () => {
  const cancelBtn = Widget.Button({
    class_name: "action-buttons cancel",
    label: "Cancel",
    on_primary_click: () => App.closeWindow(WINDOW_NAME),
  });

  const updateBtn = Widget.Button({
    class_name: "action-buttons update",
    label: "Update all",
    on_primary_click: () => {
      App.closeWindow(WINDOW_NAME);
      loading.setValue(true);
      bash(`${options.terminal} -e --hold flatpak update`).then(() =>
        refetchFlatpakUpdates(),
      );
    },
  });

  return Widget.Box({
    class_name: "action-buttons",
    hpack: "end",
    spacing: 8,
    children: [cancelBtn, updateBtn],
  });
};

const Updates = Widget.Box({
  vertical: true,
  css: "min-width:24rem; min-height: 14rem;",
  spacing: 8,
  children: [UpdateList(), ActionButtons()],
});

const UpdatesPopup = () =>
  Widget.Box({
    css: "min-width:24rem; min-height: 14rem; padding: 8px;",
    children: [
      Widget.Box({}).hook(flatpakUpdates, (self) => {
        if (flatpakUpdates.value.length > 0) {
          self.children = [Updates];
        } else
          self.children = [
            Fallback({
              iconType: "label",
              icon: loading.bind().as((v) => (v ? "🍞" : "🎊")),
              label: loading
                .bind()
                .as((v) => (v ? "Loading..." : "All apps are updated :)")),
            }),
          ];
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
