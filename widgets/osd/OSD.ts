const Audio = await Service.import("audio");

let startupVisibility = false;

setTimeout(() => {
  startupVisibility = true;
}, 2000);

const Slider = Widget.Box({
  class_name: "osd-bar",
  vertical: true,
  children: [
    Widget.Icon().hook(Audio.speaker, (self) => {
      self.class_name = "osd-icon";
      const vol = Audio.speaker.volume * 100;
      const icon = [
        [101, "overamplified"],
        [67, "high"],
        [34, "medium"],
        [1, "low"],
        [0, "muted"],
      ].find(([threshold]) => threshold <= vol.toString())?.[1];

      self.icon = `audio-volume-${icon}-symbolic`;
    }),
    Widget.LevelBar({
      vexpand: true,
      inverted: true,
      vertical: true,
      hpack: "center",
      setup: (self) =>
        self.hook(Audio.speaker, (self) => {
          const vol = Audio.speaker.volume * 100;
          self.value = Math.floor(vol) / 100;
        }),
    }),
  ],
});

export default () =>
  Widget.Window({
    name: "osd",
    layer: "overlay",
    clickThrough: true,
    anchor: ["right"],
    child: Widget.Box({
      class_name: "osd-bar-container",
      child: Widget.Revealer({
        revealChild: false,
        transitionDuration: 1000,
        child: Slider,
        setup: (self) =>
          self.hook(
            Audio.speaker,
            () => {
              let count = -1;
              if (!startupVisibility) {
                return;
              }
              if (count < 0) count = 0;
              self.reveal_child = true;
              count++;
              Utils.timeout(2000, () => {
                count--;
                if (count === 0) self.reveal_child = false;
              });
            },
            "notify::volume",
          ),
      }),
    }),
  });
