const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Dish = require('./models/Dish'); // Import the Dish model

dotenv.config();

const dishes = [
  { name: 'Paneer Naan', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/67a2e3e4-de07-4242-ab1f-896609586bee.png', alt: 'Fresh homemade paneer naan bread' },
  { name: 'Chicken Curry', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/19b6ea5a-bc57-4ce0-9629-9d48d7f0ada3.png', alt: 'Bowl of homemade chicken curry' },
  { name: 'Vegetable Stir Fry', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ba080565-911a-4820-a924-1f66cc95e477.png', alt: 'Colorful vegetable stir fry' },
  { name: 'Chole Bhature', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/db2b6242-76e5-44c4-9a40-4c2fbbca083b.png', alt: 'Plate of spicy chole bhature' },
  { name: 'Thal', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f7a72b89-327b-4f8b-ab0b-306583adb883.png', alt: 'Traditional Thal meal platter' },
  { name: 'Caesar Salad', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c10cffc8-ba50-442c-a9d1-107a8b1f7d87.png', alt: 'Fresh homemade Caesar salad' },
  { name: 'Curry Chawal', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/eeac2b07-7130-4b44-8b69-00ed7a70d79f.png', alt: 'Plate of traditional curry chawal' },
  { name: 'Fire Rice', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7bcbf6bf-6f34-4ea4-bca3-39225bd725ab.png', alt: 'Spicy fire rice dish' },
];

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing dishes to avoid duplicates
    await Dish.deleteMany(); 
    
    // Insert the new dishes
    await Dish.insertMany(dishes);

    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error('Error with data import:', error);
    process.exit(1);
  }
};

// Run the import function
importData();
