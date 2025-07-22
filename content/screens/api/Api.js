const globalFeed = () => {
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
      // ...other posts
    ]
  };
};

export default globalFeed;
