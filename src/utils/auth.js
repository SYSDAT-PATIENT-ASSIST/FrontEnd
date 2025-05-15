export const getToken = async () => {
  let token = localStorage.getItem("token");
  if (!token) {
    const res = await fetch("http://localhost:7070/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "lille",
        password: "1234",
      }),
    });

    if (!res.ok) throw new Error("Login fejlede");

    const data = await res.json();
    token = data.token;
    localStorage.setItem("token", token);
  }
  return token;
};
