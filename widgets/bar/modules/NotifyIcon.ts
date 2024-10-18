import { showNotificationCenter } from "widgets/notifications/notification-center/NotificationCenter";
import icons from "lib/icons";

export const notis = await Service.import("notifications");

export default () =>
  Widget.EventBox({
    class_name: "notify-icon",
    on_primary_click: () => {
      showNotificationCenter.value = !showNotificationCenter.value;
    },
    on_secondary_click: () => {
      notis.dnd = !notis.dnd;
    },

    child: Widget.Icon().hook(notis, (self) => {
      self.icon = icons.notification.default;

      if (notis.dnd === true) {
        self.icon = icons.notification.disabled;
      }
      self.toggleClassName(
        "has-notifications",
        notis.notifications.length > 0 && !notis.dnd,
      );
    }),
  });
