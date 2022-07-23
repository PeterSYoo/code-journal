import './add-cell.css';
import { useActions } from '../hooks/use-actions';

interface AddCellProps {
  previousCellId: string | null;
}

const AddCell: React.FC<AddCellProps> = ({ previousCellId }) => {
  const { insertCellAfter } = useActions();
  
  return (
    <div className="add-cell">
      <div className="add-buttons">
        <button className="add-cell--btn" onClick={() => insertCellAfter(previousCellId, 'code')}>code</button>
        <button className="add-cell--btn"  onClick={() => insertCellAfter(previousCellId, 'text')}>text</button>
      </div>
      <div className="divider">
      </div>
    </div>
  );
};

export default AddCell;