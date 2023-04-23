# nrm-use v1.0.4

A TypeScript and modern version of popular package `nrm`, to manage Node.js Registries.

一个 TypeScript 和现代化的 `nrm` 包替代品，用于管理 Node.js 的包源。

Mainly for Users in China, since the default registry of Node.js is not stable in China.

主要是为中国用户服务的，因为 Node.js 的默认包源在中国并不稳定。

`nrm-use` is a minimum package, providing only 3 commands: `ls`, `use` and `help`, to cover most of the common use cases of `nrm` for most users.

`nrm-use` 是一个最小化的包，只提供 3 个命令：`ls`、`use` 和 `help`，以覆盖大多数用户的 `nrm` 的常见用例。

> We are not the author of `nrm`, and we are not affiliated with the author of `nrm` in any way. We are just a fan of `nrm`.
>
> 我们不是 `nrm` 的作者，也没有以任何方式与 `nrm` 的作者有任何关系。我们只是 `nrm` 的粉丝。
>
> We are shame to say that the whole code of this package is much shorter than the `README.md`. We are hoping for your pull requests to make it better.
>
> 很惭愧，这个包的整个代码比 `README.md` 都要短。我们希望你们能够提交 pull requests 来让它变得更好。

## Why `nrm-use`?

Mainly for solving some problems of `nrm` some weeks before, like ERR_REQUIRE_ESM.

主要是为了解决 `nrm` 在之前出现的一些问题，比如 ERR_REQUIRE_ESM。

Providing functions just as common users need, and keeping the package as small as possible. So you can reach the end of document in a few seconds, and then you can start using it.

仅仅提供用户需要的常见功能。所以你可以在几秒钟内看完文档，然后你就可以开始使用它了。

## Built-in Registries v1.0.4

- npm ---- <https://registry.npmjs.org/>
- yarn ---- <https://registry.yarnpkg.com/>
- tencent ---- <https://mirrors.cloud.tencent.com/npm/>
- cnpm ---- <https://r.cnpmjs.org/>
- taobao ---- <https://registry.npmmirror.com/>
- npmMirror ---- <https://skimdb.npmjs.com/registry/>

## Usage

```sh
# list all registries
nrm ls
# use specific registry, like taobao
nrm use taobao
```

Remember to use `nrm use npm`, before publishing your package to npm or searching packages on npm.

在发布你的包到 npm 或者在 npm 上搜索包之前，请记得使用 `nrm use npm`。

Other registries are not recommended to use for publishing or searching packages.

其他的包源不建议用于发布包或者搜索包。

## Getting Started

```sh
# with npm or pnpm (we prefer pnpm)
pnpm add -g nrm-use
```

## Differences with `nrm`

We create this package to allow common users to get started quickly, without having to think too much.

我们创建这个包是为了让普通用户能够快速上手，而不必考虑太多。

For all commands other than `nrm ls` and `nrm use`, if that is what you want, go use `nrm` directly.

对于除了 `nrm ls` 和 `nrm use` 之外的所有命令，如果这就是你想要的，那么直接使用 `nrm`。

However, for some circumstances, you can change your using habits to use `nrm-use` instead of `nrm` and to find it is just enough for you.

但是，在某些情况下，你可以改变你的使用习惯，使用 `nrm-use` 来替代 `nrm`，你可能会发现它对你来说刚好足够。

- `nrm-use` does not support `nrm add` and `nrm del` commands up to now, since we have provided enough built-in registries for most Chinese users. However, we may add these commands in the future.

  `nrm-use` 不支持 `nrm add` 和 `nrm del` 命令，因为我们已经为大多数中国用户提供了足够的内置包源。但是，我们可能会在未来添加这些命令。
  
- `nrm-use` only use `nrm ls` to show all registries and the current one at the same time, so we do not support `nrm current` command.

  `nrm-use` 使用 `nrm ls` 来显示所有包源和当前包源，所以我们不支持 `nrm current` 命令。

- `nrm-use` does not support `nrm test` command. For Chinese users, during most of the time, the built-in registries ( expect `npm` itself ) are stable enough. For other users or advanced users, go use `nrm` directly.

  `nrm-use` 不支持 `nrm test` 命令。对于中国用户，大多数时间内，内置的包源（除了 `npm` 本身）都足够稳定。对于其他用户或高级用户，直接使用 `nrm`。
