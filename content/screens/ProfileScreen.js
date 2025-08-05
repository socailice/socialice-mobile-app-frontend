import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../utils/styles/colors';
import { ProfileApi } from './api/GetApi';
import ProfileStyles from '../utils/styles/ProfileStyles';  

const GRID_COLUMNS = 3;


const ProfileScreen = () => {
  const navigation = useNavigation();
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

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const renderPost = ({ item }) => (
    <Image source={{ uri: item?.imageUrl }} style={ProfileStyles.gridImage} />
  );

  if (!profile) return null;

  return (
    <ScrollView style={ProfileStyles.container}>
      <TouchableOpacity style={ProfileStyles.logoutButton} onPress={handleLogout}>
        <Text style={ProfileStyles.logoutText}>Logout</Text>
      </TouchableOpacity>

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


export default ProfileScreen;