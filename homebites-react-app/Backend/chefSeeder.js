const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Dish = require('./models/Dish');
const Chef = require('./models/Chef');

dotenv.config();

const chefsData = [
  { name: 'Ramya Sharma', specialty: 'Traditional South Indian & Homemade Curries', price: 299, rating: 4.8, image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5e107373-f170-4e5c-bea2-cbb845c7434c.png', dishes: ['Chicken Curry', 'Curry Chawal'] },
  { name: 'Priya Patel', specialty: 'Gujarati Thali & Sweet Dishes', price: 249, rating: 4.5, image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ecf9f7ca-6be8-474f-b779-ee909236eafd.png', dishes: ['Thal'] },
  { name: 'Arjun Singh', specialty: 'Punjabi Cuisine & Tandoori Specialties', price: 260, rating: 4.6, image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/94092e49-9719-4f5a-9140-3267535f2a48.png', dishes: ['Paneer Naan', 'Chole Bhature'] },
  { name: 'Rekha Nair', specialty: 'Banaras Traditional Cuisine & Sweets', price: 299, rating: 4.7, image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/01b57c80-b51d-4cca-86c6-2bf54038bee3.png', dishes: ['Fire Rice', 'Vegetable Stir Fry'] },
];

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing chefs
    await Chef.deleteMany();

    // Create a mapping of dish names to their database IDs
    const allDishes = await Dish.find({});
    const dishMap = allDishes.reduce((map, dish) => {
      map[dish.name] = dish._id;
      return map;
    }, {});

    // Prepare chefs with correct dish IDs
    const chefsToInsert = chefsData.map(chef => {
      const dishIds = chef.dishes.map(dishName => dishMap[dishName]).filter(id => id); // filter out any not found
      return { ...chef, dishes: dishIds };
    });
    
    // Insert the new chefs
    await Chef.insertMany(chefsToInsert);

    console.log('Chef Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error('Error with chef data import:', error);
    process.exit(1);
  }
};

// Run the import function
importData();
