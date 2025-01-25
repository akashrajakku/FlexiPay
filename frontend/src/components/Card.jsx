// Card Component
const Card = ({ step_number, heading, description }) => {
  return (
    <div className="bg-white rounded-lg p-6 w-96 text-center transform transition-transform duration-300 hover:scale-105">
      {/* Step Number */}
      <div className="text-8xl font-bold text-purple-700 mb-4">
        {step_number}
      </div>

      {/* Heading */}
      <h3 className="text-2xl font-semibold text-purple-800 mb-4">
        {heading}
      </h3>

      {/* Description */}
      <p className="text-lg whitespace-pre-line text-gray-600">
        {description}
      </p>
    </div>
  );
};

export default Card;