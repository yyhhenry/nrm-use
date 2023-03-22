const rawRegistries = {
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
export function hasRegistry(name) {
    return name in rawRegistries;
}
export function getRegistry(name) {
    return rawRegistries[name];
}
export function getRegistries() {
    return Object.entries(rawRegistries);
}
