import chalk from 'chalk';
import { program } from 'commander';
import { getCurrentRegistry, setRegistry } from './config.js';
import { getRegistries, getRegistry } from './lib.js';
program.name('nrm');
program
  .command('ls')
  .action(async () => {
    const current = await getCurrentRegistry();
    console.log('Built-in registries:');
    const registries = await getRegistries();
    for (const [name, { registry }] of Object.entries(registries)) {
      console.log(
        `${chalk.green(
          ((current === registry ? '* ' : '') + name).padStart(12),
        )} ---- ${chalk.blue(registry)}`,
      );
    }
  })
  .description('View registries');

program
  .command('use <name>')
  .action(async (name?: unknown) => {
    if (typeof name !== 'string') {
      throw new Error('<name> must be string');
    }
    const registry = await getRegistry(name);
    if (registry) {
      await setRegistry(registry);
      console.log(`The registry has been changed to '${name}'.`);
      console.log(`${chalk.green('home')} ---- ${chalk.blue(registry.home)}`);
      console.log(
        `${chalk.green('registry')} ---- ${chalk.blue(registry.registry)}`,
      );
    } else {
      console.log(chalk.red(`Registry named '${name}' not found`));
      console.log(chalk.red(`Try 'nrm ls' for more info.`));
    }
  })
  .description('Use specific registry');

program.parse(process.argv);

if (process.argv.length === 2) {
  program.outputHelp();
}
