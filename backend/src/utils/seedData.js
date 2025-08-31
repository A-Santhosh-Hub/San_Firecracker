import Firecracker from '../models/Firecracker.js';

export const defaultFirecrackers = [
  {
    name: 'Standard Flower Pots',
    price: 250.50,
    image: 'https://images.pexels.com/photos/1387174/pexels-photo-1387174.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Beautiful colorful flower pot crackers with stunning effects',
    category: 'flower-pots',
    stock: 50
  },
  {
    name: 'Premium Sparklers',
    price: 120.00,
    image: 'https://images.pexels.com/photos/1387174/pexels-photo-1387174.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Long-lasting sparklers perfect for celebrations',
    category: 'sparklers',
    stock: 100
  },
  {
    name: 'Rocket Crackers',
    price: 450.75,
    image: 'https://images.pexels.com/photos/1387174/pexels-photo-1387174.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'High-flying rocket crackers with brilliant colors',
    category: 'rockets',
    stock: 30
  },
  {
    name: 'Ground Spinners',
    price: 180.25,
    image: 'https://images.pexels.com/photos/1387174/pexels-photo-1387174.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Spinning ground crackers with mesmerizing patterns',
    category: 'ground-spinners',
    stock: 75
  },
  {
    name: 'Fountains',
    price: 320.00,
    image: 'https://images.pexels.com/photos/1387174/pexels-photo-1387174.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Spectacular fountain crackers with multiple effects',
    category: 'fountains',
    stock: 40
  },
  {
    name: 'Chakkar Special',
    price: 95.50,
    image: 'https://images.pexels.com/photos/1387174/pexels-photo-1387174.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Traditional spinning wheel crackers',
    category: 'ground-spinners',
    stock: 80
  },
  {
    name: 'Bombs Deluxe',
    price: 580.00,
    image: 'https://images.pexels.com/photos/1387174/pexels-photo-1387174.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Premium sound crackers with powerful effects',
    category: 'bombs',
    stock: 25
  },
  {
    name: 'Aerial Shots',
    price: 750.25,
    image: 'https://images.pexels.com/photos/1387174/pexels-photo-1387174.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Multi-shot aerial crackers with spectacular displays',
    category: 'aerial-shots',
    stock: 20
  }
];

export const seedDatabase = async () => {
  try {
    const existingCount = await Firecracker.countDocuments();
    
    if (existingCount === 0) {
      console.log('🌱 Seeding database with default firecrackers...');
      await Firecracker.insertMany(defaultFirecrackers);
      console.log('✅ Database seeded successfully with', defaultFirecrackers.length, 'firecrackers');
    } else {
      console.log('📦 Database already contains', existingCount, 'firecrackers');
    }
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
};