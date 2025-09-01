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

    // ✅ Corrected Logic: Check for a successful response first.
    if (response.ok) {
      // If the response is successful, parse it as JSON.
      const data = await response.json();
      return {
        success: true,
        data: data,
      };
    } else {
      // If the response is not successful, get the plain text of the error message.
      const errorText = await response.text();
      return {
        success: false,
        error: errorText || 'Login failed',
      };
    }
  } catch (error) {
    // This catch block is for true network errors (e.g., no internet connection).
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
