// Card styles


// Confirmation modal styles
const confirmStyles = {
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  confirmHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  candidatePreview: {
    width: '100%',
    marginBottom: 20,
  },
  avatarPlaceholder: {
    width: '100%',
    height: 150,
    backgroundColor: '#4CAF50',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  candidateNameContainer: {
    width: '100%',
    backgroundColor: '#1a237e',
    padding: 12,
  },
  candidateName: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  candidateParty: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#9e9e9e',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 4,
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#1a237e',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 4,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  // Success modal styles
  checkmarkContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#4CAF50',
    fontSize: 30,
    fontWeight: 'bold',
  },
  successMessageContainer: {
    width: '100%',
    backgroundColor: 'white',
    padding: 12,
  },
  successMessage: {
    color: '#4CAF50',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  successSubtext: {
    color: '#666',
    textAlign: 'center',
    fontSize: 12,
  },
  homeButton: {
    backgroundColor: '#1a237e',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 4,
  },
  homeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  voteAgainButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 4,
  },
  voteAgainButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  // Already voted modal styles
  alreadyVotedIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f44336',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  alreadyVotedHeader: {
    color: '#f44336',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  alreadyVotedText: {
    color: '#666',
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 20,
  },
};

export default confirmStyles;