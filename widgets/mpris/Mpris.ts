import { playerIcons } from "lib/icons";
import { isFileExists } from "lib/utils";
import type { MprisPlayer } from "types/service/mpris";
import { floatingMediaPlayer } from "utils.ts";

const Mpris = await Service.import("mpris");
const players = Mpris.bind("players");

const FALLBACK_ICON = " 󰎈 ";
const PLAY_ICON = " 󰐊 ";
const PAUSE_ICON = " 󰏤 ";
const PREV_ICON = "󰒮";
const NEXT_ICON = "󰒭";

function lengthStr(length: number) {
  const min = Math.floor(length / 60);
  const sec = Math.floor(length % 60);
  const sec0 = sec < 10 ? "0" : "";
  return `${min}:${sec0}${sec}`;
}

export const Player = (player: MprisPlayer) => {
  const albumArt = Widget.Box().hook(player, (self) => {
    const { track_cover_url, cover_path } = player;

    const url = track_cover_url || cover_path;
    const image = isFileExists(track_cover_url)
      ? url
      : "https://ik.imagekit.io/rayshold/gallery/mpris-fallback.webp";

    self.css = `
        background-image: url("${image}");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        min-height: 110px;
        min-width: 110px;
        margin-right: 14px;
        border: 4px solid rgba(255, 255, 255, .8);
      `;
  });

  const title = Widget.Label({
    hpack: "start",
    hexpand: true,
    max_width_chars: 24,
    truncate: "end",
    wrap: true,
    label: player.bind("track_title"),
  });

  const artists = Widget.Label({
    hpack: "start",
    css: "font-weight: 100;",
    max_width_chars: 24,
    truncate: "end",
    wrap: true,
    label: player.bind("track_artists").as((a) => a.join(", ")),
  });

  const playerProgress = Widget.Slider({
    class_name: "player-progress",
    draw_value: false,
    on_change: ({ value }) => {
      player.position = value * player.length;
    },
    css: `
        padding: 0;
    `,
    setup: (self) => {
      const update = () => {
        const { position, length } = player;
        self.visible = length > 0;
        self.value = length > 0 ? position / length : 0;
      };
      self.hook(player, update);
      self.hook(player, update, "position");
      self.poll(1000, update);
    },
  });

  const position = Widget.Label({
    class_name: "position",
    hpack: "start",
    setup: (self) => {
      const update = (_: unknown, time?: number) => {
        self.label = lengthStr(time || player.position);
        self.visible = player.length > 0;
      };
      self.hook(player, update, "position");
      self.poll(1000, update);
    },
  });

  const length = Widget.Label({
    class_name: "length",
    hpack: "end",
    visible: player.bind("length").as((l) => l > 0),
    label: player.bind("length").as(lengthStr),
  });

  const previous = Widget.Button({
    class_name: "player-control-icons",
    on_primary_click: () => player?.previous(),
    child: Widget.Label({
      label: PREV_ICON,
    }),
  });

  const playPause = Widget.Button({
    class_name: "player-control-icons",
    on_primary_click: () => player?.playPause(),
    child: Widget.Label({
      label: player.bind("play_back_status").as((pbs) => {
        switch (pbs) {
          case "Playing":
            return PAUSE_ICON;
          case "Paused":
            return PLAY_ICON;
          default:
            return FALLBACK_ICON;
        }
      }),
    }),
  });

  const next = Widget.Button({
    class_name: "player-control-icons",
    on_primary_click: () => player?.next(),
    child: Widget.Label({
      label: NEXT_ICON,
    }),
  });

  const playerIcon = Widget.Label({
    css: "margin-right: 5px;",
    label: player.bind("name").as((n) => playerIcons(n)),
  });

  return Widget.Box({
    hexpand: true,
    name: "mpris-player",
    css: `
        min-width: 20rem;
        padding: 6px;
      `,
    children: [
      albumArt,
      Widget.Box(
        {
          vertical: true,
          hexpand: true,
        },
        Widget.Box(
          { vertical: true },
          Widget.Box([title, playerIcon]),
          artists,
        ),
        Widget.Box({ vexpand: true }),
        playerProgress,
        Widget.CenterBox({
          css: "padding-top: 4px;",
          startWidget: position,
          centerWidget: Widget.Box([previous, playPause, next]),
          endWidget: length,
        }),
      ),
    ],
  });
};

// Related to scroll/sliding between players
const playerIndex = Variable(0);
const direction = Variable(0);

const playerChange = (nav: "prev" | "next") => {
  const max = players.emitter.players.length - 1;
  const current = playerIndex.value;
  if (nav === "prev" && current > 0) playerIndex.setValue(current - 1);
  else if (nav === "next" && current < max) playerIndex.setValue(current + 1);
};

export default () =>
  Widget.Window({
    name: "mpris-palyer-window",
    margins: [4],
    anchor: ["top"],
    visible: floatingMediaPlayer.bind(),
    child: Widget.EventBox({
      on_scroll_up: () => playerChange("prev"),
      on_scroll_down: () => playerChange("next"),
      on_primary_click: () => playerChange("prev"),
      on_secondary_click: () => playerChange("next"),
      child: Widget.Stack({
        css: "padding: 6px; background-color: transparent;",
        children: players.as((p) =>
          Object.assign(
            {},
            ...p.map((player, index) => ({
              [`child-${index}`]: Player(player),
            })),
          ),
        ),
        setup: (self) => {
          playerIndex.connect("changed", ({ value }) => {
            if (value >= direction.value) self.transition = "slide_left";
            else if (value < direction.value) self.transition = "slide_right";
            self.shown = `child-${value.toString()}`;
            direction.setValue(value);
          });
        },
      }),
    }),
  });
