import fs from 'fs'
import replace from '@rollup/plugin-replace'
import babel from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'

const packageJson = JSON.parse(fs.readFileSync('./package.json'))
const license = fs.readFileSync('./license.txt', { encoding: 'utf8' })

export default [
  {
    input: 'src/jsts.js',
    output: {
      file: 'dist/jsts.js',
      format: 'umd',
      name: 'jsts',
      banner: license,
      sourcemap: true,
    },
    plugins: [
      replace({
        npm_package_version: packageJson.version,
        preventAssignment: true,
      }),
      babel({
        exclude: 'node_modules/**',
        presets: [
          [
            '@babel/env',
            {
              targets: {
                browsers: ['>2%', 'not dead'],
              },
            },
          ],
        ],
        babelrc: false,
        babelHelpers: 'bundled',
      }),
      terser(),
    ],
  },
  // Added configuration for CommonJS output
  {
    input: 'src/jsts.js',
    output: {
      file: 'dist/jsts.cjs.js',
      format: 'cjs',
      sourcemap: true,
    },
    plugins: [
      replace({
        npm_package_version: packageJson.version,
        preventAssignment: true,
      }),
      babel({
        exclude: 'node_modules/**',
        babelrc: false,
        babelHelpers: 'bundled',
      }),
    ],
  },
]
