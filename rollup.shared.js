import path from 'path'
import { babel } from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'

export async function composeConfig (projectPathname, externals = []) {
  const pkg = (await import(path.resolve(projectPathname, 'package.json')))
    .default
  const baseConfig = {
    input: 'src/index.ts',
    external: [...externals],
    plugins: [
      resolve(),
      typescript(),
      commonjs({
        extensions: ['.js', '.ts']
      }),
      babel({
        babelHelpers: 'bundled'
      }),
      terser()
    ]
  }
  return [
    {
      ...baseConfig,
      output: [
        {
          file: pkg.main,
          format: 'cjs',
          inlineDynamicImports: true,
          exports: 'auto'
        }
      ]
    },
    {
      ...baseConfig,
      output: [
        {
          file: pkg.module,
          format: 'es',
          inlineDynamicImports: true,
          exports: 'auto'
        }
      ]
    }
  ]
}
