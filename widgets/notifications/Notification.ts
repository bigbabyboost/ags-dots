import GLib from "gi://GLib";
import icons from "lib/icons";
import { isFileExists } from "lib/utils";
import type { Notification } from "types/service/notifications";

export const notifications = await Service.import("notifications");

const currentTime = Variable(0, {
  poll: [1000 * 59, () => new Date().getTime()],
});

export const NotificationImage = (noti: Notification) => {
  return Widget.Box({
    vpack: "start",
    hexpand: false,
    class_name: "notification-image",
  }).hook(notifications, (self) => {
    const { image } = noti;

    if (image && isFileExists(image)) {
      self.css = `
        background-image: url("${image}");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        min-height: 64px;
        min-width: 64px;
        margin-right: 8px;
        border-radius: 8px;
      `;
    }
  });
};

const NotificationIcon = ({ app_icon, app_name }: Notification) => {
  let icon = "dialog-information-symbolic";

  if (Utils.lookUpIcon(app_icon)) {
    icon = app_icon;
  }

  if (app_name && Utils.lookUpIcon(app_name)) {
    icon = app_name;
  }

  return Widget.Icon({
    icon: icon,
    css: `
      margin-right: 6px; 
      font-size: 16px
    `,
  });
};

type NotificationOptions = {
  config: {
    width: number;
  };
};

export default (noti: Notification, options?: Partial<NotificationOptions>) => {
  const icon = Widget.Box({
    vpack: "start",
    class_name: "icon",
    child: NotificationImage(noti),
  });

  // Title
  const title = Widget.Label({
    class_name: "title",
    xalign: 0,
    justification: "left",
    hexpand: true,
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

  const timePassed = Widget.Label({
    hexpand: true,
    css: "margin-right: 8px; font-size: 12px;",
    class_name: "time",
    xalign: 1,
    label: currentTime.bind().as((currTime) => {
      const notiTime = GLib.DateTime.new_from_unix_local(noti.time).to_unix();
      const diff = currTime - notiTime * 1000;
      const diffInMins = Math.trunc(diff / (1000 * 60));
      return getRelativeTime(diffInMins);
    }),
  });

  const closeBtn = Widget.Button({
    class_name: "close-button",
    on_primary_click: noti.close,
    css: "all: unset;",
    child: Widget.Icon({ icon: icons.ui.close, css: "font-size: 17px;" }),
  });

  const actions = Widget.Revealer({
    child: Widget.Box({
      homogeneous: true,
      spacing: 6,
      class_name: "action-buttons",
      css: "margin-top: 8px;",
      children: noti.actions.map(({ id, label }) =>
        Widget.Button({
          css: "min-height: 28px",
          child: Widget.Label(label),
          on_primary_click: () => {
            noti.invoke(id);
            noti.dismiss();
          },
        }),
      ),
    }),
    setup: (self) => {
      const actions = noti.actions;
      if (
        actions.length > 0 &&
        actions.every(({ label }) => label.trim() !== "")
      ) {
        self.reveal_child = true;
      }
    },
  });

  const header = Widget.Box({
    children: [
      NotificationIcon(noti),
      Widget.Label({
        css: "font-size: 12px",
        label:
          noti.app_name.charAt(0).toUpperCase() +
          noti.app_name.slice(1).replace("-", " "),
      }),
      Widget.Separator({ hexpand: true }),
      timePassed,
      closeBtn,
    ],
  });

  const content = Widget.Box({
    children: [
      icon,
      Widget.Box({
        hexpand: true,
        vertical: true,
        children: [
          Widget.Box({
            children: [title, closeBtn],
          }),
          description,
        ],
      }),
    ],
  });

  // Main Window
  return Widget.EventBox({
    on_primary_click: noti.dismiss,
    child: Widget.Box({
      css: `padding: 8px; min-width: ${options?.config?.width || 20}rem;`,
      class_name: `notification ${noti.urgency}`,
      vertical: true,
      children: [
        header,
        Widget.Separator({
          class_name: "horizontal-line",
          css: "margin: 4px 0px;",
        }),
        content,
        actions,
      ],
    }),
  });
};

function getRelativeTime(mins: number) {
  // Seconds
  if (mins === 0) return "now";

  // Minutes
  if (mins < 60) {
    return `${mins} minute${mins > 1 ? "s" : ""} ago`;
  }

  // Hours
  if (mins < 1440) {
    const hours = Math.trunc(mins / 60);
    return `${hours} hours${hours > 1 ? "s" : ""} ago`;
  }

  // Days
  const days = Math.trunc(mins / 1440);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}
