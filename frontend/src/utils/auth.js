import { toast } from "react-hot-toast";

const normalizeBase64Url = (value) => {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = normalized.length % 4;

  if (padding === 0) return normalized;

  return normalized.padEnd(normalized.length + (4 - padding), "=");
};

const decodeJwtPayload = (token) => {
  const parts = token.split(".");

  if (parts.length !== 3) {
    throw new Error("Invalid token format");
  }

  return JSON.parse(atob(normalizeBase64Url(parts[1])));
};

export const normalizeRole = (role = "") =>
  role.toLowerCase().replace(/[_\s]/g, "-");

export const handleAuthError = (navigate) => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  toast.error("Authentication error: Session expired. Please login again.");
  navigate("/login");
};

export const makeAuthenticatedRequest = async (url, options = {}, navigate) => {
  const token = localStorage.getItem("token");
  
  if (!token || !isTokenValid()) {
    handleAuthError(navigate);
    throw new Error("No valid authentication token found");
  }

  const defaultHeaders = {
    'Authorization': `Bearer ${token}`,
  };

  // Don't set Content-Type for FormData, let browser handle it
  if (!(options.body instanceof FormData)) {
    defaultHeaders['Content-Type'] = 'application/json';
  }

  const requestOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, requestOptions);
    
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        console.log('Authentication failed, clearing token');
        handleAuthError(navigate);
        throw new Error("Authentication failed");
      }
      
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }
    
    return response;
  } catch (error) {
    if (error.message.includes("401") || error.message.includes("unauthorized") || error.message.includes("Authentication")) {
      handleAuthError(navigate);
    }
    throw error;
  }
};

export const isTokenValid = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;
  
  try {
    const payload = decodeJwtPayload(token);
    const currentTime = Date.now() / 1000;
    
    return typeof payload.exp === "number" && payload.exp > currentTime;
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
};
