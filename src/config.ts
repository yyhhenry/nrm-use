import path from 'node:path';
import fs from 'fs/promises';
import ini from 'ini';
import { rustErrorAsync } from 'luoluo-rust-error';
import { isPartialUnknown, nonNullable } from './type-guards.js';
import { getRegistry } from './lib.js';
export interface Registry {
  home: string;
  registry: string;
}
export const isRegistry = (value: unknown): value is Registry =>
  isPartialUnknown<Registry>(value) &&
  typeof value.home === 'string' &&
  typeof value.registry === 'string';
export function getConfigPath() {
  return path.join(
    process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'] ?? '',
    '.npmrc',
  );
}
export async function readConfig(): Promise<Record<string, unknown>> {
  const configPath = getConfigPath();
  const content = await rustErrorAsync(() =>
    fs.readFile(configPath, 'utf-8'),
  )();
  if (!content.ok) {
    return {};
  }
  const npmrc = ini.parse(content.v);
  return npmrc;
}
export async function setRegistry(registry: Registry) {
  const configPath = getConfigPath();
  const npmrc = await readConfig();
  await fs.mkdir(path.dirname(configPath), { recursive: true });
  await fs.writeFile(configPath, ini.stringify(Object.assign(npmrc, registry)));
}
export async function getCurrentRegistry() {
  const config = await readConfig();
  const registry = config.registry;
  if (typeof registry === 'string') {
    return registry;
  }
  return nonNullable(await getRegistry('npm'), 'npm registry').registry;
}
