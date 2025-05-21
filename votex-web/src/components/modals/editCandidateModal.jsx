import { X } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';
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
  const [isSaving, setIsSaving] = useState(false);

  if (!showEditModal || !editingCandidate) return null;

  const handleSave = async () => {
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
      newPhotoFile,
      positionId,
      candidateId,
    } = editingCandidate;

    const trimmedName = name.trim();
    const trimmedParty = party.trim();

    if (!trimmedName || !trimmedParty) {
      setErrorMessage('Please fill all required fields.');
      return;
    }

    // Check for duplicate candidate name in same position, excluding this candidate
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

    setIsSaving(true);
    setErrorMessage(null);

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      
      // Assuming your backend expects firstName and lastName separately
      const [firstName, ...rest] = trimmedName.split(' ');
      const lastName = rest.join(' ') || '';

      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('party', trimmedParty);
      formData.append('course', course || '');
      formData.append('yearLevel', yearLevel || '');
      formData.append('motto', motto || '');
      formData.append('affiliations', affiliations || '');
      formData.append('advocacies', advocacies || '');

      // Only append photo file if user selected a new one
      if (newPhotoFile) {
        formData.append('photo', newPhotoFile);
      }

      // Make PUT or PATCH request to your API to update candidate
      // Adjust the endpoint URL to your actual backend route
      const res = await axios.put(
        `/api/admin/candidates/${candidateId}`, 
        formData, 
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          }
        }
      );

      const updatedCandidate = res.data.candidate;

      // Construct full name to keep UI consistent
      const fullName = `${updatedCandidate.firstName} ${updatedCandidate.lastName}`.trim();

      setPositionsList(prev =>
        prev.map(pos => {
          if (pos.id !== positionId) return pos;
          return {
            ...pos,
            candidates: pos.candidates.map(c =>
              c.id === candidateId
                ? {
                    ...c,
                    name: fullName,
                    party: updatedCandidate.party,
                    course: updatedCandidate.course,
                    yearLevel: updatedCandidate.yearLevel,
                    motto: updatedCandidate.motto,
                    affiliations: updatedCandidate.affiliations,
                    advocacies: updatedCandidate.advocacies,
                    photo: updatedCandidate.photo, // URL from backend
                  }
                : c
            ),
          };
        })
      );

      setShowEditModal(false);
      setEditingCandidate(null);
      setErrorMessage('');
    } catch (err) {
      console.error("Edit candidate error:", err);
      setErrorMessage(err.response?.data?.message || 'Failed to update candidate.');
    } finally {
      setIsSaving(false);
    }
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
            disabled={isSaving}
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
              disabled={isSaving}
            />
          </div>
          <div className="ec-form-group">
            <label className="ec-form-label">PARTYLIST:</label>
            <input
              type="text"
              className="ec-form-control"
              value={editingCandidate.party}
              onChange={(e) => setEditingCandidate({ ...editingCandidate, party: e.target.value })}
              disabled={isSaving}
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
              disabled={isSaving}
            />
          </div>
          <div className="ec-form-group">
            <label className="ec-form-label">COURSE/PROGRAM:</label>
            <input
              type="text"
              className="ec-form-control"
              value={editingCandidate.course}
              onChange={(e) => setEditingCandidate({ ...editingCandidate, course: e.target.value })}
              disabled={isSaving}
            />
          </div>
          <div className="ec-form-group">
            <label className="ec-form-label">YEAR LEVEL:</label>
            <input
              type="text"
              className="ec-form-control"
              value={editingCandidate.yearLevel}
              onChange={(e) => setEditingCandidate({ ...editingCandidate, yearLevel: e.target.value })}
              disabled={isSaving}
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
              disabled={isSaving}
            />
            {/* Optionally preview current photo */}
            {editingCandidate.photo && (
              <img 
                src={editingCandidate.photo} 
                alt="Candidate" 
                style={{ marginTop: 8, maxWidth: '100px', maxHeight: '100px', objectFit: 'cover' }}
              />
            )}
          </div>
          <div className="ec-form-group">
            <label className="ec-form-label">MOTTO:</label>
            <input
              type="text"
              className="ec-form-control"
              value={editingCandidate.motto}
              onChange={(e) => setEditingCandidate({ ...editingCandidate, motto: e.target.value })}
              disabled={isSaving}
            />
          </div>
        </div>

        <div className="ec-form-group" style={{ marginBottom: '1rem' }}>
          <label className="ec-form-label">AFFILIATIONS:</label>
          <textarea
            className="ec-form-control ec-form-textarea"
            value={editingCandidate.affiliations}
            onChange={(e) => setEditingCandidate({ ...editingCandidate, affiliations: e.target.value })}
            disabled={isSaving}
          ></textarea>
        </div>

        <div className="ec-form-group" style={{ marginBottom: '1rem' }}>
          <label className="ec-form-label">ADVOCACIES:</label>
          <textarea
            className="ec-form-control ec-form-textarea"
            value={editingCandidate.advocacies}
            onChange={(e) => setEditingCandidate({ ...editingCandidate, advocacies: e.target.value })}
            disabled={isSaving}
          ></textarea>
        </div>

        <div className="ec-form-submit">
          <button
            className="ec-btn-submit"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'SAVE'}
          </button>
        </div>
      </div>
    </div>
  );
}
