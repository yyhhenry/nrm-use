import chalk from 'chalk';
import ini from 'ini';
import fs from 'fs';
import path from 'path';
import { program } from 'commander';
import {
    Registry,
    getRegistries,
    getRegistry,
    hasRegistry,
} from './registries.js';

const npmrcPath = path.join(
    process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'] ?? '',
    '.npmrc'
);
async function readNPMRC() {
    if (!fs.existsSync(npmrcPath)) {
        return {};
    }
    try {
        const npmrc = ini.parse(fs.readFileSync(npmrcPath, 'utf-8'));
        return npmrc;
    } catch (e) {
        return {};
    }
}
async function putRegistry(registry: Registry) {
    const npmrc = await readNPMRC();
    if (!fs.existsSync(npmrcPath)) {
        fs.mkdirSync(path.dirname(npmrcPath), { recursive: true });
    }
    fs.writeFileSync(npmrcPath, ini.stringify(Object.assign(npmrc, registry)));
}
async function getCurrentRegistry() {
    const npmrc: unknown = (await readNPMRC()).registry;
    const registry =
        typeof npmrc == 'string' ? npmrc : getRegistry('npm').registry;
    return registry;
}
program.name('nrm-use');
program
    .command('ls')
    .action(async () => {
        const current = await getCurrentRegistry();
        console.log('Registry List:');
        for (const [name, { registry }] of getRegistries()) {
            console.log(
                `${chalk.green(
                    ((current == registry ? '* ' : '') + name).padStart(12)
                )} ---- ${chalk.blue(registry)}`
            );
        }
    })
    .description('View registries');

program
    .command('use <name>')
    .action(async (name: unknown) => {
        if (typeof name === 'string') {
            if (hasRegistry(name)) {
                const registry = getRegistry(name);
                await putRegistry(registry);
                console.log(`The registry has been changed to '${name}'.`);
                console.log(
                    `${chalk.green('home')} ---- ${chalk.blue(registry.home)}`
                );
                console.log(
                    `${chalk.green('registry')} ---- ${chalk.blue(
                        registry.registry
                    )}`
                );
            } else {
                console.log(chalk.red('Registry not found'));
            }
        }
    })
    .description('Use specific registry');

program.parse(process.argv);

if (process.argv.length === 2) {
    program.outputHelp();
}
