import Bar from "./bar/Bar.ts";
import Mpris from "./mpris/Mpris.ts";
import NotificationPopups from "./notifications/NotificationPopups.ts";
import OSD from "./osd/OSD.ts";
import NotificationCenter from "./notifications/notification-center/NotificationCenter";
import QuickSettings from "./quicksettings/QuickSettings";
import Flatpak from "./updates/Flatpak";

export default {
  windows: [
    Bar(),
    NotificationPopups(),
    OSD(),
    Mpris(),
    QuickSettings(),
    NotificationCenter(),
    Flatpak(),
  ],
};
