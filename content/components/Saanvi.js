import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../utils/styles/colors';
import { 
  ProfileApi, 
  sendSocialiceRequest, 
  cancelSocialiceRequest 
} from '../screens/api/GetApi';
import ProfileStyles from '../utils/styles/ProfileStyles';  
import mmkvStorage from '../utils/storage/MmkvStorage';

const GRID_COLUMNS = 3;

const ProfileComponent = ({ userId }) => {
  const navigation = useNavigation();
  const currentUserId = mmkvStorage.getItem('token')?.user?._id;
  const [profile, setProfile] = useState(null);
  const [isSocialiced, setIsSocialiced] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const isOwnProfile = userId === currentUserId;

  useEffect(() => {
    let isMounted = true;
    ProfileApi(userId).then((response) => {
      if (isMounted) {
        if (response?.success) {
          setProfile(response?.data || {});
          setIsSocialiced(response?.data?.isSocialiced);
        } else {
          setProfile(null);
        }
      }
    });
    return () => { isMounted = false; };
  }, [userId]);

  const handleSocialiceAction = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      let response;
      
      if (isSocialiced === null || isSocialiced === false) {
        // Send request
        response = await sendSocialiceRequest(currentUserId, userId);
        if (response.success) {
          setIsSocialiced("pending");
        } else {
          Alert.alert("Error", response.error || "Failed to send request");
        }
      } else if (isSocialiced === "pending") {
        // Cancel request
        response = await cancelSocialiceRequest(currentUserId, userId);
        if (response.success) {
          setIsSocialiced(null);
        } else {
          Alert.alert("Error", response.error || "Failed to cancel request");
        }
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
      console.error("Socialice action error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSocialiceButtonText = () => {
    if (isLoading) return "...";
    
    switch (isSocialiced) {
      case null:
      case false:
        return "Socialice?";
      case "pending":
        return "Requested";
      case true:
        return "Socialiced";
      default:
        return "Socialice?";
    }
  };

  const getSocialiceButtonStyle = () => {
    const baseStyle = ProfileStyles.socialiceButton;
    
    switch (isSocialiced) {
      case true:
        return [baseStyle, { backgroundColor: colors.successGreen }];
      case "pending":
        return [baseStyle, { backgroundColor: colors.slateGray }];
      default:
        return baseStyle;
    }
  };

  const isSocialiceButtonDisabled = () => {
    return isLoading || isSocialiced === true;
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

        {!isOwnProfile && (
          <TouchableOpacity
            style={getSocialiceButtonStyle()}
            onPress={handleSocialiceAction}
            disabled={isSocialiceButtonDisabled()}
          >
            <Text style={ProfileStyles.buttonText}>
              {getSocialiceButtonText()}
            </Text>
          </TouchableOpacity>
        )}
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

export default ProfileComponent;