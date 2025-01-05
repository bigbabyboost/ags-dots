import icons from "lib/icons";

export const notis = await Service.import("notifications");

export default () =>
  Widget.Button({
    on_primary_click: () => App.toggleWindow("notification-center"),
    on_secondary_click: () => {
      notis.dnd = !notis.dnd;
    },
    setup: (self) =>
      self.hook(notis, () => {
        if (notis.notifications.length > 0 && !notis.dnd) {
          self.class_name = "notify-icon has-notifications";
        } else self.class_name = "notify-icon";

        self.child = Widget.Icon({
          icon: notis.dnd
            ? icons.notification.disabled
            : icons.notification.default,
        });

        self.show_all();
      }),
  });
