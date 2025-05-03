
import { useState, useEffect } from 'react';

const categories = [
  {
    id: 1,
    name: "Fresh Fruits",
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    count: 24,
    color: "bg-harvest-yellow-500"
  },
  {
    id: 2,
    name: "Vegetables",
    image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
    count: 32,
    color: "bg-harvest-green-500"
  },
  {
    id: 3,
    name: "Organic",
    image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1087&q=80",
    count: 18,
    color: "bg-harvest-accent"
  },
  {
    id: 4,
    name: "Seasonal Picks",
    image: "https://images.unsplash.com/photo-1471943311424-646960669fbc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    count: 12,
    color: "bg-harvest-orange-500"
  }
];

const Categories = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisible(true);
      }
    }, { threshold: 0.1 });
    
    const element = document.querySelector('#categories');
    if (element) observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section id="categories" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by <span className="text-harvest-green-500">Categories</span></h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Browse our wide selection of fresh, organic produce categorized for your convenience</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <div 
              key={category.id} 
              className={`category-card transition-all shadow-lg ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} 
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative h-60 overflow-hidden rounded-xl">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="category-image w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-semibold mb-1">{category.name}</h3>
                  <p className="text-sm opacity-80">{category.count} items</p>
                </div>
                <div className={`absolute top-4 right-4 w-10 h-10 ${category.color} rounded-full flex items-center justify-center shadow-md`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
