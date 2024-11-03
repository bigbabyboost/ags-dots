import Header from "custom-widgets/Header";
import { bash } from "lib/utils";
import { Fallback } from "custom-widgets/Fallback";
import { pictures, setWall, removeWall } from "./wallpaperUtils";

export const WINDOW_NAME = "wallpapers";

// Widgets
const Wallpaper = (wallpaper: string) =>
  Widget.EventBox({
    on_primary_click: () => setWall(wallpaper),
    on_secondary_click: () => removeWall(wallpaper),
    child: Widget.Overlay({
      child: Widget.Box({ css: "min-width: 400px", vexpand: true }),
      overlays: [
        Widget.Icon({ size: 400, css: "border-radius: 6px", icon: wallpaper }),
      ],
    }),
  });

const Body = () =>
  Widget.Scrollable({
    css: "min-height: 200px;",
    vscroll: "never",
    hscroll: "always",
    child: Widget.Box({
      spacing: 8,
    }).hook(pictures, (self) => {
      if (pictures.value.length > 0) {
        self.children = pictures.value.map(Wallpaper);
      } else
        self.child = Fallback({
          icon: "org.gnome.Shotwell",
          label: "No wallpapers found",
        });
    }),
  });

const Footer = () =>
  Widget.Box({
    spacing: 6,
    children: [
      Header("WALLPAPERS"),
      Widget.Separator({ hexpand: true }),
      Widget.Button({
        label: "Add Walls",
        on_primary_click: () => {
          bash(`${App.configDir}/scripts/swww.sh`).then((out) => {
            if (!out) return;
            pictures.value = [...out.split("\n"), ...pictures.value];
            bash(
              `bash -c 'notify-send "WALLPAPERS" "Selected wallpapers successfully added:)"'`,
            );
          });
        },
      }),
    ],
  });

export default () =>
  Widget.Window({
    name: WINDOW_NAME,
    visible: false,
    anchor: ["top", "right", "left"],
    child: Widget.Box({
      vertical: true,
      css: " padding: 10px;",
      spacing: 8,
      children: [Body(), Footer()],
    }),
  });
