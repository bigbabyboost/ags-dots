type IconLabelProps = {
  iconType?: "gtk" | "text";
  icon: string;
  label: string;
  className?: string;
};

export const IconLabel = ({
  iconType = "text",
  icon,
  label,
  className,
}: IconLabelProps) => {
  const Icon = () =>
    iconType === "gtk"
      ? Widget.Icon({ class_name: "icon", icon: icon })
      : Widget.Label({ class_name: "icon", label: icon });

  return Widget.Box({
    class_name: className ?? "",
    children: [
      Icon(),
      Widget.Label({
        truncate: "end",
        class_name: "value",
        label: label,
      }),
    ],
  });
};
