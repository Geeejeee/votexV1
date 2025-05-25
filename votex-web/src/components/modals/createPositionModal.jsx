import "../../styles/candidates.css";
import axios from 'axios';
import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.PROD
      ? "https://votexv1-backend.onrender.com/api"
      : "/api";


const CreatePositionModal = ({
  showCreateModal,
  setShowCreateModal,
  electionId,
  positionsList,
  setPositionsList
}) => {
  const [availablePositions, setAvailablePositions] = useState([]);
  const [selectedPositionId, setSelectedPositionId] = useState('');

  useEffect(() => {
    if (!showCreateModal) return;

    const fetchPositions = async () => {
      try {
        const res = await axios.get(`${API_BASE}/position/get-position`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setAvailablePositions(res.data.positions);
      } catch (err) {
        console.error('Failed to fetch positions:', err);
        alert('Error loading positions.');
      }
    };

    fetchPositions();
  }, [showCreateModal]);

  if (!showCreateModal) return null;

  const handleAssign = async () => {
    if (!selectedPositionId) return;

    try {
      const res = await axios.post(
        `${API_BASE}/position/${electionId}/positions`,
        { positionId: selectedPositionId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      const addedPosition = availablePositions.find(p => p._id === selectedPositionId);

      setPositionsList([
        ...positionsList,
        {
          id: selectedPositionId,
          name: addedPosition.name,
          candidates: []
        }
      ]);

      setSelectedPositionId('');
      setShowCreateModal(false);
    } catch (err) {
      console.error('Failed to assign position:', err);
      alert('Error assigning position.');
    }
  };

  return (
    <div className="ec-modal-overlay">
      <div className="ec-modal">
        <h2>Assign Position to Election</h2>
        <select
          value={selectedPositionId}
          onChange={(e) => setSelectedPositionId(e.target.value)}
        >
          <option value="">Select a position</option>
          {availablePositions.map(pos => (
            <option key={pos._id} value={pos._id}>{pos.name}</option>
          ))}
        </select>
        <div className="ec-modal-actions">
          <button className="ec-btn-primary" onClick={handleAssign}>
            Assign
          </button>
          <button onClick={() => setShowCreateModal(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePositionModal;
