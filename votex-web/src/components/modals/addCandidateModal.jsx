import React from 'react';
import { X } from 'lucide-react';
import "../../styles/candidates.css";

const AddCandidateModal = ({
  showAddCandidateModal,
  setShowAddCandidateModal,
  candidateName,
  setCandidateName,
  candidateParty,
  setCandidateParty,
  candidatePosition,
  candidateCourse,
  setCandidateCourse,
  candidateYearLevel,
  setCandidateYearLevel,
  candidatePhoto,
  setCandidatePhoto,
  candidateMotto,
  setCandidateMotto,
  candidateAffiliations,
  setCandidateAffiliations,
  candidateAdvocacies,
  setCandidateAdvocacies,
  positionsList,
  setPositionsList,
  selectedPositionId,
  errorMessage,
  setErrorMessage,
  resetFormFields
}) => {
  if (!showAddCandidateModal) return null;

  const handleSubmit = () => {
    const trimmedName = candidateName.trim();
    const trimmedParty = candidateParty.trim();

    if (!trimmedName || !trimmedParty || !candidatePhoto) {
      setErrorMessage('Please fill all required fields and upload a photo.');
      return;
    }

    const duplicate = positionsList
      .find(pos => pos.id === selectedPositionId)
      ?.candidates.some(c => c.name.toLowerCase() === trimmedName.toLowerCase());

    if (duplicate) {
      setErrorMessage('A candidate with this name already exists.');
      return;
    }

    const newCandidate = {
      id: Date.now(),
      name: trimmedName,
      party: trimmedParty,
      position: candidatePosition,
      course: candidateCourse,
      yearLevel: candidateYearLevel,
      motto: candidateMotto,
      affiliations: candidateAffiliations,
      advocacies: candidateAdvocacies,
      photo: URL.createObjectURL(candidatePhoto),
    };

    setPositionsList(prev =>
      prev.map(pos =>
        pos.id === selectedPositionId
          ? { ...pos, candidates: [...pos.candidates, newCandidate] }
          : pos
      )
    );

    setShowAddCandidateModal(false);
    resetFormFields();
  };

  return (
    <div className="ec-modal-overlay">
      <div className="ec-add-candidate-modal ec-modal-fade-in">
        <div className="ec-add-candidate-header">
          <h2>ADD CANDIDATE</h2>
          <button
            className="ec-add-candidate-close"
            onClick={() => setShowAddCandidateModal(false)}
          >
            <X size={24} />
          </button>
        </div>

        {errorMessage && (
          <p style={{ color: 'red', fontSize: '0.875rem', textAlign: 'center', marginBottom: '1rem' }}>
            {errorMessage}
          </p>
        )}

        <div className="ec-form-row">
          <div className="ec-form-group">
            <label className="ec-form-label">CANDIDATE NAME:</label>
            <input
              type="text"
              className="ec-form-control"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
            />
          </div>
          <div className="ec-form-group">
            <label className="ec-form-label">PARTYLIST:</label>
            <input
              type="text"
              className="ec-form-control"
              value={candidateParty}
              onChange={(e) => setCandidateParty(e.target.value)}
            />
          </div>
        </div>

        <div className="ec-form-row">
          <div className="ec-form-group">
            <label className="ec-form-label">RUNNING POSITION:</label>
            <input
              type="text"
              className="ec-form-control"
              value={candidatePosition}
              readOnly
            />
          </div>
          <div className="ec-form-group">
            <label className="ec-form-label">COURSE/PROGRAM:</label>
            <input
              type="text"
              className="ec-form-control"
              value={candidateCourse}
              onChange={(e) => setCandidateCourse(e.target.value)}
            />
          </div>
          <div className="ec-form-group">
            <label className="ec-form-label">YEAR LEVEL:</label>
            <input
              type="text"
              className="ec-form-control"
              value={candidateYearLevel}
              onChange={(e) => setCandidateYearLevel(e.target.value)}
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
              onChange={(e) => setCandidatePhoto(e.target.files[0])}
            />
          </div>
          <div className="ec-form-group">
            <label className="ec-form-label">MOTTO:</label>
            <input
              type="text"
              className="ec-form-control"
              value={candidateMotto}
              onChange={(e) => setCandidateMotto(e.target.value)}
            />
          </div>
        </div>

        <div className="ec-form-group" style={{ marginBottom: '1rem' }}>
          <label className="ec-form-label">AFFILIATIONS:</label>
          <textarea
            className="ec-form-control ec-form-textarea"
            value={candidateAffiliations}
            onChange={(e) => setCandidateAffiliations(e.target.value)}
          ></textarea>
        </div>

        <div className="ec-form-group" style={{ marginBottom: '1rem' }}>
          <label className="ec-form-label">ADVOCACIES:</label>
          <textarea
            className="ec-form-control ec-form-textarea"
            value={candidateAdvocacies}
            onChange={(e) => setCandidateAdvocacies(e.target.value)}
          ></textarea>
        </div>

        <div className="ec-form-submit">
          <button className="ec-btn-submit" onClick={handleSubmit}>
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCandidateModal;
