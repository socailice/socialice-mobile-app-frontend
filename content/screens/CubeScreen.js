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

export default CubeScreen = () => {
  const [cubeData, setCubeData] = useState({ totalCubes: 0, cubeRequests: [] });
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const data = cubes();
    setCubeData(data);
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = searchCubes(searchQuery);
      setSearchResults(results.results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const requestDate = new Date(dateString);
    const diffInHours = Math.floor((now - requestDate) / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      return `${diffInDays}d ago`;
    } else {
      return `${diffInHours}h ago`;
    }
  };

  const getInitials = (username) => {
    return username.charAt(0).toUpperCase();
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
    <View style={styles.requestItem}>
      <View style={styles.leftSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{getInitials(item.username)}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.mutualCubes}>
            {item.mutualCubes} mutual cubes{isSearchResult ? '' : ` · ${formatTimeAgo(item.requestedAt)}`}
          </Text>
        </View>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.acceptButton}
          onPress={() => handleAcceptRequest(item._id || item._Id)}
        >
          <Text style={styles.checkMark}>✓</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rejectButton}
          onPress={() => handleRejectRequest(item._id || item._Id)}
        >
          <Text style={styles.xMark}>×</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSearchResult = ({ item }) => renderRequestItem({ item, isSearchResult: true });

  if (isSearchMode) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.icyBlue} />
        
        <View style={styles.searchHeader}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackToMain}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholder="Search cubes"
            placeholderTextColor={colors.slateGray}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
        </View>

        <View style={styles.searchResults}>
          <FlatList
            data={searchResults}
            renderItem={renderSearchResult}
            keyExtractor={(item) => item._Id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.icyBlue} />
      
      <View style={styles.header}>
        <View style={{height:250, width:290 ,justifyContent:'center',alignItems:'center', backgroundColor:colors.iceBlue, borderRadius:30}}>
        <Text style={styles.totalCubesNumber}>{cubeData.totalCubes}</Text>
        <Text style={styles.totalCubesLabel}>Total Cubes</Text>
        
        <TouchableOpacity style={styles.findCubesButton} onPress={handleFindCubes}>
          <Text style={styles.findCubesText}>🔍 Find Cubes</Text>
        </TouchableOpacity>
        </View>
      </View>

      <View style={styles.requestsSection}>
        <View style={styles.requestsHeader}>
          <Text style={styles.requestsTitle}>Cube Requests</Text>
          <Text style={styles.requestsCount}>{cubeData.cubeRequests.length}</Text>
        </View>
        
        <FlatList
          data={cubeData.cubeRequests}
          renderItem={renderRequestItem}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteText,
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    justifyContent:'center',
    alignItems:'center',
  },
  totalCubesNumber: {
    fontSize: 64,
    fontWeight: 'bold',
    color: colors.frostBlue,
    marginBottom: 8,
  },
  totalCubesLabel: {
    fontSize: 16,
    color: colors.slateGray,
    marginBottom: 30,
  },
  findCubesButton: {
    backgroundColor: colors.frostBlue,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  findCubesText: {
    color: colors.whiteText,
    fontSize: 16,
    fontWeight: '600',
  },
  requestsSection: {
    flex: 1,
    backgroundColor: colors.snowWhite,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
  },
  requestsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  requestsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primaryText,
  },
  requestsCount: {
    fontSize: 16,
    color: colors.frostBlue,
    fontWeight: '600',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  requestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.icyGray,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.frostBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: colors.whiteText,
    fontSize: 18,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primaryText,
    marginBottom: 4,
  },
  mutualCubes: {
    fontSize: 14,
    color: colors.slateGray,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  acceptButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.frostBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rejectButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.icyGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkMark: {
    color: colors.whiteText,
    fontSize: 18,
    fontWeight: 'bold',
  },
  xMark: {
    color: colors.slateGray,
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: colors.icyBlue,
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  backArrow: {
    fontSize: 24,
    color: colors.frostBlue,
    fontWeight: 'bold',
  },
  searchInput: {
    flex: 1,
    backgroundColor: colors.snowWhite,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    fontSize: 16,
    color: colors.primaryText,
  },
  searchResults: {
    flex: 1,
    backgroundColor: colors.snowWhite,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
  },
});