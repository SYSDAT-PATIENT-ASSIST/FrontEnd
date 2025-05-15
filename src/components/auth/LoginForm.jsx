import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// Styled components
const FormWrapper = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  display: block;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1.25rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
`;

const Button = styled.button`
  width: 100%;
  background: #2563eb;
  color: white;
  padding: 0.6rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: background 0.2s;

  &:hover {
    background: #1d4ed8;
  }
`;

const ErrorBox = styled.div`
  background: #fee2e2;
  color: #b91c1c;
  padding: 0.75rem;
  border-radius: 0.375rem;
  margin-bottom: 1.25rem;
  font-size: 0.95rem;
`;

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:7070/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError("Forkert brugernavn eller adgangskode");
        } else {
          setError("Noget gik galt. Prøv igen senere.");
        }
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      navigate("/kitchen");
    } catch (err) {
      console.error("Login fejl:", err);
      setError("Kunne ikke oprette forbindelse til serveren.");
    }
  };

  return (
    <FormWrapper onSubmit={handleLogin}>
      <Title>Velkommen til køkkenet</Title>

      {error && <ErrorBox>{error}</ErrorBox>}

      <div>
        <Label>Brugernavn</Label>
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div>
        <Label>Adgangskode</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <Button type="submit">Log ind</Button>
    </FormWrapper>
  );
};

export default LoginForm;
