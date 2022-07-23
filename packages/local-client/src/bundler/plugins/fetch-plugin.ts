import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

// localforage creates a new object that we can use to interact with some instance of indexedDB in the browser
// we can use this to set and get an item from the database.
const fileCache = localForage.createInstance({
  name: 'filecache',
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      // don't let it load up from the file system, instead load it from contents:.
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          // returns bundles
          loader: 'jsx',
          // We're getting the input state from our App.tsx and plugging it in here.
          contents: inputCode,
        };
      });
      
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        // Check to see if we have already fetched this file and if it's in the cache.
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);

        // if it is, return it immediately
        if (cachedResult) {
          return cachedResult;
        }
      });

      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        // fetch request a file
        const { data, request } = await axios.get(args.path);

        // escaped CSS string from CSS files that can be safely inserted into our .innerText, instead of giving us an error due to the string being closed inside the CSS file.
        const escaped = data
          // removes all the new lines in the CSS file, turning it into 1 single line.
          .replace(/\n/g, '')
          // finds all the double quotes in the CSS file and escapes them.
          .replace(/"/g, '\\"')
          // finds all the single quotes in the CSS file and escapes them.
          .replace(/'/g, "\\'");
          // this is all done so it doesn't break the single string in style.innerText
        const contents = 
          `
          const style = document.createElement('style');
          style.innerText = '${escaped}';
          document.head.appendChild(style);
          `;

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname,
        };
        // store response in cache
        await fileCache.setItem(args.path, result);

        return result;
      });
      
      // attempt to load up the index.js file
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };
        await fileCache.setItem(args.path, result);

        return result;
      });

    }
  }
}