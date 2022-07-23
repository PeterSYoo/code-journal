import { useTypedSelector } from './use-typed-selector';

export const useCumulativeCode = (cellID: string) => {
  return useTypedSelector((state) => {
    const orderedCells = state!.cells!.order!.map(
      (id) => state!.cells!.data![id]
    );

    const showFunc = `
        import _React from 'react';
        import _ReactDOM from 'react-dom';
  
        var show = (value) => {
          // log (value) {
            const root = document.querySelector('#root');
  
            if (typeof value === 'object') {
              if (value.$$typeof && value.props) {
                _ReactDOM.render(value, root);
              } else {
                root.innerHTML = JSON.stringify(value);
              }
            } else {
              root.innerHTML = value;
            }
          // }
        } 
      `;

    // No operation
    const showFuncNoop = 'var show = () => {}';
    const cumulativeCode = [];
    for (let c of orderedCells) {
      if (c.type === 'code') {
        if (c.id === cellID) {
          cumulativeCode.push(showFunc);
        } else {
          cumulativeCode.push(showFuncNoop);
        }
        cumulativeCode.push(c.content);
      }
      if (c.id === cellID) {
        break;
      }
    }
    return cumulativeCode;
  }).join('\n');
};
