import { IconLabel } from "custom-widgets/icon-label";
import {
  distroName,
  hostName,
  kernelRelease,
  uptime,
} from "module-vars/sysinfo";
import { Capatilize } from "utils";

const userName = Utils.exec("whoami");

const css = `
    background-image: url("https://ik.imagekit.io/rayshold/gallery/lofi-anime-boy_863013-93642.avif");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    min-height: 90px;
    min-width: 90px;
    margin-right: 14px;
    border-radius: 4px;
  `;

const fetch = [
  { icon: " ", value: `User:   ${Capatilize(userName)}`, cn: "user" },
  { icon: " ", value: `Host:   ${hostName}`, cn: "host" },
  { icon: "󰻀 ", value: `Distro: ${distroName()}`, cn: "distro" },
  { icon: "󰌢 ", value: `Kernel: ${kernelRelease}`, cn: "kernel" },
];

export default () =>
  Widget.Box({
    class_name: "sysfetch",
    children: [
      Widget.Box({
        css: css,
      }),
      Widget.Box({
        vpack: "start",
        hpack: "start",
        spacing: 2,
        vertical: true,
        setup: (self) => {
          fetch.map((item) =>
            self.add(
              IconLabel({
                icon: item.icon,
                label: item.value,
                className: item.cn,
              }),
            ),
          );
          self.add(
            Widget.Box({
              class_name: "uptime",
              children: [
                Widget.Label({
                  class_name: "icon",
                  label: " ",
                }),
                Widget.Label().hook(uptime, (self) => {
                  self.class_name = "value";
                  self.label = `Uptime: ${uptime.bind().emitter.value} Hours`;
                }),
              ],
            }),
          );
        },
      }),
    ],
  });
