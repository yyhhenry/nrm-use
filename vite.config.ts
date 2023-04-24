import { defineConfig } from 'vite';
import path from 'path';
export default defineConfig({
    build: {
        target: 'esnext',
        lib: {
            entry: ['./cli.ts'], // must be a relative path starting with `./`
            formats: ['es'],
            name: 'nrm',
        },
        manifest: true,
        rollupOptions: {
            input: './cli.ts',
            external: name => {
                if (path.isAbsolute(name)) {
                    return false;
                }
                if (name.startsWith('.')) {
                    return false;
                }
                return true;
            },
        },
    },
});
