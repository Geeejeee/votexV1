const cardStyles = {
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',  // Changed to space-between for better layout
    width: '100%',
  },
  dropdownIcon: {
    marginLeft: 8,
    color: '#002F6C',
    fontSize: 16,    // Increased size for better visibility
    fontWeight: 'bold',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#002F6C',
    zIndex: 1000,
    elevation: 5,
    marginTop: 5,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  dropdownItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  selectedItem: {
    backgroundColor: '#F0F8FF',
  },
  dropdownItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  itemSubtitle: {
    fontSize: 12,
    color: '#333',
    marginTop: 2,
  },
  itemLogo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  }
};

export default cardStyles;