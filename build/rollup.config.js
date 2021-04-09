
import commonjs from "@rollup/plugin-commonjs";
import vuePlugin from 'rollup-plugin-vue';
import buble from '@rollup/plugin-buble';

export default {
  input: 'src/wrapper.js',
  output: {
    name: 'AmapRoute',
    exports: 'named',
  },
  plugins:[
    commonjs(),
    vuePlugin({
      css:true,
      compileTemplate:true,
    }),
    buble(),
  ],
};
