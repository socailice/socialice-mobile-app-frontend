import axios from 'axios';
import API_CONFIG from '../../../settings';

export async function globalFeed() {
  try {
    const response = await axios.get(`${API_CONFIG.BASE_URL}/socialice/posts/posts/paginated`);
    return response.data;
  } catch (error) {
    console.error(" Error fetching global feed:", error);

    return {
      success: false,
      message: "Failed to fetch global feed",
      data: []
    };
  }
}



export async function cubes(userId) {
  try {
    const response = await axios.get(
      `${API_CONFIG.BASE_URL}/socialice/cubes/dashboard/${userId}`,
      { params: { user_id: userId } }
    );
    return response?.data;
    
  } catch (error) {
    console.error("Error fetching cubes dashboard:", error);
    return { totalCubes: 0, cubeRequests: [] };
  }
}


export async function searchCubes(query, userId) {
  try {
    const response = await axios.get(
      `${API_CONFIG.BASE_URL}/socialice/cubes/search`,
      { params: { query, user_id: userId } }
    );
    return response?.data?.results || [];
  } catch (error) {
    console.error("Error searching cubes:", error);
    return { results: [] };
  }
}


export async function ProfileApi(userId) {
  if (!userId) {
    return {
      success: false,
      message: 'No userId provided',
      data: null,
    };
  }
  try {
    const response = await axios.get(
      `${API_CONFIG.BASE_URL}/socialice/profile/profile/${userId}`
    );
    return {
      success: true,
      message: 'Profile fetched successfully',
      data: response.data,
    };
  } catch (error) {
    console.error('Error fetching profile:', error);
    return {
      success: false,
      message: 'Failed to fetch profile',
      data: null,
    };
  }
}

export function ChatScreenApi(){
  return{
    success: true,
    message: 'Chat data fetched successfully',
    data: [
      {
        id: '1',
        name: 'Alice Johnson',
        lastMessage: 'See you tomorrow!',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
      {
        id: '2',
        name: 'Bob Smith',
        lastMessage: 'Got it!',
        avatar: 'https://i.pravatar.cc/150?img=2',
      },
      {
        id: '3',
        name: 'Charlie Evans',
        lastMessage: 'Let’s meet soon.',
        avatar: 'https://i.pravatar.cc/150?img=3',
      },
    ]
  }
}  