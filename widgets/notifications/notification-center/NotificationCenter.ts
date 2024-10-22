import Fallback from "./Fallback";
import Header from "./Header";
import Notifications from "./Notifications";

export const notifications = await Service.import("notifications");

export const NotificationCenter = () =>
  Widget.Box({
    css: "min-width: 20rem; padding: 8px;",
    vertical: true,
    spacing: 8,
    children: [
      Header(notifications),
      Notifications(notifications),
      Fallback(notifications),
    ],
  });

export default () =>
  Widget.Window({
    name: "notification-center",
    visible: false,
    margins: [6, 6],
    anchor: ["right", "top"],
    child: NotificationCenter(),
  });
