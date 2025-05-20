import { X } from 'lucide-react';
import "../../styles/candidates.css";

export default function EditCandidateModal({
  showEditModal,
  editingCandidate,
  setShowEditModal,
  setEditingCandidate,
  setPositionsList,
  setErrorMessage,
  errorMessage,
  positionsList
}) {
  if (!showEditModal || !editingCandidate) return null;

  const handleSave = () => {
    const {
      name,
      party,
      position,
      course,
      yearLevel,
      motto,
      affiliations,
      advocacies,
      photo,
      positionId,
      candidateId,
    } = editingCandidate;

    const trimmedName = name.trim();
    const trimmedParty = party.trim();

    if (!trimmedName || !trimmedParty) {
      setErrorMessage('Please fill all required fields.');
      return;
    }

    const isDuplicate = positionsList
      .find(pos => pos.id === positionId)
      ?.candidates.some(c =>
        c.name.toLowerCase() === trimmedName.toLowerCase() &&
        c.id !== candidateId
      );

    if (isDuplicate) {
      setErrorMessage('A candidate with this name already exists.');
      return;
    }

    setPositionsList(prev =>
      prev.map(pos => {
        if (pos.id !== positionId) return pos;
        return {
          ...pos,
          candidates: pos.candidates.map(c =>
            c.id === candidateId
              ? {
                  ...c,
                  name: trimmedName,
                  party: trimmedParty,
                  position,
                  course,
                  yearLevel,
                  motto,
                  affiliations,
                  advocacies,
                  photo,
                }
              : c
          ),
        };
      })
    );

    setShowEditModal(false);
    setEditingCandidate(null);
    setErrorMessage('');
  };

  return (
    <div className="ec-modal-overlay">
      <div className="ec-add-candidate-modal ec-modal-fade-in">
        <div className="ec-add-candidate-header">
          <h2>EDIT CANDIDATE</h2>
          <button
            className="ec-add-candidate-close"
            onClick={() => {
              setShowEditModal(false);
              setEditingCandidate(null);
              setErrorMessage('');
            }}
          >
            <X size={24} />
          </button>
        </div>

        {errorMessage && (
          <p className="ec-error-message">{errorMessage}</p>
        )}

        <div className="ec-form-row">
          <div className="ec-form-group">
            <label className="ec-form-label">CANDIDATE NAME:</label>
            <input
              type="text"
              className="ec-form-control"
              value={editingCandidate.name}
              onChange={(e) => setEditingCandidate({ ...editingCandidate, name: e.target.value })}
            />
          </div>
          <div className="ec-form-group">
            <label className="ec-form-label">PARTYLIST:</label>
            <input
              type="text"
              className="ec-form-control"
              value={editingCandidate.party}
              onChange={(e) => setEditingCandidate({ ...editingCandidate, party: e.target.value })}
            />
          </div>
        </div>

        <div className="ec-form-row">
          <div className="ec-form-group">
            <label className="ec-form-label">RUNNING POSITION:</label>
            <input
              type="text"
              className="ec-form-control"
              value={editingCandidate.position}
              readOnly
            />
          </div>
          <div className="ec-form-group">
            <label className="ec-form-label">COURSE/PROGRAM:</label>
            <input
              type="text"
              className="ec-form-control"
              value={editingCandidate.course}
              onChange={(e) => setEditingCandidate({ ...editingCandidate, course: e.target.value })}
            />
          </div>
          <div className="ec-form-group">
            <label className="ec-form-label">YEAR LEVEL:</label>
            <input
              type="text"
              className="ec-form-control"
              value={editingCandidate.yearLevel}
              onChange={(e) => setEditingCandidate({ ...editingCandidate, yearLevel: e.target.value })}
            />
          </div>
        </div>

        <div className="ec-form-row">
          <div className="ec-form-group">
            <label className="ec-form-label">CANDIDATE PHOTO:</label>
            <input
              type="file"
              accept="image/*"
              className="ec-file-input"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setEditingCandidate({
                    ...editingCandidate,
                    photo: URL.createObjectURL(file),
                    newPhotoFile: file,
                  });
                }
              }}
            />
          </div>
          <div className="ec-form-group">
            <label className="ec-form-label">MOTTO:</label>
            <input
              type="text"
              className="ec-form-control"
              value={editingCandidate.motto}
              onChange={(e) => setEditingCandidate({ ...editingCandidate, motto: e.target.value })}
            />
          </div>
        </div>

        <div className="ec-form-group" style={{ marginBottom: '1rem' }}>
          <label className="ec-form-label">AFFILIATIONS:</label>
          <textarea
            className="ec-form-control ec-form-textarea"
            value={editingCandidate.affiliations}
            onChange={(e) => setEditingCandidate({ ...editingCandidate, affiliations: e.target.value })}
          ></textarea>
        </div>

        <div className="ec-form-group" style={{ marginBottom: '1rem' }}>
          <label className="ec-form-label">ADVOCACIES:</label>
          <textarea
            className="ec-form-control ec-form-textarea"
            value={editingCandidate.advocacies}
            onChange={(e) => setEditingCandidate({ ...editingCandidate, advocacies: e.target.value })}
          ></textarea>
        </div>

        <div className="ec-form-submit">
          <button className="ec-btn-submit" onClick={handleSave}>
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
}
