import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const VerifyUser = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('Verifying...');

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        const response = await fetch(`https://askseniorbackend.onrender.com/api/v1/auth/activate/${token}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Verification failed');
        }

        const data = await response.json();
        console.log(data);
        
        setStatus('✅ Account verified successfully!');
        
        // Redirect after 3 seconds
        setTimeout(() => navigate('/login'), 3000);
      } catch (error) {
        setStatus('❌ Verification failed. Invalid or expired token.');
      }
    };

    if (token) {
      verifyAccount();
    } else {
      setStatus('❌ No token provided.');
    }
  }, [token, navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>{status}</h2>
      {status === '✅ Account verified successfully!' && <p>Redirecting to login...</p>}
    </div>
  );
};

export default VerifyUser;
