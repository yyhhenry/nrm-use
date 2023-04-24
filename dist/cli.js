import e from "chalk";
import m from "ini";
import s from "fs";
import g from "path";
import { program as o } from "commander";
const i = {
  npm: {
    home: "https://www.npmjs.org",
    registry: "https://registry.npmjs.org/"
  },
  yarn: {
    home: "https://yarnpkg.com",
    registry: "https://registry.yarnpkg.com/"
  },
  tencent: {
    home: "https://mirrors.cloud.tencent.com/npm/",
    registry: "https://mirrors.cloud.tencent.com/npm/"
  },
  cnpm: {
    home: "https://cnpmjs.org",
    registry: "https://r.cnpmjs.org/"
  },
  taobao: {
    home: "https://npmmirror.com",
    registry: "https://registry.npmmirror.com/"
  },
  npmMirror: {
    home: "https://skimdb.npmjs.com/",
    registry: "https://skimdb.npmjs.com/registry/"
  }
};
function y(r) {
  return r in i;
}
function p(r) {
  return i[r];
}
function h() {
  return Object.entries(i);
}
const n = g.join(
  process.env[process.platform === "win32" ? "USERPROFILE" : "HOME"] ?? "",
  ".npmrc"
);
async function a() {
  if (!s.existsSync(n))
    return {};
  try {
    return m.parse(s.readFileSync(n, "utf-8"));
  } catch {
    return {};
  }
}
async function l(r) {
  const t = await a();
  s.existsSync(n) || s.mkdirSync(g.dirname(n), { recursive: !0 }), s.writeFileSync(n, m.stringify(Object.assign(t, r)));
}
async function u() {
  const r = (await a()).registry;
  return typeof r == "string" ? r : p("npm").registry;
}
o.name("nrm");
o.command("ls").action(async () => {
  const r = await u();
  console.log("Built-in registries:");
  for (const [t, { registry: c }] of h())
    console.log(
      `${e.green(
        ((r == c ? "* " : "") + t).padStart(12)
      )} ---- ${e.blue(c)}`
    );
}).description("View registries");
o.command("use <name>").action(async (r) => {
  if (typeof r == "string")
    if (y(r)) {
      const t = p(r);
      await l(t), console.log(`The registry has been changed to '${r}'.`), console.log(
        `${e.green("home")} ---- ${e.blue(t.home)}`
      ), console.log(
        `${e.green("registry")} ---- ${e.blue(
          t.registry
        )}`
      );
    } else
      console.log(e.red(`Registry named '${r}' not found`)), console.log(e.red("Try 'nrm ls' for more info."));
  else
    throw new Error("<name> must be string");
}).description("Use specific registry");
o.parse(process.argv);
process.argv.length === 2 && o.outputHelp();
