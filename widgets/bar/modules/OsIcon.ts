import { distroName } from "module-vars/sysinfo";

const getIcons = (distroName: string) => {
  switch (distroName) {
    case "fedora":
      return "";
    case "arch":
      return " ";
    case "nixos":
      return "";
    case "debian":
      return "";
    case "opensuse-tumbleweed":
      return "";
    case "endeavouros":
      return "";
    default:
      return "";
  }
};

export default Widget.EventBox({
  class_name: "distro-icon",
  onPrimaryClick: () => App.toggleWindow("quicksettings"),
  child: Widget.Label({
    label: getIcons(distroName().toLowerCase()),
  }),
});
