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
  const navigation = useNavigation();
  const [profile, setProfile] = useState(null);
  const [isSocialiced, setIsSocialiced] = useState(null);

  const currentUserId = mmkvStorage.getItem('token')?.user?._id;

  const refetchProfile = async () => {
    try {
      const response = await ProfileApi(userId);
      if (response?.success) {
        setProfile(response?.data?.data || {});
        setIsSocialiced(response?.data?.isSocialiced ?? null);
      } else {
        setProfile(null);
      }
    } catch (error) {
      console.error('Error refetching profile:', error);
    }
  };

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
  }, [userId]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetchProfile();
    });

    return unsubscribe;
  }, [navigation, userId]);

  const handleLogout = () => {
    mmkvStorage.clearAll();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const handleSocialice = async () => {
    if (isSocialiced === null || isSocialiced === false) {
      const res = await sendSocialiceRequest(currentUserId, userId);
      if (res.success) {
        refetchProfile();
      } else {
        console.error('Failed to send Socialice request:', res.message);
      }
    }
  };

  const handleEdit = () => {
    navigation.navigate('ProfilePhotoUpdate');
  };

  const Message = userId => {
    navigation.navigate('MessageScreen', {
      userId: userId,
      name: profile?.username,
      avatar: profile?.profilePic,
    });
  };

  const renderPost = ({ item }) => (
    <Image source={{ uri: item?.imageUrl }} style={ProfileStyles.gridImage} />
  );

  const getSocialiceButtonProps = () => {
    switch (profile?.isSocialiced) {
      case null:
      case false:
        return {
          text: 'Socialice?',
          disabled: false,
          backgroundColor: ProfileStyles.socialiceButton.backgroundColor, // Default color
        };
      case true:
        return {
          text: 'Socialiced',
          disabled: true,
          backgroundColor: colors.successGreen,
        };
      case 'pending':
        return {
          text: 'Pending',
          disabled: true,
          backgroundColor: colors.slateGray || '#6B7280', // Gray color for pending
        };
      default:
        return {
          text: 'Socialice?',
          disabled: false,
          backgroundColor: ProfileStyles.socialiceButton.backgroundColor,
        };
    }
  };

  if (!profile) return null;

  const buttonProps = getSocialiceButtonProps();

  return (
    <ScrollView style={ProfileStyles.container}>
      {userId === currentUserId ? (
        <TouchableOpacity
          style={ProfileStyles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={ProfileStyles.logoutText}>Logout</Text>
        </TouchableOpacity>
      ) : null}

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

        {userId === currentUserId ? (
          <TouchableOpacity
            style={ProfileStyles.socialiceButton}
            onPress={handleEdit}
          >
            <Text style={ProfileStyles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        ) : (
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 10,
              }}
            >
              <TouchableOpacity
                style={[
                  ProfileStyles.socialiceButton,
                  {
                    backgroundColor: buttonProps.backgroundColor,
                    opacity: buttonProps.disabled ? 0.7 : 1,
                  },
                ]}
                onPress={buttonProps.disabled ? null : handleSocialice}
                disabled={buttonProps.disabled}
              >
                <Text style={ProfileStyles.buttonText}>{buttonProps.text}</Text>
              </TouchableOpacity>
              {profile?.isSocialiced == true ? (
                <TouchableOpacity
                  style={ProfileStyles.socialiceButton}
                  onPress={() => Message(userId)}
                >
                  <Text style={ProfileStyles.buttonText}>Message</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[
                    ProfileStyles.socialiceButton,
                    {
                      backgroundColor: colors.slateGray,
                    },
                  ]}
                  disabled={true}
                >
                  <Text style={ProfileStyles.buttonText}>Message</Text>
                </TouchableOpacity>
              )}
            </View>
          </>
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