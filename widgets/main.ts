import Bar from "./bar/Bar.ts";
import Alert from "./dialog/Alert.ts";
import NotificationPopups from "./notifications/NotificationPopups.ts";
import NotificationCenter from "./notifications/notification-center/NotificationCenter";
import OSD from "./osd/OSD.ts";
import QuickSettings from "./quicksettings/QuickSettings";
import Flatpak from "./updates/Flatpak";
import Wallpapers from "./wallpapers/Wallpapers";

export default {
  windows: [
    Bar(),
    Wallpapers(),
    NotificationPopups(),
    OSD(),
    QuickSettings(),
    NotificationCenter(),
    Flatpak(),
    Alert(),
  ],
};
