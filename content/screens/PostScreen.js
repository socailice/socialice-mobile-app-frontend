import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';

// App palette
const colors = {
  icyBlue: '#E8F4F8',
  glacierBlue: '#B8D4E3',
  frostBlue: '#7FB3D3',
  arcticBlue: '#4A90A4',
  deepIce: '#2C5F73',
  darkDeepIce: '#3b6f84ff',
  snowWhite: '#FFFFFF',
  crystalWhite: '#F8FBFC',
  icyGray: '#E1E8ED',
  slateGray: '#8DA2AE',
  charcoal: '#2F3E46',
  penguinOrange: '#FF8C42',
  warmOrange: '#FF7A2D',
  softMint: '#A8E6CF',
  iceBlue: '#D4F1F4',
  errorRed: '#E74C3C',
  successGreen: '#52C4B0',
  warningYellow: '#F39C12',
  primaryText: '#2F3E46',
  secondaryText: '#657786',
  placeholderText: 'grey',
  whiteText: '#FFFFFF',
  shadowColor: 'rgba(47, 62, 70, 0.1)',
  overlayColor: 'rgba(47, 62, 70, 0.3)',
};

const { width } = Dimensions.get('window');
const PREVIEW_HEIGHT = width;
const GRID_COLUMNS = 4;
const ITEM_SIZE = width / GRID_COLUMNS;

const fakeImages = Array.from({ length: 24 }).map((_, i) => ({
  id: i.toString(),
  uri: `https://placeimg.com/640/640/any?${i}`,
}));

const PostScreen = () => {
  const [selectedImage, setSelectedImage] = useState(fakeImages[0]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedImage(item)}>
      <Image source={{ uri: item.uri }} style={styles.thumbnail} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>New Post</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.postButton}>Post</Text>
        </TouchableOpacity>
      </View>

      {/* Preview Area */}
      <Image source={{ uri: selectedImage.uri }} style={styles.preview} />

      {/* Gallery Label */}
      <View style={styles.galleryHeader}>
        <Text style={styles.galleryLabel}>Gallery</Text>
      </View>

      {/* Grid of Images */}
      <FlatList
        data={fakeImages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={GRID_COLUMNS}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.snowWhite,
  },
  header: {
    height: 50,
    backgroundColor: colors.icyBlue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    borderBottomColor: colors.icyGray,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    color: colors.primaryText,
    fontWeight: '600',
  },
  postButton: {
    fontSize: 16,
    color: colors.arcticBlue,
    fontWeight: 'bold',
  },
  preview: {
    width: width,
    height: PREVIEW_HEIGHT,
    backgroundColor: colors.icyGray,
  },
  galleryHeader: {
    padding: 10,
    borderBottomColor: colors.icyGray,
    borderBottomWidth: 1,
    backgroundColor: colors.crystalWhite,
  },
  galleryLabel: {
    fontSize: 16,
    color: colors.secondaryText,
  },
  grid: {
    paddingBottom: 80,
  },
  thumbnail: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
  },
});

export default PostScreen;
