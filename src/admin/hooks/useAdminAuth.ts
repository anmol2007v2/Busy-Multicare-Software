import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { STORAGE_KEYS } from '../../config/site';

const EIGHT_HOURS = 8 * 60 * 60 * 1000;

export function useAdminAuth() {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem(STORAGE_KEYS.auth);
    const authTime = parseInt(localStorage.getItem(STORAGE_KEYS.authTime) || '0', 10);
    if (!auth || Date.now() - authTime > EIGHT_HOURS) {
      localStorage.removeItem(STORAGE_KEYS.auth);
      localStorage.removeItem(STORAGE_KEYS.authTime);
      navigate('/admin');
    }
  }, [navigate]);
}
