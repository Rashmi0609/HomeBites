import React from 'react';
import '../styles/Cart.css'; // ✅ plain CSS import

const Cart = () => {
  return (
    <div className="cartWrapper">
      <header className="bg-orange-500 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center">Homemade Chole Bhature</h1>
          <p className="text-center mt-2 text-yellow-100">A North Indian delicacy you can make at home!</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Video Section */}
        <section className="mb-12">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 bg-orange-500 text-white flex items-center">
              <i className="fas fa-play-circle text-2xl mr-2"></i>
              <h2 className="text-xl font-semibold">Watch the Recipe Video</h2>
            </div>
            <div className="videoContainer">
              <iframe
                src="https://www.youtube.com/embed/j7b69ReQ5fA"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Chole Bhature Video"
              ></iframe>
            </div>
          </div>
        </section>

        {/* Ingredients and Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          <section className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 bg-orange-500 text-white flex items-center">
                <i className="fas fa-shopping-basket mr-2"></i>
                <h2 className="text-xl font-semibold">Ingredients</h2>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg text-orange-700 mb-2">For Chole:</h3>
                <ul className="space-y-2">
                  {[
                    "2 cups chickpeas (soaked overnight)",
                    "2 tbsp oil",
                    "1 tsp cumin seeds",
                    "1 large onion (finely chopped)",
                    "2 tomatoes (pureed)",
                    "1 tbsp ginger-garlic paste",
                    "Chole masala & spices",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="bg-orange-100 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">{index + 1}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="font-bold text-lg text-orange-700 mt-6 mb-2">For Bhature:</h3>
                <ul className="space-y-2">
                  {[
                    "2 cups maida (all-purpose flour)",
                    "½ cup fine sooji (semolina)",
                    "2 tbsp yogurt",
                    "1 tsp sugar",
                    "Oil for deep frying",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="bg-orange-100 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">{index + 1}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 bg-orange-500 text-white flex items-center">
                <i className="fas fa-utensils mr-2"></i>
                <h2 className="text-xl font-semibold">Step-by-Step</h2>
              </div>
              <div className="p-6 space-y-6">
                {[
                  {
                    title: "Preparing the Chole",
                    steps: [
                      "Pressure cook soaked chickpeas with salt and tea bag until soft (5-6 whistles). Drain and set aside.",
                      "Heat oil in a pan, add cumin seeds. When they splutter, add onions and sauté until golden.",
                      "Add ginger-garlic paste and sauté for 2 minutes, then add tomato puree and cook until oil separates.",
                    ],
                  },
                  {
                    title: "Flavoring the Gravy",
                    steps: [
                      "Add chole masala, coriander powder, turmeric, red chili powder, and garam masala. Cook for 2 minutes.",
                      "Add cooked chickpeas with some water. Simmer for 15-20 minutes to thicken the gravy.",
                      "Garnish with fresh coriander leaves and serve hot.",
                    ],
                  },
                  {
                    title: "Making the Bhature",
                    steps: [
                      "Mix maida, sooji, baking soda, salt, sugar, and yogurt in a bowl. Knead into soft dough using water.",
                      "Cover and rest for 2 hours. Divide into equal portions and roll into circles.",
                      "Deep fry in hot oil until puffed and golden brown on both sides.",
                    ],
                  },
                ].map((step, i) => (
                  <div key={i} className="recipeCard">
                    <h3 className="font-bold text-lg text-orange-800 flex items-center">
                      <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">{i + 1}</span>
                      {step.title}
                    </h3>
                    <div className="mt-3 pl-11">
                      {step.steps.map((text, j) => (
                        <p key={j} className="text-gray-700 mt-2">{text}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Cart Box */}
        <section className="mt-12">
          <div className="compactBox">
            <div className="p-4 bg-orange-500 text-white flex items-center">
              <i className="fas fa-cart-plus mr-2"></i>
              <h2 className="text-xl font-semibold">Ready to Cook Kit</h2>
            </div>
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-orange-700">Chole Bhature Ingredient Kit</h3>
                  <p className="text-gray-600 mt-1">
                    Includes all dry ingredients pre-measured for perfect chole bhature
                  </p>
                  <div className="mt-3 flex items-center">
                    <span className="text-orange-600 font-bold text-xl">₹299</span>
                    <span className="ml-2 text-sm text-gray-500 line-through">₹399</span>
                    <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">25% OFF</span>
                  </div>
                </div>
                <div className="flex space-x-2 mt-3">
                  <button className="smallButton bg-orange-500 hover:bg-orange-600 text-white">
                    <i className="fas fa-cart-plus mr-2"></i> Schedule Order
                  </button>
                  <button className="smallButton bg-green-500 hover:bg-green-600 text-white">
                    <i className="fas fa-shopping-cart mr-2"></i> Instant Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-orange-500 text-yellow-100 py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© Chole Bhature Delights. All recipes are for demonstration purposes.</p>
          <div className="flex justify-center space-x-4 mt-3">
            <a href="#" className="hover:text-white"><i className="fab fa-instagram"></i></a>
            <a href="#" className="hover:text-white"><i className="fab fa-facebook"></i></a>
            <a href="#" className="hover:text-white"><i className="fab fa-pinterest"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Cart;
