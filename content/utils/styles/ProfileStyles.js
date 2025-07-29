import { StyleSheet } from 'react-native';    
import colors from './colors';
import { Dimensions } from 'react-native';  
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GRID_COLUMNS = 3;
const IMAGE_SIZE = SCREEN_WIDTH / GRID_COLUMNS ;
const ProfileStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.crystalWhite,
    flex: 1,
  },
  logoutButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: colors.frostBlue,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    zIndex: 1,
  },
  logoutText: {
    color: colors.whiteText,
    fontSize: 14,
    fontWeight: '600',
  },
  profileTop: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: colors.primaryText,
    borderWidth: 2,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primaryText,
  },
  username: {
    fontSize: 14,
    color: colors.secondaryText,
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%',
    marginVertical: 12,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primaryText,
  },
  statLabel: {
    fontSize: 12,
    color: colors.secondaryText,
  },
  socialiceButton: {
    backgroundColor: colors.frostBlue,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    color: colors.whiteText,
    fontWeight: '600',
    fontSize: 16,
  },
  gridContainer: {
    paddingBottom: 30,
  },
  gridImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    margin:1,
  },
});

export default ProfileStyles;