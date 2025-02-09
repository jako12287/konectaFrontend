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

export const fetchRequests = async (token, page = 1) => {
  try {
    const response = await fetch(`${API_URL}/api/request/admin/all?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener las solicitudes");
    }

    const data = await response.json();
    console.log("fetchRequests -> data", data);

    return {
      requests: data.requests || [],
      totalPages: data.totalPages || 1,
    };
  } catch (error) {
    console.error("Error en fetchRequests:", error);
    return { requests: [], totalPages: 1 };
  }
};


export const deleteRequestById = async (id, token) => {
  try {
    const response = await fetch(`${API_URL}/api/request/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar la solicitud: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Solicitud eliminada con éxito:", result);
    return result;
  } catch (error) {
    console.error("Error eliminando la solicitud:", error);
    return null;
  }
};

export const createRequest = async (requestData, token) => {
  const response = await fetch(`${API_URL}/api/request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    throw new Error("Error al crear la solicitud");
  }

  return response.json();
};


