import type { UserConfig, ConfigEnv } from 'vite'
import path from 'path'
import html from 'vite-plugin-html'

export function pathResolve(dir: string) {
  return path.resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  console.log('vite:', command, mode)

  return {
    resolve: {
      alias: {
        '@': pathResolve('src'),
      },
    },
    server: {
      open: true,
      host: true,
      port: 3002,
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    plugins: [
      html(),
    ],
  }
}
