import Clock from "./modules/Clock.ts";
import FlatpakUpdatesCount from "./modules/FlatpakUpdatesCount";
import Mpris from "./modules/Mpris.ts";
import { NetworkIndicator } from "./modules/Network.ts";
import NotifyIcon from "./modules/NotifyIcon";
import QSButton from "./modules/QSButton";
import QuickAccessButtons from "./modules/QuickAccessButtons";
import { CpuUsage, MemoryUsage } from "./modules/SysMonitor.ts";
import SysTray from "./modules/SysTray.ts";
import Volume from "./modules/Volume.ts";
import Workspaces from "./modules/Workspaces.ts";

const Left = () =>
  Widget.Box({
    spacing: 8,
    children: [
      QSButton,
      Workspaces(),
      CpuUsage(),
      MemoryUsage(),
      FlatpakUpdatesCount(),
    ],
  });

const Center = () =>
  Widget.Box({
    spacing: 8,
    children: [Clock(), SysTray()],
  });

const Right = () =>
  Widget.Box({
    hpack: "end",
    spacing: 8,
    children: [
      Mpris(),
      QuickAccessButtons,
      NetworkIndicator(),
      Volume(),
      NotifyIcon(),
    ],
  });

export default (monitor = 0) =>
  Widget.Window({
    name: `bar-${monitor}`,
    monitor,
    anchor: ["top", "left", "right"],
    exclusivity: "exclusive",
    child: Widget.CenterBox({
      class_name: "bar",
      start_widget: Left(),
      center_widget: Center(),
      end_widget: Right(),
    }),
  });
