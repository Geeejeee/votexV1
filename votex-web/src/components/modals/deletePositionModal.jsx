import "../../styles/candidates.css";
import axios from "axios";

const DeletePositionModal = ({
  showDeleteModal,
  setShowDeleteModal,
  positionToDelete,
  setPositionToDelete,
  positionsList,
  setPositionsList,
  electionPositions
}) => {
  if (!showDeleteModal) return null;

  const handleArchive = async () => {
  try {
    await axios.delete(`/api/position/election-positions/${positionToDelete}`);
    setPositionsList(prev => prev.filter(p => p.id !== positionToDelete));
    setShowDeleteModal(false);
    setPositionToDelete(null);
  } catch (err) {
    console.error("Failed to delete election position:", err);
  }
};


  const handleCancel = () => {
    setShowDeleteModal(false);
    setPositionToDelete(null);
  };

  const filteredPositions = positionsList.filter(
    pos => electionPositions.includes(pos.id) && !pos.isArchived
  );

  return (
    <div className="ec-modal-overlay">
      <div className="ec-modal">
        <h2>Select Position to Archive</h2>
        <select
          onChange={(e) => setPositionToDelete(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>Select a position</option>
          {filteredPositions.map(pos => (
            <option key={pos.id} value={pos.id}>{pos.name}</option>
          ))}
        </select>
        <div className="ec-modal-actions">
          <button
            className="ec-btn-danger"
            disabled={!positionToDelete}
            onClick={handleArchive}
          >
            Confirm Delete
          </button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeletePositionModal;
