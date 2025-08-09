import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { cubes, searchCubes, respondToSocialiceRequest } from './api/GetApi';
import CubeStyles from '../utils/styles/CubeStyles';
import colors from '../utils/styles/colors';
import mmkvStorage from '../utils/storage/MmkvStorage';

const CubeScreen = () => {
  const userId = mmkvStorage.getItem('token')?.user?._id;
  const [cubeData, setCubeData] = useState({ totalCubes: 0, cubeRequests: [] });
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [processingRequests, setProcessingRequests] = useState(new Set());
  const navigation = useNavigation();

  // Fetch cubes data function
  const fetchCubesData = useCallback(async () => {
    try {
      const data = await cubes(userId);
      setCubeData(data || { totalCubes: 0, cubeRequests: [] });
    } catch (error) {
      console.error('Error fetching cubes:', error);
    }
  }, [userId]);

  useEffect(() => {
    async function fetchCubes() {
      const data = await cubes(userId);
      setCubeData(data || { totalCubes: 0, cubeRequests: [] });
    }
    fetchCubes();
  }, [userId]);

  // Refetch when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchCubesData();
    }, [fetchCubesData])
  );

  useEffect(() => {
    async function fetchSearchResults() {
      if (searchQuery.trim()) {
        const results = await searchCubes(searchQuery, userId);
        setSearchResults(results || []);
      } else {
        setSearchResults([]);
      }
    }
    fetchSearchResults();
  }, [searchQuery, userId]);

  const handleFindCubes = () => setIsSearchMode(true);
  
  const handleBackToMain = () => {
    setIsSearchMode(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleUserPress = (userId) => {
    navigation.navigate('Profile', { userId });
  };

  const handleAcceptRequest = async (requestUserId) => {
    if (processingRequests.has(requestUserId)) return;
    
    setProcessingRequests(prev => new Set(prev).add(requestUserId));
    
    try {
      const response = await respondToSocialiceRequest(requestUserId, userId, true);
      
      if (response.success) {
        // Remove request from the list immediately
        setCubeData(prevData => ({
          ...prevData,
          cubeRequests: prevData.cubeRequests.filter(
            request => request._id !== requestUserId
          )
        }));
        
        // Refetch to get updated data
        await fetchCubesData();
      } else {
        Alert.alert("Error", response.error || "Failed to accept request");
      }
    } catch (error) {
      console.error('Accept request error:', error);
      Alert.alert("Error", "Something went wrong");
    } finally {
      setProcessingRequests(prev => {
        const newSet = new Set(prev);
        newSet.delete(requestUserId);
        return newSet;
      });
    }
  };

  const handleRejectRequest = async (requestUserId) => {
    if (processingRequests.has(requestUserId)) return;
    
    setProcessingRequests(prev => new Set(prev).add(requestUserId));
    
    try {
      const response = await respondToSocialiceRequest(requestUserId, userId, false);
      
      if (response.success) {
        // Remove request from the list immediately
        setCubeData(prevData => ({
          ...prevData,
          cubeRequests: prevData.cubeRequests.filter(
            request => request._id !== requestUserId
          )
        }));
        
        // Refetch to get updated data
        await fetchCubesData();
      } else {
        Alert.alert("Error", response.error || "Failed to reject request");
      }
    } catch (error) {
      console.error('Reject request error:', error);
      Alert.alert("Error", "Something went wrong");
    } finally {
      setProcessingRequests(prev => {
        const newSet = new Set(prev);
        newSet.delete(requestUserId);
        return newSet;
      });
    }
  };

  // Request item with accept/reject buttons
  const renderRequestItem = ({ item }) => {
    const isProcessing = processingRequests.has(item._id);
    
    return (
      <View style={CubeStyles.requestItem}>
        <TouchableOpacity
          style={CubeStyles.leftSection}
          onPress={() => handleUserPress(item?._id || item?._Id)}
          activeOpacity={0.7}
        >
          <View style={CubeStyles.avatar}>
            <Text style={CubeStyles.avatarText}>
              {item?.username?.charAt(0)?.toUpperCase() || '?'}
            </Text>
          </View>
          <View style={CubeStyles.userInfo}>
            <Text style={CubeStyles.username}>{item?.username || 'Unknown'}</Text>
            <Text style={CubeStyles.mutualCubes}>
              {item?.mutualCubes || 0} mutual cubes
            </Text>
          </View>
        </TouchableOpacity>
        <View style={CubeStyles.actionButtons}>
          <TouchableOpacity
            style={[
              CubeStyles.acceptButton,
              isProcessing && { opacity: 0.5 }
            ]}
            onPress={() => handleAcceptRequest(item?._id || item?._Id)}
            disabled={isProcessing}
          >
            <Text style={CubeStyles.checkMark}>
              {isProcessing ? '...' : '✓'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              CubeStyles.rejectButton,
              isProcessing && { opacity: 0.5 }
            ]}
            onPress={() => handleRejectRequest(item?._id || item?._Id)}
            disabled={isProcessing}
          >
            <Text style={CubeStyles.xMark}>
              {isProcessing ? '...' : '×'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Search result item without accept/reject buttons
  const renderSearchResultItem = ({ item }) => (
    <View style={CubeStyles.requestItem}>
      <TouchableOpacity
        style={CubeStyles.leftSection}
        onPress={() => handleUserPress(item?._id || item?._Id)}
        activeOpacity={0.7}
      >
        <View style={CubeStyles.avatar}>
          <Text style={CubeStyles.avatarText}>
            {item?.username?.charAt(0)?.toUpperCase() || '?'}
          </Text>
        </View>
        <View style={CubeStyles.userInfo}>
          <Text style={CubeStyles.username}>{item?.username || 'Unknown'}</Text>
          <Text style={CubeStyles.mutualCubes}>
            {item?.mutualCubes || 0} mutual cubes
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  if (isSearchMode) {
    return (
      <SafeAreaView style={CubeStyles.container}>
        <View style={CubeStyles.searchHeader}>
          <TouchableOpacity style={CubeStyles.backButton} onPress={handleBackToMain}>
            <Text style={CubeStyles.backArrow}>←</Text>
          </TouchableOpacity>
          <TextInput
            style={CubeStyles.searchInput}
            placeholder="Search cubes"
            placeholderTextColor={colors?.slateGray}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
        </View>
        <View style={CubeStyles.searchResults}>
          <FlatList
            data={searchResults || []}
            renderItem={renderSearchResultItem}
            keyExtractor={(item) => item?._Id || item?._id || Math.random().toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={CubeStyles.listContainer}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={CubeStyles.container}>
      <View style={CubeStyles.header}>
        <View style={CubeStyles.card}>
          <Text style={CubeStyles.totalCubesNumber}>{cubeData?.totalCubes || 0}</Text>
          <Text style={CubeStyles.totalCubesLabel}>Total Cubes</Text>
          <TouchableOpacity style={CubeStyles.findCubesButton} onPress={handleFindCubes}>
            <Text style={CubeStyles.findCubesText}>Find Cubes</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={CubeStyles.requestsSection}>
        <View style={CubeStyles.requestsHeader}>
          <Text style={CubeStyles.requestsTitle}>Cube Requests</Text>
          <Text style={CubeStyles.requestsCount}>{cubeData?.cubeRequests?.length || 0}</Text>
        </View>
        <FlatList
          data={cubeData?.cubeRequests || []}
          renderItem={renderRequestItem}
          keyExtractor={(item) => item?._id || Math.random().toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={CubeStyles.listContainer}
        />
      </View>
    </SafeAreaView>
  );
};

export default CubeScreen;