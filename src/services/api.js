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

export const fetchEmployees = async (token, page = 1, pageSize = 5) => {
  try {
    const response = await fetch(
      `${API_URL}/api/employees?page=${page}&pageSize=${pageSize}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener los empleados");
    }

    const data = await response.json();
    console.log("fetchEmployees -> data", data);

    return {
      employees: data.employees,
      totalPages: data.totalPages,
    };
  } catch (error) {
    console.error("Error en fetchEmployees:", error);
    return { employees: [], totalPages: 1 };
  }
};

export const registerUser = async (userData, token) => {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Error al registrar usuario");
  }

  return response.json();
};
