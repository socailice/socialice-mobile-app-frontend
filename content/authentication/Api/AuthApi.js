import API_CONFIG from "../../../settings";

export const login = async (phone, password) => {
  try {
    const response = await fetch(API_CONFIG.BASE_URL + "/socialice/auth/login", {
      method: 'POST',
      headers: API_CONFIG.HEADERS,
      body: JSON.stringify({
        username: phone,
        password: password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        data: data,
      };
    } else {
      return {
        success: false,
        error: data?.message || 'Login failed',
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error?.message || 'Network error',
    };
  }
};

export const signup = async (fullname, username, password, phone) => {
  try {
    const url = API_CONFIG.BASE_URL + "/socialice/auth/register";
    const response = await fetch(url, {
      method: 'POST',
      headers: API_CONFIG.HEADERS,
      body: JSON.stringify({
        fullname,
        username,
        phone: Number(phone),
        password,
      }),
    });


    let data;
    try {
      data = await response.json(); 
    } catch (jsonError) {
      const text = await response.text(); 
      console.error("Error parsing JSON:", jsonError);
      return {
        success: false,
        error: text || 'Signup failed (invalid response)',
      };
    }

    if (response.ok) {
      return {
        success: true,
        data,
      };
    } else {
      return {
        success: false,
        error: data?.message || 'Signup failed',
      };
    }
  } catch (error) {
    console.error("Network error:", error);
    return {
      success: false,
      error: error?.message || 'Network error',
    };
  }
};
