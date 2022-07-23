# Code Journal

A great little app to keep a journal of any notes on code. Users can add or delete cells that contains either a markdown editor or code editor. They can move the cells up or down as they wish. The code editor is running the Monaco Editor which is the same editor that powers vscode.

![](https://i.imgur.com/yoILrlk.png)
![](https://i.imgur.com/rqzwK1r.png)
![](https://i.imgur.com/VtyiLzh.png)

## Technologies Used

- React 18
- TypeScript
- ESBuild
- Axios
- localForage
- Monaco Editor
- React MD Editor
- Redux
- Immer

## Getting Started

The app itself is published on npm. You can type

```
npx codejournal serve
```

in your terminal and it should ask you to download then start the app on localhost:4005. It'll save the contents of the code journal in a js file in the same directory you did the command in.

Type show() inside the code editor to display the values inside the parenthesis on the preview side panel. Able to display variables, arrays, objects, and JSX elements.

## Unsolved Problems

I lost all 60+ git commit histories after accidently doing a git --force push. You can see all the git commit histories @ https://api.github.com/repos/petersyoo/code-journal/events.

Need to find out a way to revert back the the git commit histories in a simply easy way.
