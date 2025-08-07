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


export function cubes() {   
  return {   
    "totalCubes": 127,   
    "cubeRequests": [     
      {       
        "_id": "usr_234ad",
        "username": "Alex_Frost",       
        "mutualCubes": 12,       
        "requestedAt": "2025-07-18T15:12:00Z"     
      },     
      {       
        "_id": "usr_349ac",
        "username": "Winter_Dreams",       
        "mutualCubes": 8,       
        "requestedAt": "2025-07-18T12:10:00Z"     
      },     
      {       
        "_id": "usr_654aa",
        "username": "Crystal_Heart",       
        "mutualCubes": 15,       
        "requestedAt": "2025-07-17T09:00:00Z"     
      }   
    ] 
  }; 
}   


export function searchCubes(query = '') {
  const allUsers = [
    { "_Id": "usr_001", "username": "Crystal_Heart", "mutualCubes": 15 },
    { "_Id": "usr_002", "username": "CrystallineSoul", "mutualCubes": 3 },
    { "_Id": "usr_003", "username": "IcyDreamer", "mutualCubes": 8 },
    { "_Id": "usr_004", "username": "FrostBite", "mutualCubes": 22 },
    { "_Id": "usr_005", "username": "WinterWonder", "mutualCubes": 7 },
    { "_Id": "usr_006", "username": "SnowFlake", "mutualCubes": 18 },
    { "_Id": "usr_007", "username": "GlacialMind", "mutualCubes": 11 },
    { "_Id": "usr_008", "username": "ArcticSoul", "mutualCubes": 25 },
    { "_Id": "usr_009", "username": "BlizzardHeart", "mutualCubes": 6 },
    { "_Id": "usr_010", "username": "ChilledVibes", "mutualCubes": 14 }
  ];

  if (!query || query.trim() === '') {
    return { "results": [] };
  }
  
  const filteredUsers = allUsers.filter(user => 
    user.username.toLowerCase().includes(query.toLowerCase())
  );
  
  return { "results": filteredUsers };
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