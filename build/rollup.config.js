
import commonjs from "@rollup/plugin-commonjs";
import vue from 'rollup-plugin-vue';
import buble from '@rollup/plugin-buble';

export default {
  input: 'src/wrapper.js',
  output: {
    name: 'AmapRoute',
    exports: 'named',
  },
  plugins:[
    vue({
      css:true,
      compileTemplate:true,
    }),
    commonjs(),
    buble(),
  ],
};
