import React from 'react';

// Testimonial Card Component
const TestimonialCard = ({ image, name, testimonial }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center transform transition-transform duration-300 hover:scale-105">
      {/* Profile Image */}
      <div className="flex justify-center">
        <img
          src={image}
          alt={name}
          className="w-24 h-24 rounded-full object-cover border-4 border-purple-700"
        />
      </div>

      {/* Person's Name */}
      <h3 className="text-2xl font-semibold text-purple-700 mt-4">
        {name}
      </h3>

      {/* Testimonial */}
      <p className="text-lg text-gray-600 mt-4 italic">
        “{testimonial}”
      </p>
    </div>
  );
};

export default TestimonialCard;