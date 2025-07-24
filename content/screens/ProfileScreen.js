import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import colors from '../utils/styles/colors';
import { ProfileApi } from './api/Api';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GRID_COLUMNS = 3;
const IMAGE_SIZE = SCREEN_WIDTH / GRID_COLUMNS ;

const ProfileScreen = () => {
  const [profile, setProfile] = useState(null);
  const [isSocialiced, setIsSocialiced] = useState(false);

  useEffect(() => {
    const response = ProfileApi();
    if (response?.success) {
      setProfile(response?.data || {});
      setIsSocialiced(response?.data?.isSocialiced || false);
    }
  }, []);

  const toggleSocialice = () => {
    setIsSocialiced((prev) => !prev);
  };

  const renderPost = ({ item }) => (
    <Image source={{ uri: item?.imageUrl }} style={ProfileStyles.gridImage} />
  );

  if (!profile) return null;

  return (
    <ScrollView style={ProfileStyles.container}>
      <View style={ProfileStyles.profileTop}>
        <Image
          source={{ uri: profile?.profilePic }}
          style={ProfileStyles.avatar}
        />
        <Text style={ProfileStyles.name}>{profile?.fullname}</Text>
        <Text style={ProfileStyles.username}>@{profile?.username}</Text>

        <View style={ProfileStyles.statsRow}>
          <View style={ProfileStyles.statBox}>
            <Text style={ProfileStyles.statValue}>{profile?.stats?.hammers}</Text>
            <Text style={ProfileStyles.statLabel}>🔨 Hammers</Text>
          </View>
          <View style={ProfileStyles.statBox}>
            <Text style={ProfileStyles.statValue}>{profile?.stats?.socialiced}</Text>
            <Text style={ProfileStyles.statLabel}>🧊 Socialiced</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[
            ProfileStyles.socialiceButton,
            isSocialiced && { backgroundColor: colors.successGreen },
          ]}
          onPress={toggleSocialice}
        >
          <Text style={ProfileStyles.buttonText}>
            {isSocialiced ? 'Socialiced' : 'Socialice?'}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={profile.posts}
        numColumns={GRID_COLUMNS}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={ProfileStyles.gridContainer}
      />
    </ScrollView>
  );
};

const ProfileStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.crystalWhite,
    flex: 1,
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

export default ProfileScreen;
