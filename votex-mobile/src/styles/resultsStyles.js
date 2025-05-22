import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  fixedHeader: {
    backgroundColor: "#002F6C",
    top: 0,
    left: 0,
    right: 0,
    height: 80, // adjust as needed
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  timestampContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 10, 
  },
  timestampText: {
    color: '#0D3380',
    fontWeight: 'bold',
    fontSize: 14,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  resultCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#0D3380',
  },
  electionCard: {
    backgroundColor: '#0D3380',
    borderRadius: 10,
  },
  organizationHeader: {
    backgroundColor: 'white',
    padding: 16,
    margin: 10,
    borderRadius: 10,
    position: 'relative',
  },
  organizationName: {
    color: '#0D3380',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'left',
  },
  electionText: {
    color: '#0D3380',
    fontSize: 12,
    textAlign: 'left',
    marginTop: 4,
  },
  logoContainer: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  citcLogo: {
    width: 40,
    height: 40,
    marginTop: 8,
  },
  siteLogo: {
    width: 60,
    height: 60,
  },
  usgLogo: {
    width: 60,
    height: 60,
    },
  organizationAcronym: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  unofficialText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 12,
    marginBottom: 20,
    marginLeft: 12,
  },
  candidateContainer: {
    marginVertical: 8,
    paddingHorizontal: 12,
  },
  positionLabelContainer: {
    alignSelf: 'flex-start',
  },
  positionLabel: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'white',
  },
  candidateRow: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
  candidateAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  candidateInfo: {
    flex: 1,
    marginLeft: 12,
  },
  candidateName: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'white',
  },
  candidateParty: {
    fontSize: 12,
    color: '#666',
  },
  voteBarContainer: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginTop: 4,
    overflow: 'hidden',
  },
  voteBar: {
    height: '100%',
    borderRadius: 4,
  },
  voteCount: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 2,
    textAlign: 'right',
    color: '#666',
  },
  viewAllContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  viewAllText: {
    color: 'white',
    fontWeight: '600',
    marginRight: 8,
  },
  detailContainer: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  detailHeader: {
    backgroundColor: "#002F6C",
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  leftHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    padding: 8,
  },
  detailLogo: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },
  rightHeaderIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailTimestampContainer: {
    backgroundColor: 'white',
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  detailTimestampLabel: {
    color: '#002F6C',
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 5,
  },
  detailTimestampValue: {
    color: '#002F6C',
    fontWeight: 'bold',
    fontSize: 14,
  },
  organizationInfoContainer: {
    padding: 15,
  },
  orgInfoBox: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#002F6C',
    position: 'relative',
  },
  detailOrgName: {
    color: '#002F6C',
    fontWeight: 'bold',
    fontSize: 14,
    maxWidth: '80%',
  },
  detailElectionText: {
    color: '#002F6C',
    fontSize: 12,
    marginTop: 4,
  },
  detailLogoContainer: {
    position: 'absolute',
    right: 15,
    top: -5,
  },
  detailOrgLogo: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
  detailScrollView: {
    flex: 1,
    padding: 15,
  },
  positionContainer: {
    backgroundColor: '#002F6C',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  positionHeaderBar: {
    padding: 12,
    paddingHorizontal: 15,
  },
  positionTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  detailCandidateRow: {
    flexDirection: 'row',
    padding: 10,
    paddingVertical: 12,
  },
  detailCandidateAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  detailCandidateContent: {
    flex: 1,
  },
  detailCandidateInfo: {
    marginBottom: 6,
  },
  detailCandidateName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  detailCandidateParty: {
    color: '#CCC',
    fontSize: 12,
  },
  detailVoteBarContainer: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    marginBottom: 4,
    overflow: 'hidden',
  },
  detailVoteBar: {
    height: '100%',
    borderRadius: 4,
  },
  detailVoteStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailVotePercentage: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  detailVoteCount: {
    fontSize: 12,
    color: '#CCC',
  },
  
});

export default styles;