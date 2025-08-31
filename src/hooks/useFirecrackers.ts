import { useState, useEffect } from 'react';
import { Firecracker } from '../types/firecracker';
import { firecrackerAPI } from '../services/api';

export const useFirecrackers = () => {
  const [firecrackers, setFirecrackers] = useState<Firecracker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFirecrackers();
  }, []);

  const loadFirecrackers = async () => {
    try {
      setError(null);
      const data = await firecrackerAPI.getAll();
      setFirecrackers(data);
    } catch (error) {
      console.error('Error loading firecrackers:', error);
      setError('Failed to load firecrackers');
      setFirecrackers([]);
    } finally {
      setLoading(false);
    }
  };

  const addFirecracker = async (firecracker: Omit<Firecracker, 'id'>) => {
    try {
      const newFirecracker = await firecrackerAPI.create(firecracker);
      setFirecrackers(prev => [...prev, newFirecracker]);
      return newFirecracker;
    } catch (error) {
      console.error('Error adding firecracker:', error);
      throw error;
    }
  };

  const updateFirecracker = async (id: string, updates: Partial<Firecracker>) => {
    try {
      const updatedFirecracker = await firecrackerAPI.update(id, updates);
      setFirecrackers(prev => prev.map(item =>
        item.id === id ? updatedFirecracker : item
      ));
      return updatedFirecracker;
    } catch (error) {
      console.error('Error updating firecracker:', error);
      throw error;
    }
  };

  const removeFirecracker = async (id: string) => {
    try {
      await firecrackerAPI.delete(id);
      setFirecrackers(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error removing firecracker:', error);
      throw error;
    }
  };

  return {
    firecrackers,
    loading,
    error,
    addFirecracker,
    updateFirecracker,
    removeFirecracker,
    refreshFirecrackers: loadFirecrackers
  };
};