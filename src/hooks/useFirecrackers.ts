import { useState, useEffect } from 'react';
import { Firecracker } from '../types/firecracker';
import { defaultFirecrackers } from '../data/defaultFirecrackers';

const STORAGE_KEY = 'sancrackers_firecrackers';

export const useFirecrackers = () => {
  const [firecrackers, setFirecrackers] = useState<Firecracker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFirecrackers();
  }, []);

  const loadFirecrackers = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFirecrackers(JSON.parse(stored));
      } else {
        // Initialize with default data
        setFirecrackers(defaultFirecrackers);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultFirecrackers));
      }
    } catch (error) {
      console.error('Error loading firecrackers:', error);
      setFirecrackers(defaultFirecrackers);
    } finally {
      setLoading(false);
    }
  };

  const addFirecracker = (firecracker: Omit<Firecracker, 'id'>) => {
    const newFirecracker: Firecracker = {
      ...firecracker,
      id: Date.now().toString()
    };
    const updated = [...firecrackers, newFirecracker];
    setFirecrackers(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newFirecracker;
  };

  const updateFirecracker = (id: string, updates: Partial<Firecracker>) => {
    const updated = firecrackers.map(item =>
      item.id === id ? { ...item, ...updates } : item
    );
    setFirecrackers(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const removeFirecracker = (id: string) => {
    const updated = firecrackers.filter(item => item.id !== id);
    setFirecrackers(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return {
    firecrackers,
    loading,
    addFirecracker,
    updateFirecracker,
    removeFirecracker
  };
};