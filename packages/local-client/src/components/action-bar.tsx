import './action-bar.css'
import { ArrowDown } from 'react-feather';
import { ArrowUp } from 'react-feather';
import { X } from 'react-feather';
import { useActions } from '../hooks/use-actions';

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();
  
  return (
    <div className="action-bar">
      <button className="action-bar--btn" onClick={() => moveCell(id, 'up')}>
        <ArrowUp size={15} />
      </button>
      <button className="action-bar--btn"  onClick={() => moveCell(id, 'down')}>
        <ArrowDown size={15} />
      </button>
      <button className="action-bar--btn"  onClick={() => deleteCell(id)}>
        <X size={15} />
      </button>
    </div>
  );
};

export default ActionBar;