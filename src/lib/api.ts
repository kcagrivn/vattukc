export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiGet(path: string) {
  const res = await fetch(`${API_URL}${path}`, {
    cache: "no-store", // Luôn lấy dữ liệu mới nhất từ server
  });

  if (!res.ok) {
    throw new Error(`Lỗi GET ${path}: ${res.status}`);
  }

  return res.json();
}

export async function apiPost(path: string, data: any, token?: string) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Lỗi POST ${path}: ${res.status} - ${errorText}`);
  }

  return res.json();
}

export async function apiPut(path: string, data: any, token?: string) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Lỗi PUT ${path}: ${res.status} - ${errorText}`);
  }

  return res.json();
}

export async function apiDelete(path: string, token?: string) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "DELETE",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Lỗi DELETE ${path}: ${res.status} - ${errorText}`);
  }

  return res.json();
}

