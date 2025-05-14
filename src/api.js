// src/api.js
const API_URL = 'http://localhost:7070/api';

export async function login(username, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json(); // → { token }
}

// src/api.js
export async function fetchDishes(token) {
  const res = await fetch(`http://localhost:7070/api/dishes`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch dishes');
  return res.json();
}

export async function deleteDish(id, token) {
  const res = await fetch(`http://localhost:7070/api/dishes/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to delete dish');
}
