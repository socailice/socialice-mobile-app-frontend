import { StyleSheet, Dimensions } from 'react-native';
import colors from './colors';

const { width } = Dimensions.get('window');

const PostStyles = StyleSheet.create({
  // Container Styles
  container: {
    flex: 1,
    backgroundColor: colors.glacierBlue,
  },
  
  // Header Styles
  header: {
    height: 56,
    backgroundColor: colors.snowWhite,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.icyBlue,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primaryText,
  },
  
  headerButton: {
    padding: 8,
  },
  
  headerButtonText: {
    fontSize: 16,
    color: colors.arcticBlue,
    fontWeight: '600',
  },
  
  headerButtonDisabled: {
    color: colors.slateGray,
  },
  
  // Content Area Styles
  content: {
    flex: 1,
    backgroundColor: colors.snowWhite,
  },
  
  // Image Preview Styles
  imagePreview: {
    width: width,
    height: width,
    backgroundColor: colors.icyGray,
  },
  
  placeholderPreview: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  placeholderText: {
    color: colors.secondaryText,
    fontSize: 16,
  },
  
  // Thumbnail Styles
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: colors.icyGray,
  },
  
  // Grid Styles
  gridContainer: {
    paddingTop: 2,
  },
  
  gridItem: {
    width: (width - 4) / 3,
    height: (width - 4) / 3,
    margin: 1,
    position: 'relative',
  },
  
  gridImage: {
    width: '100%',
    height: '100%',
  },
  
  selectedOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.snowWhite,
    borderRadius: 12,
    padding: 2,
  },
  
  // Options Container
  optionsContainer: {
    backgroundColor: colors.snowWhite,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.icyBlue,
  },
  
  // Button Styles
  primaryButton: {
    backgroundColor: colors.arcticBlue,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  
  primaryButtonText: {
    color: colors.snowWhite,
    fontWeight: '600',
    marginLeft: 6,
  },
  
  // Crop Options
  cropSection: {
    backgroundColor: colors.snowWhite,
    padding: 16,
  },
  
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primaryText,
    marginBottom: 12,
  },
  
  cropButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  cropButton: {
    flex: 1,
    backgroundColor: colors.snowWhite,
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.icyBlue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  cropButtonText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
    color: colors.primaryText,
  },
  
  // Post Composition
  postRow: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'flex-start',
    backgroundColor: colors.snowWhite,
  },
  
  captionInput: {
    flex: 1,
    fontSize: 16,
    color: colors.primaryText,
    minHeight: 80,
    textAlignVertical: 'top',
    marginLeft: 12,
  },
  
  characterCount: {
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: colors.snowWhite,
  },
  
  characterCountText: {
    fontSize: 12,
    color: colors.slateGray,
  },
  
  // Loading State
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.snowWhite,
  },
  
  loadingText: {
    fontSize: 16,
    color: colors.slateGray,
  },
  
  // Gallery Title
  galleryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primaryText,
  },
});

export default PostStyles;