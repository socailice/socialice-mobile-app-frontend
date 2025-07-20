import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Container Styles
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },

  // Text Styles
  authTitle: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
    color: 'black',
  },

  authSubtitle: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
  },

  authLabel: {
    marginBottom: 5,
    fontWeight: 'bold',
    color: 'black',
  },

  authLinkText: {
    textAlign: 'center',
    color: 'blue',
  },

  authErrorText: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
  },

  authButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },

  // Input Styles
  authTextInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    color: 'black',
  },

  authTextInputLarge: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    color: 'black',
  },

  authTextInputDisabled: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    color: '#666',
  },

  authTextInputError: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    color: 'black',
  },

  // Button Styles
  authButtonPrimary: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
  },

  authButtonSecondary: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
  },

  authButtonSuccess: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
  },
});

export default styles;