import { StyleSheet, Dimensions } from 'react-native';
import colors from './colors';

const { width } = Dimensions.get('window');

const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.glacierBlue,
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.glacierBlue,
    borderBottomWidth: 1,
    borderBottomColor: colors.icyBlue,
  },
  
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.snowWhite,
    letterSpacing: -0.3,
  },
  
  headerIcon: {
    marginLeft: 8,
  },
  
  cubeIcon: {
    fontSize: 24,
    color: colors.snowWhite,
  },
  
  headerRight: {
    position: 'relative',
  },
  
  notificationDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.penguinOrange,
    zIndex: 1,
  },
  
  menuIcon: {
    fontSize: 24,
    color: colors.snowWhite,
  },
  
  feedContainer: {
    flex: 1,
  },
  
  postSection: {
    marginBottom: 12,
    backgroundColor: colors.glacierBlue,
  },
  
  postContainer: {
    backgroundColor: colors.snowWhite,
    borderRadius: 8,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.icyGray,
  },
  
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primaryText,
    marginLeft: 12,
  },
  
  dotsButton: {
    padding: 8,
  },
  
  dotsText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.secondaryText,
  },
  
  postImage: {
    width: '100%',
    height: width - 16,
    backgroundColor: colors.icyGray,
  },
  
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  
  hammerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  
  hammerIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  
  hammerIconActive: {
    color: colors.penguinOrange,
  },
  
  hammerIconInactive: {
    color: colors.slateGray,
  },
  
  hammerCount: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primaryText,
  },
  
  commentsButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  commentsIcon: {
    fontSize: 18,
    marginRight: 6,
    color: colors.slateGray,
  },
  
  commentsCount: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primaryText,
  },
  
  postContent: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  
  caption: {
    fontSize: 15,
    color: colors.primaryText,
    lineHeight: 20,
    marginBottom: 8,
  },
  
  viewCommentsSection: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  
  viewCommentsText: {
    fontSize: 14,
    color: colors.secondaryText,
    fontWeight: '500',
  },
});

export default HomeStyles;