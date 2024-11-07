import React from 'react';
import { motion } from 'framer-motion';

const CTA = () => {
  return (
    <section id="cta" className="relative">
      <div className="max-w-7xl mx-auto px-4 mt-20">
        <motion.div 
          className="relative rounded-lg overflow-hidden min-h-[250px] sm:min-h-[300px] bg-white"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Background */}
          <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
          
          {/* Centered container */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Content */}
            <div className="relative flex flex-col sm:flex-row items-center sm:items-center sm:justify-between gap-6 w-full max-w-4xl px-6 sm:px-8">
              <motion.div 
                className="text-center sm:text-left max-w-2xl"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              >
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                  Ready to get started?
                </h3>
                <p className="mt-3 text-base sm:text-lg md:text-xl text-gray-600">
                  Join thousands of satisfied customers today.
                </p>
              </motion.div>
              <motion.a 
                href="#" 
                className="text-sm sm:text-base bg-gray-900 text-white py-2 px-6 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;