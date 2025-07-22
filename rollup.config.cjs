const typescript = require('@rollup/plugin-typescript')
const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const { terser } = require('rollup-plugin-terser')
const peerDepsExternal = require('rollup-plugin-peer-deps-external')
const replace = require('@rollup/plugin-replace')
const postcss = require('rollup-plugin-postcss')
const alias = require('@rollup/plugin-alias')
const path = require('path')
const dotenv = require('dotenv')

dotenv.config()
module.exports = {
  input: 'src/widget/index.tsx',
  output: {
    file: 'public/widgets/my-widget.js',
    format: 'iife',
    name: 'MyWidget',
    sourcemap: false,
  },
  plugins: [
    alias({
      entries: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    }),
    postcss({
      config: false, // ✅ disables automatic loading of postcss.config.*
      extensions: ['.css', '.scss'],
      extract: false,
      minimize: true,
      use: ['sass'],
      plugins: [require('tailwindcss')()],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
      'process.env.__NEXT_ROUTER_BASEPATH': JSON.stringify(''),
      'process.env.__NEXT_IMAGE_OPTS': JSON.stringify(''),
      'process.env.NEXT_PUBLIC_SERVER_URL': JSON.stringify(
        process.env.NEXT_PUBLIC_SERVER_URL || '',
      ),
      preventAssignment: true,
    }),
    peerDepsExternal(),
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      browser: true,
      preferBuiltins: false,
    }),
    commonjs(),
    typescript({
      jsx: 'react-jsx',
      tsconfig: './tsconfig.json',
    }),
    terser(),
  ],
}
