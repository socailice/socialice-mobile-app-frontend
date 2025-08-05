export const uploadImage = async (imageUri) => {
  const cloudName = 'datvcvlcd';        
  const uploadPreset = 'Socialice';    

  if (!imageUri) {
    throw new Error('No image URI provided');
  }

  const formData = new FormData();
  formData.append('file', {
    uri: imageUri,
    name: 'upload.jpg',
    type: 'image/jpeg',
  });
  formData.append('upload_preset', uploadPreset);

  try {
    console.log('Starting upload to Cloudinary...');
    
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Upload result:', result);

    if (result.error) {
      const errorMessage = typeof result.error === 'string' 
        ? result.error 
        : result.error.message || 'Upload failed';
      throw new Error(errorMessage);
    }

    if (!result.secure_url) {
      throw new Error('No secure URL returned from Cloudinary');
    }

    return result.secure_url;
    
  } catch (error) {
    console.error('Cloudinary upload error:', error);

    if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error('Network error. Please check your connection and try again.');
    }
  }
};