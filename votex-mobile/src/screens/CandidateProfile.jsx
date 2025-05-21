import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView, TouchableOpacity, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import logo from "../assets/votexmlogo.png";

// Card styles
const cardStyles = {
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  dropdownIcon: {
    marginLeft: 8,
    color: '#002F6C',
    fontSize: 16,
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

const ElectionCard = ({ onElectionChange }) => {
  // Dropdown state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // Fixed election data structure with consistent properties
  const electionOptions = [
    { 
      id: 'USG',
      title: 'UNIVERSITY STUDENT\nGOVERNMENT', 
      subtitle: '2025 ELECTIONS', 
      logo: require('../assets/usg-logo.png') 
    },
    { 
      id: 'CSC',
      title: 'COLLEGE STUDENT COUNCIL', 
      subtitle: '2025 ELECTIONS', 
      logo: require('../assets/citc-logo.png')
    },
    { 
      id: 'SITE',
      title: 'SOCIETY OF INFORMATION\nTECHNOLOGY ENTHUSIASTS', 
      subtitle: '2025 ELECTIONS', 
      logo: require('../assets/site-logo.png')
    },
  ];
  
  // Initialize with the University Student Government option
  const [selectedElection, setSelectedElection] = useState(electionOptions[0]);

  // Handle dropdown selection
  const handleElectionSelect = (election) => {
    setSelectedElection(election);
    setDropdownOpen(false);
    if (onElectionChange) {
      onElectionChange(election);
    }
  };

  return (
    <View style={{ position: 'relative', zIndex: 100 }}>
      {/* The card showing the selected election */}
      <TouchableOpacity 
        activeOpacity={0.8}
        style={styles.electionCard} 
        onPress={() => setDropdownOpen(!dropdownOpen)}
      >
        <View style={styles.titleContainer}>
          <View style={cardStyles.headerRow}>
            <Text style={styles.electionTitleTop}>{selectedElection.title}</Text>
            <Text style={cardStyles.dropdownIcon}>▼</Text>
          </View>
          <Text style={styles.electionTitleBottom}>{selectedElection.subtitle}</Text>
        </View>
        <Image source={selectedElection.logo} style={styles.electionLogo} />
      </TouchableOpacity>
      
      {/* Dropdown options - only visible when dropdown is open */}
      {dropdownOpen && (
        <View style={cardStyles.dropdown}>
          {electionOptions.map((option) => (
            <TouchableOpacity 
              key={option.id} 
              style={[
                cardStyles.dropdownItem,
                selectedElection.id === option.id && cardStyles.selectedItem
              ]}
              onPress={() => handleElectionSelect(option)}
            >
              <View style={cardStyles.dropdownItemContent}>
                <View style={cardStyles.textContainer}>
                  <Text style={cardStyles.itemTitle}>{option.title}</Text>
                  <Text style={cardStyles.itemSubtitle}>{option.subtitle}</Text>
                </View>
                <Image source={option.logo} style={cardStyles.itemLogo} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

// Candidate detail modal component
const CandidateDetail = ({ candidate, visible, onClose }) => {
  if (!candidate) return null;
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView style={styles.modalScrollView}>
            <View style={styles.profileCard}>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
              
              <Image
                style={styles.avatar}
              />
              <View style={styles.profileInfo}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.value}>{candidate.name}</Text>

                <Text style={styles.label}>Partylist:</Text>
                <Text style={styles.value}>{candidate.party}</Text>

                <Text style={styles.label}>Running Position:</Text>
                <Text style={styles.value}>{candidate.position}</Text>

                <Text style={styles.label}>Course/Program:</Text>
                <Text style={styles.value}>{candidate.course}</Text>

                <Text style={styles.label}>Year Level:</Text>
                <Text style={styles.value}>{candidate.year}</Text>

                <Text style={styles.label}>Motto:</Text>
                <Text style={styles.value}>{candidate.motto}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Affiliations:</Text>
              {candidate.affiliations.map((item, idx) => (
                <Text key={idx} style={styles.sectionItem}>• {item}</Text>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Advocacies:</Text>
              {candidate.advocacies.map((item, idx) => (
                <Text key={idx} style={styles.sectionItem}>• {item}</Text>
              ))}
            </View>
            
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const CandidateProfileScreen = () => {
  // State for selected candidates
  const [selectedPresident, setSelectedPresident] = useState(null);
  const [selectedVP, setSelectedVP] = useState(null);
  const [selectedSecretary, setSelectedSecretary] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [currentElection, setCurrentElection] = useState({
    id: 'USG',
    title: 'UNIVERSITY STUDENT GOVERNMENT', 
    subtitle: '2025 ELECTIONS'
  });
  
  const handleElectionChange = (election) => {
    // Update the current election
    setCurrentElection(election);
    
    // Reset selections when changing elections
    setSelectedPresident(null);
    setSelectedVP(null);
    setSelectedSecretary(null);
    setSelectedCandidate(null);
    setModalVisible(false);
    
    console.log(`Changed to ${election.title}`);
  };
  
  // Example candidate data with full profiles
  const candidatesData = {
    president: [
      { 
        id: 'p1', 
        name: 'Hernandez, Nicole Raiv', 
        party: 'VibeCoders', 
        color: '#FFC107',
        position: 'President',
        course: 'BSIT',
        year: '3rd Year',
        motto: '"ChatGPT is Life!"',
        image: '', // leave blank for now
        affiliations: [
          'Vice President, University Debate Society',
          'Member, Youth Peace Ambassadors (YPA)',
          'Volunteer, Campus Digital Health Alliance',
          'Former Secretary, College of Social Sciences Council',
          'Project Head, "Sama-samang Gawa: Outreach for Rural Youth"',
          'Member, League of Campus Journalists'
        ],
        advocacies: [
          'Inclusive Leadership & Representation',
          'Equal representation for departments, year levels, and marginalized groups in student councils.',
          'Mental Health Awareness & Support',
          'Establish peer mentorship programs and strengthen mental health resources in collaboration with Guidance Offices.',
          'Sustainable & Green Campaigns',
          'Implement and promote eco-friendly events, and increase recycling bins around campus.',
          'Transparent Governance',
          'Push for publication of student council budgets, accomplishments, and project proposals.',
          'Academic Aid & Digital Inclusion',
          'Provide digital tools for learning platforms, enhance learning spaces, and improve internet access.',
          'Cultural Empowerment',
          'Celebrate indigenous pride and inclusivity through cultural fairs, LGBTQ+ safe spaces, and zero-tolerance policies.'
        ]
      },
      { 
        id: 'p2', 
        name: 'Cruz, Jansen Paulo', 
        party: 'TechNovatros', 
        color: '#4CAF50',
        position: 'President',
        course: 'BS Computer Science',
        year: '4th Year',
        motto: '"Innovation through collaboration"',
        image: '',
        affiliations: [
          'President, Computing Society',
          'Student Representative, University IT Committee',
          'Volunteer, Digital Literacy Program',
          'Member, Environmental Awareness Club'
        ],
        advocacies: [
          'Digital Campus Initiative',
          'Improve campus connectivity and tech infrastructure',
          'Student Innovation Hub',
          'Create spaces for interdisciplinary collaboration',
          'Green Computing Practices',
          'Promote sustainable technology use on campus',
          'Inclusive Technology Access',
          'Ensure all students have equal access to digital resources'
        ]
      },
      { 
        id: 'p3', 
        name: 'Santos, Maria Clara', 
        party: 'PROGressive', 
        color: '#F44336',
        position: 'President',
        course: 'BS Information Systems',
        year: '3rd Year',
        motto: '"Progress through unity"',
        image: '',
        affiliations: [
          'Secretary, Student Council',
          'Coordinator, Campus Outreach Program',
          'Team Leader, Hackathon Champions 2024',
          'Peer Mentor, First Year Experience Program'
        ],
        advocacies: [
          'Student Welfare & Rights',
          'Ensure proper representation in university decisions',
          'Academic Excellence Support',
          'Create more study resources and peer tutoring',
          'Campus Diversity & Inclusion',
          'Celebrate cultural diversity through regular events',
          'Career Development Focus',
          'Strengthen industry partnerships for internships'
        ]
      },
    ],
    vicePresident: [
      { 
        id: 'vp1', 
        name: 'Reyes, Marco', 
        party: 'VibeCoders', 
        color: '#FFC107',
        position: 'Vice President',
        course: 'BS Computer Engineering',
        year: '3rd Year',
        motto: '"Technology with empathy"',
        image: '',
        affiliations: [
          'Technical Head, Robotics Club',
          'Member, Student Ethics Committee',
          'Volunteer, Community Tech Support',
          'Coordinator, Annual Tech Summit'
        ],
        advocacies: [
          'Student Research Support',
          'Create more funding opportunities for student projects',
          'Mental Health Awareness',
          'Promote work-life balance and stress management resources',
          'Technical Skills Workshops',
          'Organize regular industry-led training sessions',
          'Transparent Governance',
          'Regular updates on council activities and spending'
        ]
      },
      { 
        id: 'vp2', 
        name: 'Lim, Sophia', 
        party: 'TechNovatros', 
        color: '#4CAF50',
        position: 'Vice President',
        course: 'BS Information Technology',
        year: '4th Year',
        motto: '"Bridging technology and community"',
        image: '',
        affiliations: [
          'Vice President, Programming Society',
          'Student Ambassador, Women in Tech Initiative',
          'Organizer, Annual Coding Competition',
          'Member, University Debate Team'
        ],
        advocacies: [
          'Women in STEM Support',
          'Create mentorship programs for underrepresented groups',
          'Interdisciplinary Collaboration',
          'Foster connections between different departments',
          'Environmental Technology',
          'Apply technological solutions to campus sustainability',
          'Student Leadership Development',
          'Create opportunities for leadership training'
        ]
      },
      { 
        id: 'vp3', 
        name: 'Garcia, Jose Antonio', 
        party: 'PROGressive', 
        color: '#F44336',
        position: 'Vice President',
        course: 'BS Software Engineering',
        year: '3rd Year',
        motto: '"Code with purpose"',
        image: '',
        affiliations: [
          'Head, Software Development Club',
          'Member, University Honor Society',
          'Volunteer, Digital Literacy for Seniors',
          'Participant, International Programming Competition'
        ],
        advocacies: [
          'Open Source Development',
          'Promote collaboration through open-source campus projects',
          'Accessibility Focus',
          'Ensure campus tech is accessible to all students',
          'Community Outreach',
          'Share technical skills with local communities',
          'Professional Development',
          'Connect students with industry mentors'
        ]
      },
    ],
    secretary: [
      { 
        id: 's1', 
        name: 'Torres, Angelica', 
        party: 'VibeCoders', 
        color: '#FFC107',
        position: 'Secretary',
        course: 'BS Information Systems',
        year: '2nd Year',
        motto: '"Organized for progress"',
        image: '',
        affiliations: [
          'Documentation Head, Project Management Club',
          'Member, University Documentation Committee',
          'Volunteer, Campus Records Digitization Project',
          'Assistant, Student Affairs Office'
        ],
        advocacies: [
          'Transparent Record Keeping',
          'Make council minutes and decisions publicly accessible',
          'Digital Documentation',
          'Modernize record-keeping systems for better accessibility',
          'Student Communication',
          'Develop better channels for student feedback',
          'Inclusive Event Planning',
          'Ensure events accommodate all student needs'
        ]
      },
      { 
        id: 's2', 
        name: 'Villanueva, Michael', 
        party: 'TechNovatros', 
        color: '#4CAF50',
        position: 'Secretary',
        course: 'BS Computer Science',
        year: '3rd Year',
        motto: '"Precision in planning"',
        image: '',
        affiliations: [
          'Secretary, Mathematics Society',
          'Student Assistant, Department of Computer Science',
          'Coordinator, Campus Technology Inventory Project',
          'Member, University Chess Team'
        ],
        advocacies: [
          'Effective Information Dissemination',
          'Modernize announcements through digital platforms',
          'Documentation Standards',
          'Create templates and guides for student organizations',
          'Organizational Efficiency',
          'Streamline council operations and reduce bureaucracy',
          'Accessible Archives',
          'Create digital archives of past student initiatives'
        ]
      },
      { 
        id: 's3', 
        name: 'Mendoza, Patricia', 
        party: 'PROGressive', 
        color: '#F44336',
        position: 'Secretary',
        course: 'BS Information Technology',
        year: '2nd Year',
        motto: '"Information is power"',
        image: '',
        affiliations: [
          'Content Manager, University Tech Blog',
          'Member, Student Publications Committee',
          'Volunteer, Digital Literacy Campaign',
          'Assistant, Campus IT Help Desk'
        ],
        advocacies: [
          'Campus Data Privacy',
          'Raise awareness about digital privacy issues',
          'Meeting Efficiency',
          'Improve meeting procedures for productive discussions',
          'Collaborative Documentation',
          'Implement tools for real-time collaboration',
          'Information Accessibility',
          'Ensure all documents are available in accessible formats'
        ]
      },
    ]
  };

  // Handle selecting a candidate
  const handleCandidateSelect = (candidate, position) => {
    if (position === 'president') {
      setSelectedPresident(candidate.id === selectedPresident?.id ? null : candidate);
    } else if (position === 'vicePresident') {
      setSelectedVP(candidate.id === selectedVP?.id ? null : candidate);
    } else if (position === 'secretary') {
      setSelectedSecretary(candidate.id === selectedSecretary?.id ? null : candidate);
    }
    
    // Set the selected candidate and show modal
    setSelectedCandidate(candidate);
    setModalVisible(true);
  };

  // Render a candidate card
  const renderCandidate = (candidate, position, isSelected) => {
    const cardStyle = isSelected
      ? [styles.candidateCard, { backgroundColor: candidate.color }, styles.selectedCard]
      : [styles.candidateCard, { backgroundColor: candidate.color }];

    return (
      <TouchableOpacity 
        key={candidate.id}
        style={cardStyle}
        onPress={() => handleCandidateSelect(candidate, position)}
      >
        <View style={styles.candidateAvatar} />
        <View style={styles.candidateInfoBox}>
          <Text style={styles.candidateNameBox}>{candidate.name}</Text>
          <Text style={styles.partylistBox}>{candidate.party}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <View style={styles.fixedHeader}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.menu}>☰</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ElectionCard onElectionChange={handleElectionChange} />
        
        {/* PRESIDENT */}
        <Text style={styles.positionTitle}>FOR PRESIDENT : {currentElection.id}</Text>
        <View style={styles.candidateRow}>
          {candidatesData.president.map(candidate => 
            renderCandidate(
              candidate, 
              'president', 
              selectedPresident && selectedPresident.id === candidate.id
            )
          )}
        </View>

        {/* VICE PRESIDENT */}
        <Text style={styles.positionTitle}>FOR VICE PRESIDENT : {currentElection.id}</Text>
        <View style={styles.candidateRow}>
          {candidatesData.vicePresident.map(candidate => 
            renderCandidate(
              candidate, 
              'vicePresident', 
              selectedVP && selectedVP.id === candidate.id
            )
          )}
        </View>

        {/* SECRETARY */}
        <Text style={styles.positionTitle}>FOR SECRETARY : {currentElection.id}</Text>
        <View style={styles.candidateRow}>
          {candidatesData.secretary.map(candidate => 
            renderCandidate(
              candidate, 
              'secretary', 
              selectedSecretary && selectedSecretary.id === candidate.id
            )
          )}
        </View>
        
        {/* Display selected candidate details */}
        <CandidateDetail 
          candidate={selectedCandidate} 
          visible={modalVisible} 
          onClose={() => setModalVisible(false)} 
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fixedHeader: {
    backgroundColor: "#002F6C",
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 40,
    paddingHorizontal: 16,
    zIndex: 99,
  },
  logo: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },
  menu: {
    fontSize: 24,
    color: "#fff",
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  icon: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 15,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20, 
  },
  candidateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 0,
  },
  candidateCard: {
    flex: 1,
    height: 120,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    padding: 0,
    paddingTop: 20,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#000',
    elevation: 8,
  },
  candidateInfoBox: {
    backgroundColor: "#002F6C",
    paddingVertical: 6,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "60%",
  },
  candidateAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  candidateNameBox: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 4,
    paddingHorizontal: 0,
    alignSelf: "stretch",
    flexWrap: "wrap",
  },
  partylistBox: {
    color: "#fff",
    fontSize: 10,
    textAlign: "center",
    paddingVertical: 2,
    paddingHorizontal: 0,
    alignSelf: "stretch",
    flexWrap: "wrap",
  },
  positionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  electionCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
    minHeight: 140,
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#002F6C",
    marginBottom: 60,
    width: "100%",
    height: "15%",
    marginVertical: 10,
    elevation: 6,
  },
  titleContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  electionTitleTop: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
    color: "#000",
    paddingTop: 20,
    marginBottom: 20,
  },
  electionTitleBottom: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    marginBottom: 8,
  },
  electionLogo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginLeft: -60,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxHeight: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalScrollView: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#002F6C',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileCard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#f2f2f2',
  },
  profileInfo: {
    width: '100%',
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    marginBottom: 8,
    fontSize: 14,
    color: '#000',
  },
  section: {
    backgroundColor: '#FFD700',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  sectionItem: {
    fontSize: 14,
    marginBottom: 6,
  },
});

export default CandidateProfileScreen;