import { Variable } from "resource:///com/github/Aylur/ags/variable.js";

type OptProps = {
  persistent?: boolean;
};

export class Opt<T = unknown> extends Variable<T> {
  static {
    Service.register(Opt);
  }

  constructor(initial: T, { persistent = false }: OptProps = {}) {
    super(initial);
    this.initial = initial;
    this.persistent = persistent;
  }

  initial: T;
  id = "";
  persistent: boolean;
  toString(): string {
    return `${this.value}`;
  }
  toJSON(): string {
    return `opt:${this.value}`;
  }

  getValue = (): T => {
    return super.getValue();
  };
  init(cacheFile: string): void {
    const cacheV = JSON.parse(Utils.readFile(cacheFile) || "{}")[this.id];
    if (cacheV !== undefined) this.value = cacheV;

    this.connect("changed", () => {
      const cache = JSON.parse(Utils.readFile(cacheFile) || "{}");
      cache[this.id] = this.value;
      Utils.writeFileSync(JSON.stringify(cache, null, 2), cacheFile);
    });
  }

  reset(): string | undefined {
    if (this.persistent) return;

    if (JSON.stringify(this.value) !== JSON.stringify(this.initial)) {
      this.value = this.initial;
      return this.id;
    }
  }
}

export const opt = <T>(initial: T, opts?: OptProps): Opt<T> =>
  new Opt(initial, opts);
