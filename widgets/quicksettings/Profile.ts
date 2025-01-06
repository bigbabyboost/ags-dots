import icons from "lib/icons";
import { bash } from "lib/utils";
import { timePassedInADay } from "module-vars/misc";
import { uptime } from "module-vars/sysinfo";
import { options } from "options";
import { date } from "widgets/bar/modules/Clock";
import { alert } from "widgets/dialog/Alert";

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

  const logOut = Widget.Button({
    class_name: "logOut",
    child: Widget.Icon({ icon: icons.powermenu.logout }),
    on_primary_click: () =>
      alert.setValue({
        title: "Logout",
        func: () => bash(`notify-send ${Utils.exec("whoami")}`),
      }),
  });

  return Widget.Box({
    vertical: false,
    spacing: 4,
    class_name: "buttons-container",
    children: [uptimeInfo, lock, logOut],
  });
};

const DayProgress = () => {
  return Widget.Box({
    class_name: "day-progress",
    vertical: true,
    spacing: 4,
  }).hook(date, (self) => {
    const timePassed = timePassedInADay(date.value);

    self.children = [
      Widget.Box({
        class_name: "day-progress label-container",
        css: "border-radius: 6px; padding: 1px 0;",
        child: Widget.Label({
          hexpand: true,
          label: `${date.value.format("%A")} : ${timePassed}%`,
        }),
      }),

      Widget.LevelBar({
        hexpand: true,
        max_value: 100,
        value: timePassed,
      }),
    ];

    self.show_all();
  });
};

const Options = Widget.Box({
  class_name: "options",
  vertical: true,
  spacing: 6,
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
