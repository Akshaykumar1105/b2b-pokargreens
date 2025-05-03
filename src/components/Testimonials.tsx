
import { useState, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Happy Customer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    quote: "I've been ordering my weekly groceries from Pokar Greens for months now. The quality of their produce is exceptional, and I love knowing that I'm supporting local farmers.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Chef",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    quote: "As a professional chef, the quality of ingredients is paramount. Pokar Greens consistently delivers the freshest, most flavorful produce that elevates my culinary creations.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Health Enthusiast",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
    quote: "Since switching to Pokar Greens's organic produce, I've noticed a significant difference in my energy levels and overall wellbeing. Their commitment to quality is unmatched!",
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisible(true);
      }
    }, { threshold: 0.1 });
    
    const element = document.querySelector('#testimonials');
    if (element) observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section id="testimonials" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers <span className="text-harvest-green-500">Say</span></h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Hear from our satisfied customers about their experience with Pokar Greens</p>
        </div>
        
        <div className={`max-w-4xl mx-auto transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <svg className="text-harvest-green-300 h-16 w-16 mb-6" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>

              <div className="relative">
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={testimonial.id} 
                    className={`transition-all duration-700 transform ${
                      index === activeIndex 
                        ? 'opacity-100 translate-x-0 block' 
                        : 'opacity-0 absolute translate-x-6 hidden'
                    }`}
                  >
                    <p className="text-xl md:text-2xl font-medium text-gray-700 italic mb-8">"{testimonial.quote}"</p>
                    
                    <div className="flex items-center">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div className="ml-4">
                        <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                        <p className="text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="absolute -bottom-6 left-0 right-0 flex justify-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeIndex ? 'bg-harvest-green-500 w-6' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
