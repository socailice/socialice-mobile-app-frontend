import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";

export default function CommentsScreen({ route }) {
  // Destructure postId, initialComments, and currentUser from route.params
  const { postId, comments: initialComments, currentUser } = route.params; 
  const [comments, setComments] = useState(initialComments); // Set initial state with passed comments
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  // You can still keep the fetch comments logic for refreshing if needed,
  // but let's initially use the data you already have.
  const getProfilePic = (url, username) => {
    if (!url || url.trim() === "" || url === "undefined" || url === "null") {
      const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        username || "User"
      )}&background=007AFF&color=fff&size=128`;
      return fallbackUrl;
    }
    try {
      new URL(url);
      return url;
    } catch {
      const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        username || "User"
      )}&background=007AFF&color=fff&size=128`;
      return fallbackUrl;
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const validProfilePic = getProfilePic(
      currentUser.profilePic,
      currentUser.username
    );
    
    const payload = {
      post_id: postId,
      user_id: currentUser._id,
      text: newComment.trim(),
      profilePic: validProfilePic,
      username: currentUser.username || "User",
    };

    try {
      setLoading(true);
      const response = await fetch("https://socialice-backend.onrender.com/socialice/posts/comment", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to add comment: Server responded with status ${response.status}. Error: ${errorText.substring(0, 100)}...`);
      }

      const data = await response.json();

      const newCommentObj = {
        _id: data._id,
        text: data.text,
        userDetails: {
          _id: data.userDetails._id,
          username: data.userDetails.username,
          profilePic: getProfilePic(
            data.userDetails.profilePic,
            data.userDetails.username
          ),
        },
        createdAt: data.createdAt,
      };
      
      setComments((prev) => [newCommentObj, ...prev]);
      setNewComment("");
    } catch (err) {
      console.error("Add comment failed:", err);
      Alert.alert("Error", err.message || "Failed to add comment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.commentBox}>
      <Text style={styles.username}>{item.userDetails?.username || "Unknown User"}</Text>
      <Text style={styles.commentText}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Comments</Text>
      </View>
      
      {loading && comments.length === 0 && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading comments...</Text>
        </View>
      )}
      
      <FlatList
        data={comments}
        keyExtractor={(item) => item._id?.toString() || Math.random().toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          !loading ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No comments yet. Be the first to comment!</Text>
            </View>
          ) : null
        }
      />
      
      <View style={styles.inputContainer}>
        <TextInput
          value={newComment}
          onChangeText={setNewComment}
          placeholder="Add a comment..."
          style={styles.input}
          multiline
          maxLength={500}
          editable={!loading}
        />
        <TouchableOpacity 
          onPress={handleAddComment} 
          style={[styles.button, { opacity: loading ? 0.6 : 1 }]}
          disabled={loading || !newComment.trim()}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Send</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "#f8f9fa",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
  },
  listContainer: {
    padding: 16,
    flexGrow: 1,
  },
  commentBox: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#007AFF",
  },
  username: {
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  commentText: {
    marginBottom: 4,
    lineHeight: 18,
    color: "#444",
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  emptyText: {
    color: "#666",
    fontStyle: "italic",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    maxHeight: 100,
    minHeight: 40,
  },
  button: {
    marginLeft: 12,
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: "center",
    minWidth: 60,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
});


//SAANVI