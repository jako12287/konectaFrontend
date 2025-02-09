const API_URL = "http://localhost:3000";

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error("Credenciales inválidas");

    return response.json();
  } catch (error) {
    console.error(error);
  }
};
