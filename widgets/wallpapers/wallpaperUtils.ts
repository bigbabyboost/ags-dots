import GLib from "gi://GLib";
import { bash } from "lib/utils";
import { WINDOW_NAME } from "./Wallpapers";
import { options } from "options";

const { path: WALL_PATH } = options.wallpaper_picker;

export const pictures = Variable(
  Utils.exec(
    `find -L ${WALL_PATH}  -iname "*.png" -or -iname "*.jpg" -or -iname "*.webp"`,
  )
    .split("\n")
    .filter((i) => i !== ""),
);

// Functions/Methods
export const getWallList = (): string[] => {
  const [success, logfile] = GLib.file_get_contents(`${WALL_PATH}/log.txt`);
  if (!success) {
    console.error("Failed to read file");
  }

  const log = new TextDecoder("utf-8").decode(logfile);
  return log.split("\n");
};

export const setWall = (path: string) => {
  const fileName = path.split("/").splice(-1)[0];
  const wallpaper = getWallList()
    .find((n) => n.startsWith(fileName))
    ?.split(":")[1];

  bash(
    `swww img ${wallpaper} \
    --transition-fps 60 \
    --transition-duration 2 \
    --transition-type top \
    --transition-bezier 0.25,1,0.5,1`,
  ).then(() => App.toggleWindow(WINDOW_NAME));
};

export const removeWall = (path: string) => {
  const fileName = path.split("/").splice(-1)[0];

  const filteredList = getWallList().filter(
    (path) => path && !path.startsWith(fileName),
  );

  const text = new TextEncoder().encode(`${filteredList.join("\n")}\n`);
  const success = GLib.file_set_contents(`${WALL_PATH}/log.txt`, text);

  if (!success) {
    console.error("Failed to write to file");
    return;
  }

  bash(`rm ${WALL_PATH}/${fileName}`)
    .then(() => {
      pictures.value = pictures.value.filter((p) => p !== path);
    })
    .then(() => bash("notify-send 'Successfully removed selected wall'"));
};
