import { StyleSheet } from 'react-native';
import colors from './colors';

const CubeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.whiteText,
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: 250,
    width: 290,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors?.iceBlue,
    borderRadius: 30,
  },
  totalCubesNumber: {
    fontSize: 64,
    fontWeight: 'bold',
    color: colors?.frostBlue,
    marginBottom: 8,
  },
  totalCubesLabel: {
    fontSize: 16,
    color: colors?.slateGray,
    marginBottom: 30,
  },
  findCubesButton: {
    backgroundColor: colors?.frostBlue,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  findCubesText: {
    color: colors?.whiteText,
    fontSize: 16,
    fontWeight: '600',
  },
  requestsSection: {
    flex: 1,
    backgroundColor: colors?.snowWhite,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
  },
  requestsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  requestsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors?.primaryText,
  },
  requestsCount: {
    fontSize: 16,
    color: colors?.frostBlue,
    fontWeight: '600',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  requestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors?.icyGray,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors?.frostBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: colors?.whiteText,
    fontSize: 18,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: colors?.primaryText,
    marginBottom: 4,
  },
  mutualCubes: {
    fontSize: 14,
    color: colors?.slateGray,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  acceptButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors?.frostBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rejectButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors?.icyGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkMark: {
    color: colors?.whiteText,
    fontSize: 18,
    fontWeight: 'bold',
  },
  xMark: {
    color: colors?.slateGray,
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: colors?.icyBlue,
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  backArrow: {
    fontSize: 24,
    color: colors?.frostBlue,
    fontWeight: 'bold',
  },
  searchInput: {
    flex: 1,
    backgroundColor: colors?.snowWhite,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    fontSize: 16,
    color: colors?.primaryText,
  },
  searchResults: {
    flex: 1,
    backgroundColor: colors?.snowWhite,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
  },
});

export default CubeStyles;
