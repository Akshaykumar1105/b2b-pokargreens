import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-gradient-to-br from-harvest-green-50 to-harvest-yellow-50">
      <div className="container mx-auto px-4 py-24 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 z-10 md:pr-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            <span className="text-harvest-green-500">Nature's</span> Freshness,
            <br />
            <span className="text-harvest-orange-500">Delivered Daily</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-lg">
            Handpicked fruits and vegetables sourced directly from local farms
            to your doorstep, ensuring the freshest produce for your family.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/products">
              <Button className="btn-primary text-base px-8 py-6">
                Shop Now
              </Button>
            </Link>

          </div>

    
        </div>

        <div className="md:w-1/2 mt-12 md:mt-0 relative animate-scale-in">
          <div className="relative">
            <div className="absolute -top-16 -left-16 w-40 h-40 bg-harvest-yellow-400 rounded-full mix-blend-multiply opacity-70 filter blur-xl animate-pulse"></div>
            <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-harvest-green-400 rounded-full mix-blend-multiply opacity-70 filter blur-xl animate-pulse"></div>

            <img
              src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="Fresh fruits and vegetables"
              className="rounded-2xl shadow-2xl relative z-10 max-w-full h-auto object-cover"
            />
          </div>

        </div>
      </div>

      <div className="hidden absolute -bottom-16 left-0 right-0 h-32 bg-white transform skew-y-3"></div>
    </section>
  );
};

export default Hero;
