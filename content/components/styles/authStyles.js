import { StyleSheet } from 'react-native';
import colors from './colors';

const styles = StyleSheet.create({
  // Container Styles
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
    backgroundColor: colors.snowWhite,
  },

  // Text Styles
  authTitle: {
    fontSize: 28,
    fontWeight: '300',
    marginBottom: 40,
    textAlign: 'center',
    color: colors.primaryText,
  },

  authSubtitle: {
    fontSize: 14,
    marginBottom: 30,
    marginTop: -10,
    textAlign: 'center',
    color: colors.secondaryText,
    fontWeight: '400',
  },

  authLabel: {
    fontSize: 12,
    marginBottom: 6,
    fontWeight: '500',
    color: colors.primaryText,
    textTransform: 'uppercase',
  },

  authLinkText: {
    fontSize: 14,
    textAlign: 'center',
    color: colors.arcticBlue,
    fontWeight: '500',
    marginTop: 30,
  },

  authErrorText: {
    fontSize: 12,
    color: colors.errorRed,
    marginBottom: 10,
    textAlign: 'left',
  },

  authButtonText: {
    color: colors.whiteText,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
  },

  // Input Styles
  authTextInput: {
      borderWidth: 0.5,
    borderColor: colors.icyGray,
    backgroundColor: colors.crystalWhite,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 10,
    borderRadius: 3,
    fontSize: 14,
    color: colors.primaryText,
  },

  authTextInputDisabled: {
    borderWidth: 0.5,
    borderColor: colors.icyGray,
    backgroundColor: colors.icyBlue,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 10,
    borderRadius: 3,
    fontSize: 14,
    color: colors.secondaryText,
  },

  // Button Styles
  authButtonPrimary: {
    backgroundColor: colors.arcticBlue,
    paddingVertical: 10,
    borderRadius: 3,
    marginTop: 10,
    marginBottom: 0,
  },

  authButtonSecondary: {
    backgroundColor: colors.deepIce,
    paddingVertical: 10,
    borderRadius: 3,
  },

  authButtonSuccess: {
    backgroundColor: colors.successGreen,
    paddingVertical: 10,
    borderRadius: 3,
    marginTop: 10,
  },
});

export default styles;