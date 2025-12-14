import React from 'react';
import { FaTruck, FaUndo, FaGift, FaCreditCard, FaHeadset } from 'react-icons/fa';

const FooterBanner = () => {
  return (
    <div className="bg-gray-100 py-12 px-4">
      <div className=" mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Free Shipping */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-[#7a1cac] text-white p-3 rounded-full mb-4">
              <FaTruck className="text-xl" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Free Shipping</h3>
            <p className="text-gray-600">For all Orders Over $100</p>
          </div>

          {/* Secured Payment */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-[#7a1cac] text-white p-3 rounded-full mb-4">
              <FaCreditCard className="text-xl" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Secured Payment</h3>
            <p className="text-gray-600">Payment Cards Accepted</p>
          </div>

          {/* Special Gifts */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-[#7a1cac] text-white p-3 rounded-full mb-4">
              <FaGift className="text-xl" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Special Gifts</h3>
            <p className="text-gray-600">Our First Product Order</p>
          </div>

          {/* 24/7 Support */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-[#7a1cac] text-white p-3 rounded-full mb-4">
              <FaHeadset className="text-xl" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Support 24/7</h3>
            <p className="text-gray-600">Contact us anytime</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBanner;