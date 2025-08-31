const API_BASE_URL = 'http://localhost:5000/api';

// Get auth token from session storage
const getAuthToken = (): string | null => {
  return sessionStorage.getItem('admin_token');
};

// Create headers with auth token
const createHeaders = (includeAuth = false): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

// Generic API request handler
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...createHeaders(),
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Firecracker API
export const firecrackerAPI = {
  getAll: async (filters?: { category?: string; minPrice?: number; maxPrice?: number; search?: string }) => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value.toString());
        }
      });
    }
    
    const queryString = params.toString();
    const endpoint = queryString ? `/firecrackers?${queryString}` : '/firecrackers';
    
    const response = await apiRequest(endpoint);
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiRequest(`/firecrackers/${id}`);
    return response.data;
  },

  create: async (firecracker: Omit<any, 'id'>) => {
    const response = await apiRequest('/firecrackers', {
      method: 'POST',
      headers: createHeaders(true),
      body: JSON.stringify(firecracker),
    });
    return response.data;
  },

  update: async (id: string, updates: Partial<any>) => {
    const response = await apiRequest(`/firecrackers/${id}`, {
      method: 'PUT',
      headers: createHeaders(true),
      body: JSON.stringify(updates),
    });
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiRequest(`/firecrackers/${id}`, {
      method: 'DELETE',
      headers: createHeaders(true),
    });
    return response.data;
  },

  getCategories: async () => {
    const response = await apiRequest('/firecrackers/categories');
    return response.data;
  }
};

// Order API
export const orderAPI = {
  create: async (order: any) => {
    const response = await apiRequest('/orders', {
      method: 'POST',
      body: JSON.stringify(order),
    });
    return response.data;
  },

  getAll: async (filters?: { status?: string; page?: number; limit?: number }) => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value.toString());
        }
      });
    }
    
    const queryString = params.toString();
    const endpoint = queryString ? `/orders?${queryString}` : '/orders';
    
    const response = await apiRequest(endpoint, {
      headers: createHeaders(true),
    });
    return response;
  },

  getById: async (id: string) => {
    const response = await apiRequest(`/orders/${id}`, {
      headers: createHeaders(true),
    });
    return response.data;
  },

  updateStatus: async (id: string, status: string, notes?: string) => {
    const response = await apiRequest(`/orders/${id}/status`, {
      method: 'PATCH',
      headers: createHeaders(true),
      body: JSON.stringify({ status, notes }),
    });
    return response.data;
  },

  getStats: async () => {
    const response = await apiRequest('/orders/stats', {
      headers: createHeaders(true),
    });
    return response.data;
  }
};

// Auth API
export const authAPI = {
  adminLogin: async (password: string) => {
    const response = await apiRequest('/auth/admin/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
    });
    
    // Store token in session storage
    if (response.success && response.data.token) {
      sessionStorage.setItem('admin_token', response.data.token);
    }
    
    return response;
  },

  verifyToken: async () => {
    const response = await apiRequest('/auth/admin/verify', {
      headers: createHeaders(true),
    });
    return response;
  },

  logout: () => {
    sessionStorage.removeItem('admin_token');
  }
};

// Health check
export const healthAPI = {
  check: async () => {
    const response = await fetch('http://localhost:5000/health');
    return response.json();
  }
};