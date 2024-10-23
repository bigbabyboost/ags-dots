type FallbackProps = {
  iconType?: "label" | "icon";
  icon: string;
  iconSize?: number;
  label?: string;
};

export const Fallback = ({
  iconType = "icon",
  iconSize = 42,
  icon,
  label,
}: FallbackProps) => {
  const size = `font-size: ${iconSize}`;

  const _icon =
    iconType === "icon"
      ? Widget.Icon({ icon: icon, css: size })
      : Widget.Label({ label: icon, css: size });

  const _label = Widget.Label({ label: label });

  return Widget.CenterBox({
    name: "fallback",
    vertical: true,
    hexpand: true,
    vexpand: true,
    centerWidget: Widget.Box({
      vertical: true,
      spacing: 10,
      children: [_icon, _label],
    }),
  });
};
