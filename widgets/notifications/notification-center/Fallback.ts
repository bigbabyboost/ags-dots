import icons from "lib/icons";
import type { Notifications } from "types/service/notifications";

export default (notifications: Notifications) =>
  Widget.CenterBox({
    class_name: "notifications-fallback",
    css: "min-height: 30rem;",
    vertical: true,
    centerWidget: Widget.Box({
      vertical: true,
      spacing: 10,
      children: [
        Widget.Icon({
          hexpand: true,
          css: "font-size: 60;",
          icon: icons.notification.default,
        }),
        Widget.Label({ label: "You're all caught up" }),
      ],
    }),

    setup: (self) =>
      self.hook(notifications, () => {
        if (notifications.notifications.length > 0) {
          self.visible = false;
        } else self.visible = true;
      }),
  });
