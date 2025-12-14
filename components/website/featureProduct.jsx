import axios from "axios";
import React from "react";
import ProductBox from "./ProductBox";
import { Button } from "@mui/material";
import Link from "next/link";

const FeatureProduct = async () => {
  try {
    const { data: productData } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/get-fetaured-product`
    );

    if (!productData?.success || !productData.data?.length) {
      return (
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="bg-gray-50 rounded-xl p-12">
            <h3 className="text-2xl font-semibold text-gray-600 mb-4">
              No Featured Products Available
            </h3>
            <p className="text-gray-500">Check back soon for new arrivals!</p>
          </div>
        </div>
      );
    }

    return (
      <section className="py-8 md:py-10  bg-gradient-to-b from-white to-gray-50">
        <div className="flex pb-3 container mx-auto px-4 flex-wrap items-center justify-between ">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Featured Products
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Discover our handpicked selection of premium products
            </p>
          </div>
          <Link href='#' >
            View All
          </Link>
        </div>
        <div className="container mx-auto px-4">
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {productData.data.map((product) => (
              <ProductBox key={product._id} product={product} />
            ))}
          </div>

          {/* View All Button (Optional) */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-white text-[#7a1cac] border-2 border-[#7a1cac] rounded-lg hover:bg-[#7a1cac] hover:text-white transition-all duration-300 font-semibold shadow-sm hover:shadow-md">
              View All Products
            </button>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="bg-red-50 rounded-xl p-12 border border-red-100">
          <h3 className="text-2xl font-semibold text-red-600 mb-4">
            Something went wrong
          </h3>
          <p className="text-gray-600">
            Unable to load featured products. Please try again later.
          </p>
        </div>
      </div>
    );
  }
};

export default FeatureProduct;
