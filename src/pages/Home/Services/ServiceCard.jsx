import React from 'react';

const ServiceCard = ({ service }) => {
    const {icon: Icon, title, description} = service
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center hover:shadow-lg hover:bg-[#CAEB66] transition-all duration-300">
      <div className="text-4xl text-primary rounded-full mb-4">
        <Icon />
      </div>
      <h3 className="text-2xl font-bold mb-2 text-primary text-center">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
};

export default ServiceCard;