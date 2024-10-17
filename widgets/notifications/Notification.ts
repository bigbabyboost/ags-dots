import GLib from "gi://GLib";
import type { Notification } from "types/service/notifications";

const time = (time: number, format = "%H:%M") =>
  GLib.DateTime.new_from_unix_local(time).format(format);

export const NotificationIcon = ({ image }) => {
  if (image) {
    return Widget.Box({
      vpack: "start",
      hexpand: false,
      class_name: "icon img",
      css: `
          background-image: url("${image}");
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          min-height: 80px;
          min-width: 80px;
      `,
    });
  }
  return Widget.Box();
};

export default (noti: Notification) => {
  const icon = Widget.Box({
    vpack: "start",
    class_name: "icon",
    child: NotificationIcon(noti),
  });

  // Title
  const title = Widget.Label({
    class_name: "title",
    css: "margin-right: 20px;",
    xalign: 0,
    justification: "left",
    hexpand: true,
    max_width_chars: 24,
    truncate: "end",
    wrap: true,
    label: noti.summary.trim(),
    use_markup: true,
  });

  // Description
  const description = Widget.Label({
    class_name: "description",
    hexpand: true,
    use_markup: true,
    xalign: 0,
    justification: "left",
    label: noti.body.trim(),
    max_width_chars: 28,
    wrap: true,
  });

  const clock = Widget.Label({
    class_name: "time",
    vpack: "start",
    label: time(noti.time),
  });

  const appname = Widget.Label({
    class_name: "app-name",
    xalign: 1,
    justification: "left",
    label: noti.app_name,
  });

  // Main Window
  return Widget.EventBox({
    on_primary_click: noti.close,
    child: Widget.Box({
      css: "min-width: 22rem;",
      class_name: `notification ${noti.urgency}`,
      children: [
        icon,
        Widget.Box({
          hexpand: true,
          vertical: true,
          children: [
            Widget.Box({
              children: [title, clock],
            }),
            description,
            appname,
          ],
        }),
      ],
    }),
  });
};
