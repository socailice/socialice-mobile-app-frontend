import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { cubes, searchCubes } from './api/GetApi';
import CubeStyles from '../utils/styles/CubeStyles';
import colors from '../utils/styles/colors';
import mmkvStorage from '../utils/storage/MmkvStorage';

const CubeScreen = () => {
  const userId = mmkvStorage.getItem('token')?.user?._id;
  const [cubeData, setCubeData] = useState({ totalCubes: 0, cubeRequests: [] });
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
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
    navigation.navigate('Profile', { userId });
  };

  const handleAcceptRequest = (userId) => {
    // Accept logic here
  };

  const handleRejectRequest = (userId) => {
    // Reject logic here
  };

  // Request item with accept/reject buttons
  const renderRequestItem = ({ item }) => (
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
          style={CubeStyles.acceptButton}
          onPress={() => handleAcceptRequest(item?._id || item?._Id)}
        >
          <Text style={CubeStyles.checkMark}>✓</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={CubeStyles.rejectButton}
          onPress={() => handleRejectRequest(item?._id || item?._Id)}
        >
          <Text style={CubeStyles.xMark}>×</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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