import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import replace from '@rollup/plugin-replace'

/** Ensure TS handles JSX properly */
export default {
  input: 'src/widget/index.tsx',
  output: {
    file: 'public/widgets/my-widget.js',
    format: 'iife',
    name: 'MyWidget',
    sourcemap: false,
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
      preventAssignment: true,
    }),
    peerDepsExternal(),
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'], // <-- important
    }),
    commonjs(),
    typescript({
      jsx: 'react-jsx', // <-- important
      tsconfig: './tsconfig.json',
    }),
    terser(),
  ],
}
