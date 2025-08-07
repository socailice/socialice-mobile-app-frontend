import API_CONFIG from "../../../settings";

export const createPost = async (userId, mediaUrl, caption) => {
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
