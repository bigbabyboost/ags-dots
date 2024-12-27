import icons from "lib/icons";
import { getYearPogress, isLeapYear, timePassedInADay } from "module-vars/misc";
import { uptime } from "module-vars/sysinfo";
import { options } from "options";

const { profile_picture } = options.quicksettings;
const css = `
    background-image: url("${profile_picture}");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    min-height: 90px;
    min-width: 90px;
    border-radius: 8px;
  `;

const Avatar = Widget.Box({ css });

const Buttons = () => {
  const uptimeInfo = Widget.Button({ hexpand: true }).hook(uptime, (self) => {
    self.label = `󰔟 ${uptime.bind().emitter.value}`;
  });

  const lock = Widget.Button({
    class_name: "lock",
    child: Widget.Icon({ icon: icons.ui.lock }),
    on_primary_click: () => Utils.exec("hyprlock"),
  });

  const power = Widget.Button({
    class_name: "power",
    child: Widget.Icon({ icon: icons.powermenu.shutdown }),
  });

  return Widget.Box({
    vertical: false,
    spacing: 4,
    class_name: "buttons-container",
    children: [uptimeInfo, lock, power],
  });
};

const DayProgress = () => {
  const progress = Variable(0, {
    poll: [1000 * 60 * 10, () => timePassedInADay()],
  });

  return Widget.Overlay({
    class_name: "day-progress",
    child: Widget.LevelBar({
      vexpand: true,
      max_value: 100,
      value: progress.bind(),
    }),
    overlays: [
      Widget.Label({
        label: progress.bind().as((v) => `Day passed: ${v}%`),
      }),
    ],
  });
};

const YearProgress = () => {
  const date = new Date();
  const totalDays = isLeapYear(date.getFullYear()) ? 366 : 365;
  const currentDay = getYearPogress(date);
  const daysPassedPercentage = Math.floor((currentDay * 100) / totalDays);

  return Widget.Overlay({
    child: Widget.LevelBar({
      vexpand: true,
      max_value: totalDays,
      value: currentDay,
    }),
    overlays: [Widget.Label(`Year Progress ${daysPassedPercentage}%`)],
  });
};

const Options = Widget.Box({
  class_name: "options",
  vertical: true,
  spacing: 10,
  hexpand: true,
  css: "border-radius: 8px; padding: 8px;",
  children: [Buttons(), DayProgress()],
});

const Profile = Widget.Box({
  spacing: 10,
  children: [Avatar, Options],
});

export default () =>
  Widget.Box({
    class_name: "profile",
    child: Profile,
  });
