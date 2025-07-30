import API_CONFIG from "../../../settings";

export const login = async (phone, password) => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/socialice/auth/login`, {
      method: 'POST',
      headers: API_CONFIG.HEADERS,
      body: JSON.stringify({
        phone: phone,
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
    const response = await fetch(`${API_CONFIG.BASE_URL}/socialice/auth/register`, {
      method: 'POST',
      headers: API_CONFIG.HEADERS,
      body: JSON.stringify({
        fullname: fullname,
        username: username,
        password: password,
        phone: phone,
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
        error: data?.message || 'Signup failed',
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error?.message || 'Network error',
    };
  }
};