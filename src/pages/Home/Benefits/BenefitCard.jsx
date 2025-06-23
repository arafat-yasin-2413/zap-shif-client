import React from "react";

const BenefitCard = ({ title, description, image }) => {
    return (
        <div className="card w-full bg-base-100 shadow-md border hover:shadow-lg transition-all">
            <div className="card-body flex flex-col sm:flex-row items-center gap-4">
                <img
                    src={image}
                    alt={title}
                    className="w-50 h-50 object-contain"
                />
                <div className="divider divider-horizontal hidden sm:flex my-0" />

                <div>
                    <h3 className="card-title text-base-content text-2xl font-extrabold mb-2">
                        {title}
                    </h3>
                    <p className="text-base text-base-content">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default BenefitCard;
