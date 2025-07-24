import { StyleSheet } from "react-native";
import colors from "./colors";

const ChatStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.crystalWhite,
    paddingTop: 10,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomColor: colors.icyGray,
    borderBottomWidth: 1,
    backgroundColor: colors.snowWhite,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 14,
  },
  chatInfo: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primaryText,
  },
  lastMessage: {
    color: colors.secondaryText,
    marginTop: 4,
  },
});

export default ChatStyles;