import "../../styles/candidates.css"

const DeletePositionModal = ({
  showDeleteModal,
  setShowDeleteModal,
  positionToDelete,
  setPositionToDelete,
  positionsList,
  setPositionsList
}) => {
  if (!showDeleteModal) return null;

  const handleDelete = () => {
    setPositionsList(positionsList.filter(p => p.id !== positionToDelete));
    setShowDeleteModal(false);
    setPositionToDelete(null);
  };

  const handleCancel = () => {
    setShowDeleteModal(false);
    setPositionToDelete(null);
  };

  return (
    <div className="ec-modal-overlay">
      <div className="ec-modal">
        <h2>Select Position to Delete</h2>
        <select
          onChange={(e) => setPositionToDelete(Number(e.target.value))}
          defaultValue=""
        >
          <option value="" disabled>Select a position</option>
          {positionsList.map(pos => (
            <option key={pos.id} value={pos.id}>{pos.title}</option>
          ))}
        </select>
        <div className="ec-modal-actions">
          <button
            className="ec-btn-danger"
            disabled={!positionToDelete}
            onClick={handleDelete}
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
