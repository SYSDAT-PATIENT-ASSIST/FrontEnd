import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ClockContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 8px 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(200, 200, 255, 0.4);
`;

const ClockDate = styled.div`
  font-size: 0.85rem;
  font-weight: 500;
  color: #333;
`;

const ClockTime = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  color: #0056d6;
  margin-top: 4px;
  letter-spacing: 0.5px;
  text-shadow: 0 0 6px rgba(0, 86, 214, 0.3);
`;

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = time.toLocaleDateString('da-DK', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const formattedTime = time.toLocaleTimeString('da-DK', {
    hour: '2-digit',
    minute: '2-digit',
    second: undefined,
  });

  return (
    <ClockContainer>
      <ClockDate>{formattedDate}</ClockDate>
      <ClockTime>{formattedTime}</ClockTime>
    </ClockContainer>
  );
};

export default Clock;
