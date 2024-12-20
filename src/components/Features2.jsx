import { REVIEWS } from "../constants";

const Services = () => {
  return (
    <section className="max-w-7xl mx-auto" id="services">
      <div className="my-20">
        <h2 className="text-xl lg:text-3xl tracking-tight text-center uppercase mb-20">
          Reviews From Students
        </h2>
        
        {REVIEWS.map((review, index) => (
          <div 
            key={index} 
            className="mb-12 mx-4 flex flex-col lg:flex-row"
          >
            <div 
              className={`lg:w-1/2 mb-4 lg:mb-0 ${
                index % 2 === 0 ? "" : "lg:order-2"
              }`}
            >
              <img 
                src={review.image} 
                alt={review.title} 
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            
            <div 
              className={`lg:w-1/2 flex flex-col ${
                index % 2 === 0 ? "lg:pl-12" : "lg:pr-12"
              }`}
            >
              <h3 className="text-xl lg:text-2xl font-medium mb-2">
                {review.title}
              </h3>
              <p className="mb-4 lg:tracking-wide text-lg lg:text-xl lg:leading-9">
                {review.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;