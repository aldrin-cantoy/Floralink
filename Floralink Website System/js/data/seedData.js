import { storage } from '../services/StorageService.js';
import { generateId, getCurrentTimestamp, simpleHash } from '../utils/helpers.js';

/**
 * Initialize seed data for the application
 */
export function initializeSeedData() {
  // Check if data already exists
  if (storage.exists('products') && storage.get('products').length > 0) {
    console.log('Seed data already exists, skipping initialization');
    return;
  }

  console.log('Initializing seed data...');

  // Create admin user
  const adminUser = {
    id: generateId(),
    name: 'Admin User',
    email: 'admin@floralink.com',
    passwordHash: simpleHash('admin123'),
    isAdmin: true,
    createdAt: getCurrentTimestamp()
  };

  // Create regular test user
  const testUser = {
    id: generateId(),
    name: 'Test User',
    email: 'test@floralink.com',
    passwordHash: simpleHash('test1234'),
    isAdmin: false,
    createdAt: getCurrentTimestamp()
  };

  storage.set('users', [adminUser, testUser]);

  // Create seed products
  const products = [
    // Romantic Occasions
    {
      id: generateId(),
      name: 'Red Rose Bouquet',
      description: 'A classic bouquet of 12 stunning red roses, perfect for expressing your love and passion. Each rose is carefully selected for its beauty and freshness.',
      price: 49.99,
      imageUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=500',
      category: 'Romantic',
      featured: true,
      createdAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp()
    },
    {
      id: generateId(),
      name: 'Pink Peony Romance',
      description: 'Delicate pink peonies arranged in a beautiful display. These lush blooms symbolize romance, prosperity, and a happy marriage.',
      price: 64.99,
      imageUrl: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=500',
      category: 'Romantic',
      featured: true,
      createdAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp()
    },
    {
      id: generateId(),
      name: 'Mixed Love Arrangement',
      description: 'A romantic mix of roses, lilies, and seasonal flowers in shades of pink and red. Perfect for anniversaries and special romantic occasions.',
      price: 54.99,
      imageUrl: 'https://images.unsplash.com/photo-1487070183336-b863922373d4?w=500',
      category: 'Romantic',
      featured: false,
      createdAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp()
    },

    // Sympathy & Funeral
    {
      id: generateId(),
      name: 'White Lily Sympathy',
      description: 'Elegant white lilies arranged with greenery, offering comfort and peace during difficult times. A traditional choice for expressing condolences.',
      price: 79.99,
      imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=500',
      category: 'Sympathy & Funeral',
      featured: true,
      createdAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp()
    },
    {
      id: generateId(),
      name: 'Peaceful White Roses',
      description: 'A serene arrangement of pure white roses, symbolizing reverence, humility, and innocence. Perfect for memorial services.',
      price: 69.99,
      imageUrl: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=500',
      category: 'Sympathy & Funeral',
      featured: false,
      createdAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp()
    },
    {
      id: generateId(),
      name: 'Gentle Remembrance',
      description: 'Soft pastel flowers including roses, carnations, and chrysanthemums. A gentle tribute to honor cherished memories.',
      price: 74.99,
      imageUrl: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=500',
      category: 'Sympathy & Funeral',
      featured: false,
      createdAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp()
    },

    // Wedding & Engagement
    {
      id: generateId(),
      name: 'Bridal Bouquet Elegance',
      description: 'A stunning bridal bouquet featuring white roses, peonies, and delicate baby\'s breath. Timeless elegance for your special day.',
      price: 129.99,
      imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500',
      category: 'Wedding & Engagement',
      featured: true,
      createdAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp()
    },
    {
      id: generateId(),
      name: 'Romantic Garden Wedding',
      description: 'Lush garden-style arrangement with roses, hydrangeas, and seasonal blooms. Perfect for romantic outdoor weddings.',
      price: 149.99,
      imageUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=500',
      category: 'Wedding & Engagement',
      featured: true,
      createdAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp()
    },
    {
      id: generateId(),
      name: 'Engagement Celebration',
      description: 'Vibrant mixed bouquet celebrating new beginnings. Features roses, tulips, and seasonal flowers in joyful colors.',
      price: 89.99,
      imageUrl: 'https://images.unsplash.com/photo-1535398089889-dd807df1dfaa?w=500',
      category: 'Wedding & Engagement',
      featured: false,
      createdAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp()
    },

    // Celebrations
    {
      id: generateId(),
      name: 'Birthday Bright Blooms',
      description: 'Cheerful and colorful arrangement perfect for birthday celebrations. Includes gerbera daisies, roses, and vibrant seasonal flowers.',
      price: 59.99,
      imageUrl: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=500',
      category: 'Celebrations',
      featured: true,
      createdAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp()
    },
    {
      id: generateId(),
      name: 'Congratulations Bouquet',
      description: 'Celebrate achievements with this stunning arrangement of sunflowers, roses, and lilies. Perfect for graduations and promotions.',
      price: 64.99,
      imageUrl: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=500',
      category: 'Celebrations',
      featured: false,
      createdAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp()
    },
    {
      id: generateId(),
      name: 'New Baby Joy',
      description: 'Soft and sweet arrangement in pastel colors, perfect for welcoming a new baby. Features roses, carnations, and delicate accents.',
      price: 54.99,
      imageUrl: 'https://images.unsplash.com/photo-1487070183336-b863922373d4?w=500',
      category: 'Celebrations',
      featured: false,
      createdAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp()
    },

    // Seasonal & Special Days
    {
      id: generateId(),
      name: 'Spring Garden Mix',
      description: 'Fresh spring flowers including tulips, daffodils, and hyacinths. Brings the beauty of spring into any home.',
      price: 44.99,
      imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=500',
      category: 'Seasonal & Special Days',
      featured: false,
      createdAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp()
    },
    {
      id: generateId(),
      name: 'Holiday Festive Arrangement',
      description: 'Festive arrangement perfect for holiday celebrations. Features red roses, white lilies, and seasonal greenery.',
      price: 69.99,
      imageUrl: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=500',
      category: 'Seasonal & Special Days',
      featured: false,
      createdAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp()
    },
    {
      id: generateId(),
      name: 'Mother\'s Day Special',
      description: 'Show mom how much you care with this beautiful arrangement of her favorite flowers. Includes roses, carnations, and seasonal blooms.',
      price: 59.99,
      imageUrl: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=500',
      category: 'Seasonal & Special Days',
      featured: true,
      createdAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp()
    }
  ];

  storage.set('products', products);

  console.log('Seed data initialized successfully!');
  console.log('Admin credentials: admin@floralink.com / admin123');
  console.log('Test user credentials: test@floralink.com / test1234');
}
