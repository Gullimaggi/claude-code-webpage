import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

// Fallback for machines where Windows Application Control blocks Tailwind's native
// scanner (@tailwindcss/oxide *.node): Tailwind then falls back to a WASI build that
// finds no files, so no utility classes are generated. We extract candidate class
// tokens ourselves and hand them to Tailwind via `@source inline(...)`.
function tailwindCandidates(): Plugin {
  const files = (dir: string): string[] =>
    readdirSync(dir).flatMap((n) => {
      const p = join(dir, n);
      return statSync(p).isDirectory() ? files(p) : /\.(tsx?|html)$/.test(n) ? [p] : [];
    });
  return {
    name: 'tailwind-candidates',
    enforce: 'pre',
    transform(code, id) {
      if (!id.split('?')[0].endsWith('globals.css')) return;
      const list = [join(process.cwd(), 'index.html'), ...files(join(process.cwd(), 'src'))];
      const tokens = new Set<string>();
      for (const f of list) {
        this.addWatchFile(f);
        for (const t of readFileSync(f, 'utf8').match(/[^\s"'`<>{}()=,;]+/g) ?? []) {
          if (/^[\w!@\[\]:./%#&*-]+$/.test(t) && !t.includes('"')) tokens.add(t);
        }
      }
      return `${code}\n@source inline("${[...tokens].join(' ')}");\n`;
    },
  };
}

export default defineConfig({
  plugins: [tailwindCandidates(), react(), tailwindcss()],
  build: { target: 'es2022' },
});
