import React from 'react';

// Section heading with an optional second, lighter-weight part.
// Usage: <Title text1="Delivery" text2="Information" />
const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex items-center gap-2 mb-3">
      <p className="text-gray-500">
        {text1} {text2 && <span className="text-gray-700 font-medium">{text2}</span>}
      </p>
      <span className="w-8 sm:w-12 h-px sm:h-0.5 bg-gray-700"></span>
    </div>
  );
};

export default Title;
