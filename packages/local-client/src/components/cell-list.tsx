import './cell-list.css';
import { Fragment, useEffect } from 'react';
import { useTypedSelector } from '../hooks/use-typed-selector';
import CellListItem from './cell-list-item';
import AddCell from './add-cell';
import { useActions } from '../hooks/use-actions';

// Couldn't read state from our redux store until I added the non-
// null assertion operator (!). This removes the undefined and null-
// types, allowing us to access the state.
const CellList: React.FC = () => {
  const cells = useTypedSelector((state) => {
    return state!.cells!.order!.map((id) => {
      return state!.cells!.data[id];
    });
  });

  const { fetchCells } = useActions();

  useEffect(() => {
    fetchCells();
  }, []);

  const renderedCells = cells!.map((cell) => (
    <Fragment key={cell!.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell!.id} />
    </Fragment>
  ));

  return (
    <div className="cell-list">
      <AddCell previousCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;
