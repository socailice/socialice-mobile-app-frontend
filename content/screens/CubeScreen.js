import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
  TextInput,
} from 'react-native';
import { cubes, searchCubes } from './api/Api';
import colors from '../utils/styles/colors';
import CubeStyles from '../utils/styles/CubeStyles';

export default CubeScreen = () => {
  const [cubeData, setCubeData] = useState({ totalCubes: 0, cubeRequests: [] });
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const data = cubes();
    setCubeData(data || { totalCubes: 0, cubeRequests: [] });
  }, []);

  useEffect(() => {
    if (searchQuery?.trim()) {
      const results = searchCubes(searchQuery);
      setSearchResults(results?.results || []);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const formatTimeAgo = (dateString) => {
    if (!dateString) return '';
    
    try {
      const now = new Date();
      const requestDate = new Date(dateString);
      const diffInHours = Math.floor((now - requestDate) / (1000 * 60 * 60));
      const diffInDays = Math.floor(diffInHours / 24);

      if (diffInDays > 0) {
        return `${diffInDays}d ago`;
      } else {
        return `${diffInHours}h ago`;
      }
    } catch (error) {
      console.warn('Error formatting date:', error);
      return '';
    }
  };

  const getInitials = (username) => {
    return username?.charAt(0)?.toUpperCase() || '?';
  };

  const handleFindCubes = () => {
    setIsSearchMode(true);
  };

  const handleBackToMain = () => {
    setIsSearchMode(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleAcceptRequest = (userId) => {
    console.log('Accept request for user:', userId);
  };

  const handleRejectRequest = (userId) => {
    console.log('Reject request for user:', userId);
  };

  const renderRequestItem = ({ item, isSearchResult = false }) => (
    <View style={CubeStyles.requestItem}>
      <View style={CubeStyles.leftSection}>
        <View style={CubeStyles.avatar}>
          <Text style={CubeStyles.avatarText}>{getInitials(item?.username)}</Text>
        </View>
        <View style={CubeStyles.userInfo}>
          <Text style={CubeStyles.username}>{item?.username || 'Unknown'}</Text>
          <Text style={CubeStyles.mutualCubes}>
            {item?.mutualCubes || 0} mutual cubes{isSearchResult ? '' : ` · ${formatTimeAgo(item?.requestedAt)}`}
          </Text>
        </View>
      </View>
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

  const renderSearchResult = ({ item }) => renderRequestItem({ item, isSearchResult: true });

  if (isSearchMode) {
    return (
      <SafeAreaView style={CubeStyles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors?.icyBlue} />
        
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
            renderItem={renderSearchResult}
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
      <StatusBar barStyle="dark-content" backgroundColor={colors?.icyBlue} />
      
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
