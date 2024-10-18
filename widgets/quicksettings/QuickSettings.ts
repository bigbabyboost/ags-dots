import { Player } from "widgets/mpris/Mpris.ts";
import SysFetch from "./SysFetch";
import ButtonsGrid from "./ButtonsGrid";

const mpris = await Service.import("mpris");
export const showQuickSettings = Variable(false);

const ControlPannel = () => {
  return Widget.Box({
    spacing: 10,
    class_name: "control-pannel",
    css: "margin: 6px 6px;",
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
    css: "background: transparent;",
    layer: "overlay",
    child: ControlPannel(),
  });
