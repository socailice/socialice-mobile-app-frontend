import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { cubes, searchCubes } from './api/GetApi';
import CubeStyles from '../utils/styles/CubeStyles';
import colors from '../utils/styles/colors';
import mmkvStorage from '../utils/storage/MmkvStorage';
import {cancelSocialiceRequest, respondToSocialiceRequest} from './api/PostApi';

const CubeScreen = () => {
  const userId = mmkvStorage.getItem('token')?.user?._id;
  const [cubeData, setCubeData] = useState({ totalCubes: 0, cubeRequests: [] });
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [processingRequests, setProcessingRequests] = useState(new Set());
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchCubes() {
      const data = await cubes(userId);
      setCubeData(data || { totalCubes: 0, cubeRequests: [] });
    }
    fetchCubes();
  }, [userId]);

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
    navigation.navigate('CubeProfile', { userId });
  };

  // Remove request from local state after successful API call
  const removeRequestFromState = (requestUserId) => {
    setCubeData(prevData => ({
      ...prevData,
      cubeRequests: prevData.cubeRequests.filter(
        request => (request._id || request._Id) !== requestUserId
      )
    }));
  };

  const handleAcceptRequest = async (toUserId) => {
    // Prevent multiple clicks
    if (processingRequests.has(toUserId)) {
      return;
    }
    
    setProcessingRequests(prev => new Set(prev).add(toUserId));
    
    try {
      const result = await respondToSocialiceRequest(
        toUserId, 
        userId, 
        true 
      );
      
      if (result.success) {
        // Remove request from UI immediately
        removeRequestFromState(toUserId);
        
        Alert.alert('Success', 'Cube request accepted!');
      } else {
        Alert.alert('Error', result.error || 'Failed to accept request');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error occurred');
    } finally {
      setProcessingRequests(prev => {
        const newSet = new Set(prev);
        newSet.delete(toUserId);
        return newSet;
      });
    }
  };

  const handleRejectRequest = async (toUserId) => {
  
    
    try {
      const result = await cancelSocialiceRequest(
        toUserId,
        userId
      );
      
      if (result.success) {
        // Remove request from UI immediately
        removeRequestFromState(toUserId);
        
        Alert.alert('Success', 'Cube request rejected!');
      } else {
        Alert.alert('Error', result.error || 'Failed to reject request');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error occurred');
    } finally {
      setProcessingRequests(prev => {
        const newSet = new Set(prev);
        newSet.delete(toUserId);
        return newSet;
      });
    }
  };

  const renderRequestItem = ({ item }) => {
    const itemId = item?._id || item?._Id;
    const isProcessing = processingRequests.has(itemId);
    
    return (
      <View style={CubeStyles.requestItem}>
        <TouchableOpacity
          style={CubeStyles.leftSection}
          onPress={() => handleUserPress(itemId)}
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
            onPress={() => handleAcceptRequest(itemId)}
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
            onPress={() => handleRejectRequest(itemId)}
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