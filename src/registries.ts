import path from 'path';
import { Registry, isRegistry } from './config.js';
import { rustError, rustErrorAsync } from 'luoluo-rust-error';
import fs from 'fs/promises';
import { isRecordOf } from './type-guards.js';

export type Registries = Record<string, Registry>;
export const isRegistries = (value: unknown): value is Registries =>
  isRecordOf(value, isRegistry);
const builtinRegistries: Registries = {
  npm: {
    home: 'https://www.npmjs.org',
    registry: 'https://registry.npmjs.org/',
  },
  yarn: {
    home: 'https://yarnpkg.com',
    registry: 'https://registry.yarnpkg.com/',
  },
  tencent: {
    home: 'https://mirrors.cloud.tencent.com/npm/',
    registry: 'https://mirrors.cloud.tencent.com/npm/',
  },
  cnpm: {
    home: 'https://cnpmjs.org',
    registry: 'https://r.cnpmjs.org/',
  },
  taobao: {
    home: 'https://npmmirror.com',
    registry: 'https://registry.npmmirror.com/',
  },
  npmMirror: {
    home: 'https://skimdb.npmjs.com/',
    registry: 'https://skimdb.npmjs.com/registry/',
  },
};

export function getRegistryConfigPath() {
  return path.join(
    process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'] ?? '',
    '.nrm.json',
  );
}
export async function readRegistryConfig(): Promise<Registries> {
  const configPath = getRegistryConfigPath();
  const content = await rustErrorAsync(() =>
    fs.readFile(configPath, 'utf-8'),
  )();
  if (!content.ok) {
    return {};
  }
  const registries = rustError(JSON.parse)(content.v);
  if (!registries.ok) {
    return {};
  }
  return isRegistries(registries.v) ? registries.v : {};
}
export async function getRegistries(): Promise<Registries> {
  const registries = await readRegistryConfig();
  return Object.assign({}, builtinRegistries, registries);
}
export async function getRegistry(name: string) {
  const registries = await getRegistries();
  return registries[name] as Registry | undefined;
}
