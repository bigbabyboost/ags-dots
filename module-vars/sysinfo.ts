import GLib from "gi://GLib";

export const distroName = (): string => {
  const [success, releaseInfo] = GLib.file_get_contents("/etc/lsb-release");

  if (!success) {
    console.error("Failed to read /proc/meminfo");
    return "";
  }

  const proc = new TextDecoder("utf-8").decode(releaseInfo);
  const regex = /DISTRIB_DESCRIPTION="(.*?)"/;
  const match = proc.match(regex);

  if (!match && !match?.[1])
    throw new Error("Failed to obtain distro name /proce/lsb-release");

  return match[1].split(" ")[0];
};

export const kernelRelease = Utils.exec("uname --kernel-release");
export const hostName = Utils.exec("hostname");
export const uptime = Variable("", {
  poll: [60 * 1000, `bash -c "uptime | awk '{print $3}' | tr ',' ' '"`],
});
