import Joi from 'joi';

export const validateFirecracker = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().trim().min(1).max(100).required(),
    price: Joi.number().positive().precision(2).required(),
    image: Joi.string().uri().required(),
    description: Joi.string().trim().max(500).allow(''),
    category: Joi.string().valid(
      'sparklers', 'fountains', 'rockets', 'ground-spinners', 
      'flower-pots', 'bombs', 'aerial-shots', 'others'
    ),
    stock: Joi.number().integer().min(0)
  });

  const { error, value } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      details: error.details.map(detail => detail.message)
    });
  }

  req.validatedData = value;
  next();
};

export const validateOrder = (req, res, next) => {
  const schema = Joi.object({
    customerName: Joi.string().trim().min(1).max(100).required(),
    customerPhone: Joi.string().trim().pattern(/^[+]?[\d\s\-\(\)]{10,15}$/).required(),
    items: Joi.array().items(
      Joi.object({
        firecrackerName: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required(),
        price: Joi.number().positive().required(),
        totalPrice: Joi.number().positive().required()
      })
    ).min(1).required(),
    totalAmount: Joi.number().positive().required(),
    notes: Joi.string().max(1000).allow('')
  });

  const { error, value } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      details: error.details.map(detail => detail.message)
    });
  }

  req.validatedData = value;
  next();
};

export const validateAdminLogin = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().required()
  });

  const { error, value } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Password is required'
    });
  }

  req.validatedData = value;
  next();
};