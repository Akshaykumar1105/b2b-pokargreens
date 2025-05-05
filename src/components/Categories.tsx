import { useState, useEffect } from 'react';

interface Category {
  id: number;
  name: string;
  image: string;
  color: string;
}

const Categories = () => {
  const [visible, setVisible] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://businessapi.pokargreens.com/api/v1/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const json = await response.json();

        const categoriesData = Array.isArray(json.data) ? json.data : [];
        const mappedCategories: Category[] = categoriesData.map((item) => ({
          id: item.id,
          name: item.name,
          image: item.media?.url ?? '/placeholder-image.jpg', // Added fallback image
          color: item.color ?? 'bg-harvest-green-500', // Using theme color
        }));

        setCategories(mappedCategories);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load categories');
        console.error('Categories fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();

    // Create intersection observer with better threshold
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add a small delay to ensure smooth animation
            setTimeout(() => setVisible(true), 100);
          }
        });
      },
      { threshold: 0.2 } // Increased threshold for better timing
    );

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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Shop by <span className="text-harvest-green-500">Categories</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our wide selection of fresh, organic produce categorized for your convenience
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`category-card transition-all duration-500 ease-out shadow-lg 
                ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 200}ms` }} // Increased delay for smoother cascade
            >
              <div className="relative h-60 overflow-hidden rounded-xl group">
                <img
                  src={category.image}
                  alt={category.name}
                  className="category-image w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-semibold mb-1">{category.name}</h3>
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
