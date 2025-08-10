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
import { ProfileApi } from '../screens/api/GetApi';
import { sendSocialiceRequest } from '../screens/api/PostApi';
import ProfileStyles from '../utils/styles/ProfileStyles';
import mmkvStorage from '../utils/storage/MmkvStorage';

const GRID_COLUMNS = 3;

const ProfileComponent = ({ userId }) => {
  console.log('ProfileComponent userId:', userId);
  const navigation = useNavigation();
  const [profile, setProfile] = useState(null);
  const [isSocialiced, setIsSocialiced] = useState(null);

  const currentUserId = mmkvStorage.getItem('token')?.user?._id;

  useEffect(() => {
    let isMounted = true;
    ProfileApi(userId).then(response => {
      if (isMounted) {
        if (response?.success) {
          setProfile(response?.data?.data || {});
          setIsSocialiced(response?.data?.isSocialiced ?? null);
        } else {
          setProfile(null);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [userId],[]);

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const handleSocialice = async () => {
    if (isSocialiced === null || isSocialiced === false) {
      const res = await sendSocialiceRequest(currentUserId, userId);
      if (res.success) {
        setIsSocialiced(true);
      } else {
        console.log('Socialice request failed:', res.error);
      }
    }
  };

  const handleEdit = () => {
    //edit logic
  };

  const renderPost = ({ item }) => (
    <Image source={{ uri: item?.imageUrl }} style={ProfileStyles.gridImage} />
  );

  if (!profile) return null;

  return (
    <ScrollView style={ProfileStyles.container}>
          {userId === currentUserId?(<> <TouchableOpacity
        style={ProfileStyles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={ProfileStyles.logoutText}>Logout</Text>
      </TouchableOpacity></>):null}
     

      <View style={ProfileStyles.profileTop}>
        <Image
          source={{ uri: profile?.profilePic }}
          style={ProfileStyles.avatar}
        />
        <Text style={ProfileStyles.name}>{profile?.fullname}</Text>
        <Text style={ProfileStyles.username}>@{profile?.username}</Text>

        <View style={ProfileStyles.statsRow}>
          <View style={ProfileStyles.statBox}>
            <Text style={ProfileStyles.statValue}>
              {profile?.stats?.hammers}
            </Text>
            <Text style={ProfileStyles.statLabel}>🔨 Hammers</Text>
          </View>
          <View style={ProfileStyles.statBox}>
            <Text style={ProfileStyles.statValue}>
              {profile?.stats?.socialiced}
            </Text>
            <Text style={ProfileStyles.statLabel}>🧊 Socialiced</Text>
          </View>
        </View>

        {userId === currentUserId? (
          <TouchableOpacity
            style={ProfileStyles.socialiceButton}
            onPress={handleEdit}
          >
            <Text style={ProfileStyles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              ProfileStyles.socialiceButton,
              isSocialiced && { backgroundColor: colors.successGreen },
            ]}
            onPress={handleSocialice}
          >
            <Text style={ProfileStyles.buttonText}>
              {isSocialiced ? 'Socialiced' : 'Socialice?'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={profile.posts}
        numColumns={GRID_COLUMNS}
        renderItem={renderPost}
        keyExtractor={item => item.id}
        scrollEnabled={false}
        contentContainerStyle={ProfileStyles.gridContainer}
      />
    </ScrollView>
  );
};

export default ProfileComponent;
