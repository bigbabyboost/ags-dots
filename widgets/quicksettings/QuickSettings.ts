import { Player } from "widgets/mpris/Mpris.ts";
import SysFetch from "./SysFetch";
import ButtonsGrid from "./ButtonsGrid";

const mpris = await Service.import("mpris");
export const showQuickSettings = Variable(true);

const ControlPannel = () => {
  return Widget.Box({
    spacing: 10,
    css: "margin: 10px 10px;",
    vpack: "start",
    vertical: true,
    children: [
      SysFetch(),
      ButtonsGrid(),
      Widget.Box().hook(mpris, (self) => {
        self.class_name = "mpris";
        const player = mpris.getPlayer("spotify") || mpris.getPlayer() || null;
        if (!player) {
          self.hide();
          return;
        }
        self.child = Player(player);
      }),
    ],
  });
};

export default () =>
  Widget.Window({
    visible: showQuickSettings.bind(),
    name: "quicksettings",
    anchor: ["left", "top", "bottom"],
    css: "border-top: 1px solid rgba(255, 255, 255, 0.1);",
    layer: "overlay",
    child: ControlPannel(),
  });
