import Firecracker from '../models/Firecracker.js';

// Get all firecrackers
export const getAllFirecrackers = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, search } = req.query;
    
    // Build filter object
    const filter = { isActive: true };
    
    if (category && category !== 'all') {
      filter.category = category;
    }
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const firecrackers = await Firecracker.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      count: firecrackers.length,
      data: firecrackers
    });
  } catch (error) {
    console.error('Error fetching firecrackers:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching firecrackers',
      error: error.message
    });
  }
};

// Get single firecracker
export const getFirecracker = async (req, res) => {
  try {
    const firecracker = await Firecracker.findById(req.params.id);
    
    if (!firecracker) {
      return res.status(404).json({
        success: false,
        message: 'Firecracker not found'
      });
    }

    res.json({
      success: true,
      data: firecracker
    });
  } catch (error) {
    console.error('Error fetching firecracker:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching firecracker',
      error: error.message
    });
  }
};

// Create new firecracker (Admin only)
export const createFirecracker = async (req, res) => {
  try {
    const firecracker = new Firecracker(req.validatedData);
    await firecracker.save();

    res.status(201).json({
      success: true,
      message: 'Firecracker created successfully',
      data: firecracker
    });
  } catch (error) {
    console.error('Error creating firecracker:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Firecracker with this name already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error creating firecracker',
      error: error.message
    });
  }
};

// Update firecracker (Admin only)
export const updateFirecracker = async (req, res) => {
  try {
    const firecracker = await Firecracker.findByIdAndUpdate(
      req.params.id,
      req.validatedData,
      { new: true, runValidators: true }
    );

    if (!firecracker) {
      return res.status(404).json({
        success: false,
        message: 'Firecracker not found'
      });
    }

    res.json({
      success: true,
      message: 'Firecracker updated successfully',
      data: firecracker
    });
  } catch (error) {
    console.error('Error updating firecracker:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating firecracker',
      error: error.message
    });
  }
};

// Delete firecracker (Admin only)
export const deleteFirecracker = async (req, res) => {
  try {
    const firecracker = await Firecracker.findByIdAndDelete(req.params.id);

    if (!firecracker) {
      return res.status(404).json({
        success: false,
        message: 'Firecracker not found'
      });
    }

    res.json({
      success: true,
      message: 'Firecracker deleted successfully',
      data: firecracker
    });
  } catch (error) {
    console.error('Error deleting firecracker:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting firecracker',
      error: error.message
    });
  }
};

// Soft delete firecracker (Admin only)
export const deactivateFirecracker = async (req, res) => {
  try {
    const firecracker = await Firecracker.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!firecracker) {
      return res.status(404).json({
        success: false,
        message: 'Firecracker not found'
      });
    }

    res.json({
      success: true,
      message: 'Firecracker deactivated successfully',
      data: firecracker
    });
  } catch (error) {
    console.error('Error deactivating firecracker:', error);
    res.status(500).json({
      success: false,
      message: 'Error deactivating firecracker',
      error: error.message
    });
  }
};

// Get firecracker categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Firecracker.distinct('category', { isActive: true });
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
};