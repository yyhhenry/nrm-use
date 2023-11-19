# nrm-use

A TypeScript and modern version of popular package `nrm`, to manage Node.js Registries.

- `nrm ls` to list all registries and the current one at the same time.

- `nrm use <name>` to use specific registry.

You can add some custom registries in `~/.nrm.json` file.

## Why `nrm-use`?

Mainly for solving some problems of `nrm`, like ERR_REQUIRE_ESM.

## Getting Started

```sh
pnpm add -g nrm-use
# or
npm install -g nrm-use
```

Remember to `nrm use npm`, before publishing your package to npm or searching packages on npm.
