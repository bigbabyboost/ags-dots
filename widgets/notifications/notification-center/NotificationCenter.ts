import Fallback from "./Fallback";
import Header from "./Header";
import Notifications from "./Notifications";

export const showNotificationCenter = Variable(true);
export const notifications = await Service.import("notifications");

export const NotificationCenter = () =>
  Widget.Box({
    name: "notification-center",
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
    visible: showNotificationCenter.bind(),
    margins: [6, 6],
    anchor: ["right", "top"],
    child: NotificationCenter(),
  });
