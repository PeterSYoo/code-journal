import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    // build argument represents the bundling process -> Finding some file, loading it up, parsing it, transpiling it, joining a bunch of files together.
    setup(build: esbuild.PluginBuild) {
      // figures out where the index.js file is stored, regex stands for index.js.
      // Handle root entry file of 'index.js'
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return { path: 'index.js', namespace: 'a' };
      });

      // regex stands for ./ and ../
      // Handle relative paths in a module
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        return {
          namespace: 'a',
          // the resolveDir comes from the fetch request
          path: new URL(args.path, 'http://unpkg.com' + args.resolveDir + '/').href,
        };
      });

      // Handle main file of a module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        // dynamically updating the url instead of hardcoding it in
        return {
          namespace: 'a',
          path: `http://unpkg.com/${args.path}`,
        };
      });

    },
  };
};