import API_CONFIG from "../../../settings";

export const createPost = async (userId, mediaUrl, caption) => {
  console.log("Creating post with:", { userId, mediaUrl, caption });
  try {
    const response = await fetch(API_CONFIG.BASE_URL + "/socialice/posts/post", {
      method: "POST",
      headers: API_CONFIG.HEADERS,
      body: JSON.stringify({
        userId,
        mediaUrl,
        mediaType: "image",
        caption,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data?.message || "Post creation failed" };
    }
  } catch (error) {
    return { success: false, error: error?.message || "Network error" };
  }
};

export const hammerPost = async (postId, username, action = "add") => {
  try {
    const response = await fetch(API_CONFIG.BASE_URL + "/socialice/posts/hammer", {
      method: "POST",
      headers: API_CONFIG.HEADERS,
      body: JSON.stringify({
        post_id: postId,
        username: username,
        action: action,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data?.message || "Hammer action failed" };
    }
  } catch (error) {
    return { success: false, error: error?.message || "Network error" };
  }
};

export const sendSocialiceRequest = async (fromUserId, toUserId) => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/socialice/cubes/request`, {
      method: "POST",
      headers: API_CONFIG.HEADERS,
      body: JSON.stringify({
        from_user_id: fromUserId,
        to_user_id: toUserId,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data?.message || "Request failed" };
    }
  } catch (error) {
    return { success: false, error: error?.message || "Network error" };
  }
};

export const cancelSocialiceRequest = async (fromUserId, toUserId) => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/socialice/cubes/cancel`, {
      method: "POST",
      headers: API_CONFIG.HEADERS,
      body: JSON.stringify({
        from_user_id: fromUserId,
        to_user_id: toUserId,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data?.message || "Cancel failed" };
    }
  } catch (error) {
    return { success: false, error: error?.message || "Network error" };
  }
};

export const respondToSocialiceRequest = async (fromUserId, toUserId, accepted) => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/socialice/cubes/respond`, {
      method: "POST",
      headers: API_CONFIG.HEADERS,
      body: JSON.stringify({
        from_user_id: fromUserId,
        to_user_id: toUserId,
        accepted: accepted,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data?.message || "Response failed" };
    }
  } catch (error) {
    return { success: false, error: error?.message || "Network error" };
  }
};