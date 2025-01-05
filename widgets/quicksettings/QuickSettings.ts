import ButtonsGrid from "./ButtonsGrid";
import Calendar from "./Calendar";
import Mpris from "./Mpris.ts";
import Profile from "./Profile";

export const notifications = await Service.import("notifications");

const ControlPannel = () => {
  return Widget.Box({
    spacing: 10,
    class_name: "control-pannel",
    css: "margin: 6px 6px;",
    vpack: "start",
    vertical: true,
    children: [Profile(), ButtonsGrid(), Mpris(), Calendar()],
  });
};

export default () =>
  Widget.Window({
    visible: false,
    name: "quicksettings",
    anchor: ["left", "top", "bottom"],
    css: "background: transparent;",
    child: ControlPannel(),
  });
