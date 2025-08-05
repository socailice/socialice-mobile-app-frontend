export function globalFeed() {

    return {
        success: true,
        message: "Global feed fetched successfully",
        data: [
            {
                _id: "post123",
        imageUrl: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500",
        caption: "Just chilling with my new sunglasses 😎 #CoolCat #SunglassesLife",
        createdAt: "2025-07-17T14:30:00Z",
        user: {
          _id: "user456",
          username: "Kush",
          profilePic: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
        },
        hammers: {
          count: 35,
          hammeredByCurrentUser: true
        },
        comments: [
          {
            _id: "comment789",
            text: "That's one cool cat! 🔥",
            userDetails: {
              _id: "123456",
              username: "neoncat",
              profilePic: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150"
            },
            createdAt: "2025-07-17T14:35:00Z"
          },
          {
            _id: "comment790",
            text: "Love those sunglasses!",
            userDetails: {
              _id: "123457",
              username: "fashionista",
              profilePic: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
            },
            createdAt: "2025-07-17T14:40:00Z"
          }
        ]
      },
      {
        _id: "post124",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
        caption: "My backyard garden is finally looking amazing! 🌿 Spring vibes are here",
        createdAt: "2025-07-17T13:15:00Z",
        user: {
          _id: "user457",
          username: "Ashish",
          profilePic: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
        },
        hammers: {
          count: 42,
          hammeredByCurrentUser: false
        },
        comments: [
          {
            _id: "comment791",
            text: "Goals! Your garden is beautiful 😍",
            userDetails: {
              _id: "123458",
              username: "plantsparent",
              profilePic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
            },
            createdAt: "2025-07-17T13:20:00Z"
          }
        ]
      },
      {
        _id: "post125",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500",
        caption: "Mountain vibes hitting different today ⛰️ #NaturalTherapy",
        createdAt: "2025-07-17T12:45:00Z",
        user: {
          _id: "user458",
          username: "mountainlover",
          profilePic: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"
        },
        hammers: {
          count: 128,
          hammeredByCurrentUser: true
        },
        comments: [
          {
            _id: "comment792",
            text: "Breathtaking view! 🏔️",
            userDetails: {
              _id: "123459",
              username: "adventurer",
              profilePic: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
            },
            createdAt: "2025-07-17T12:50:00Z"
          },
          {
            _id: "comment793",
            text: "I need to visit this place!",
            userDetails: {
              _id: "123460",
              username: "traveladdict",
              profilePic: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150"
            },
            createdAt: "2025-07-17T13:00:00Z"
          }
        ]
      }
    ]

  };
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



export function ProfileApi(){
  return{
  success: true,
  message: 'Profile fetched successfully',
  data: {
    _Id: '12345',
    username: 'social_alice',
    fullname: 'Kush',
    profilePic: 'https://picsum.photos/200',
    isSocialiced: false,
    stats: {
      socialiced: 208,
      hammers: 365,
    },
    posts: [
      { id: 'post_001', imageUrl: 'https://picsum.photos/201' },
      { id: 'post_002', imageUrl: 'https://picsum.photos/202' },
      { id: 'post_003', imageUrl: 'https://picsum.photos/203' },
      { id: 'post_004', imageUrl: 'https://picsum.photos/204' },
      { id: 'post_005', imageUrl: 'https://picsum.photos/205' },
      { id: 'post_006', imageUrl: 'https://picsum.photos/206' },
    ],
  },
}};



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