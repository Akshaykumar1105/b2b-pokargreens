
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisible(true);
      }
    }, { threshold: 0.1 });
    
    const element = document.querySelector('#newsletter');
    if (element) observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Subscription logic would go here
    setEmail('');
    alert('Thank you for subscribing to our newsletter!');
  };

  return (
    <section id="newsletter" className="py-20 bg-harvest-green-500 text-white relative overflow-hidden">
      {/* Abstract shapes */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
      <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-white/10 rounded-full"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-3xl mx-auto text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated with Fresh Offers</h2>
          <p className="text-white/90 mb-8">
            Subscribe to our newsletter to receive updates on seasonal produce, special offers, and healthy recipes delivered straight to your inbox.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-grow py-3 px-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <Button type="submit" className="bg-white text-harvest-green-600 hover:bg-harvest-yellow-400 hover:text-harvest-green-800 rounded-full transition-colors font-semibold">
              Subscribe
            </Button>
          </form>
          
          <p className="text-sm mt-4 text-white/70">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
