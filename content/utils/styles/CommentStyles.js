import { StyleSheet } from 'react-native';
import colors from './colors';

const CommentStyles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  
  container: {
    backgroundColor: colors.snowWhite,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: '100%',
  },
  
  safeArea: {
    flex: 1,
  },
  
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: colors.icyGray,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.icyGray,
  },
  
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primaryText,
  },
  
  closeButton: {
    padding: 4,
  },
  
  closeButtonText: {
    fontSize: 18,
    color: colors.slateGray,
    fontWeight: '500',
  },
  
  commentsList: {
    flex: 1,
  },
  
  commentsContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexGrow: 1,
  },
  
  commentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  
  commentProfilePic: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.icyGray,
    marginRight: 12,
  },
  
  commentContent: {
    flex: 1,
    paddingTop: 2,
  },
  
  commentText: {
    fontSize: 14,
    color: colors.primaryText,
    lineHeight: 18,
    marginBottom: 4,
  },
  
  commentUsername: {
    fontWeight: '600',
    color: colors.primaryText,
  },
  
  commentTime: {
    fontSize: 12,
    color: colors.secondaryText,
  },
  
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.slateGray,
    marginBottom: 8,
  },
  
  emptySubText: {
    fontSize: 14,
    color: colors.secondaryText,
  },
  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 0.5,
    borderTopColor: colors.icyGray,
    backgroundColor: colors.snowWhite,
  },
  
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.icyGray,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.primaryText,
    backgroundColor: colors.crystalWhite,
    marginRight: 8,
    maxHeight: 80,
  },
  
  placeholderColor: {
    color: colors.placeholderText,
  },
  
  sendButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 60,
  },
  
  sendButtonActive: {
    backgroundColor: colors.arcticBlue,
  },
  
  sendButtonInactive: {
    backgroundColor: colors.icyGray,
  },
  
  sendButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  
  sendButtonTextActive: {
    color: colors.snowWhite,
  },
  
  sendButtonTextInactive: {
    color: colors.slateGray,
  },
});

export default CommentStyles;