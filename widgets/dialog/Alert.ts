interface Alert {
  title?: string;
  func?: (() => void) | null;
}

export const alert = Variable({
  title: "Reboot",
  func: null,
} as Alert);

const ActionButtons = () => {
  const cancel = Widget.Button({
    className: "no",
    label: "No",
    on_primary_click: () => {
      alert.setValue({ func: null });
    },
  });

  const confirm = Widget.Button({
    className: "yes",
    label: "Yes",
    on_primary_click: () => {
      alert.value.func?.();
      alert.setValue({ func: null });
    },
  });

  return Widget.Box({
    homogeneous: true,
    spacing: 8,
    css: "min-height: 34px",
    children: [cancel, confirm],
  });
};

const Dialog = () => {
  const containerStyle = `
    border-radius: 16px; 
    min-width: 280px; 
    min-height: 80px; 
    padding: 10px;
  `;

  const header = Widget.Box({
    vexpand: true,
    vertical: true,
    children: [
      Widget.Label({ label: alert.bind().as((v) => v.title ?? "") }),
      Widget.Label("Are you sure?"),
    ],
  });

  const container = Widget.Box({
    className: "container",
    hpack: "center",
    vpack: "center",
    css: containerStyle,
    vertical: true,
    children: [header, ActionButtons()],
  });

  return Widget.Box({
    hpack: "center",
    child: container,
  });
};

export default () =>
  Widget.Window({
    name: "alert",
    visible: alert.bind().as((v) => v.func !== null),
    css: "background: transparent;",
    layer: "top",
    exclusivity: "ignore",
    anchor: ["top", "right", "left", "bottom"],
    child: Dialog(),
  });
