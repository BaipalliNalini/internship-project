import React from 'react';
import zxcvbn from 'zxcvbn'; // You can install this library for password strength evaluation

const PasswordStrengthMeter = ({ password }) => {
  const result = zxcvbn(password); // Evaluate the password strength

  let strength = '';
  let color = '';

  switch (result.score) {
    case 0:
    case 1:
      strength = 'Weak';
      color = 'red';
      break;
    case 2:
      strength = 'Fair';
      color = 'orange';
      break;
    case 3:
      strength = 'Good';
      color = 'yellow';
      break;
    case 4:
      strength = 'Strong';
      color = 'green';
      break;
    default:
      strength = 'Weak';
      color = 'red';
      break;
  }

  return (
    <div>
      <div style={{ height: '5px', backgroundColor: color, marginBottom: '8px' }} />
      <span style={{ color }}>{strength}</span>
    </div>
  );
};

export default PasswordStrengthMeter;
