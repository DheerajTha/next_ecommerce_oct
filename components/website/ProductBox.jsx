"use client";
import { Button } from "@mui/material";
import { FaHeart } from "react-icons/fa";
import { FaCodeCompare } from "react-icons/fa6";
import { MdOutlineZoomInMap } from "react-icons/md";
import Image from "next/image";
import imagesPlaceHolder from "@/public/assets/images/img-placeholder.webp";
import Link from "next/link";

const ProductBox = ({ product }) => {
  return (
    <div className="w-full p-2 group">
      <div className="   overflow-hidden flex flex-col h-full transition-all duration-300 border rounded-sm border-gray-100 hover:border-[#7a1cac]/20">
        {/* Image Container */}
        <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-gray-50">
          {/* <Link href={`/product/${product?.slug || product?._id}`}> */}
          <Link href='#'>
            <div className="relative w-full h-full cursor-pointer">
              {/* Main Image */}
              <Image
                src={product?.media[0]?.secure_url || imagesPlaceHolder.src}
                alt={product?.name}
                title={product?.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
              {/* Hover Image */}
              {product?.media[1]?.secure_url && (
                <Image
                  src={product.media[1].secure_url}
                  alt={product?.name}
                  title={product?.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover w-full h-full absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
                />
              )}
            </div>
          </Link>

          {/* Discount Badge */}
          {product?.discountPercentage && (
            <span className="absolute top-3 left-3 bg-gradient-to-r from-[#7a1cac] to-[#9c27b0] text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-md">
              -{product.discountPercentage}%
            </span>
          )}

          {/* Action Buttons */}
          {/* <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 transform translate-x-4 group-hover:translate-x-0">
            <Button 
              size="small"
              className="min-w-0 w-9 h-9 bg-white text-gray-600 p-0 rounded-full shadow-lg hover:bg-[#7a1cac] hover:text-white transition-all hover:scale-110"
            >
              <FaHeart size={14} />
            </Button>
            <Button 
              size="small"
              className="min-w-0 w-9 h-9 bg-white text-gray-600 p-0 rounded-full shadow-lg hover:bg-[#7a1cac] hover:text-white transition-all hover:scale-110"
            >
              <FaCodeCompare size={14} />
            </Button>
            <Button 
              size="small"
              className="min-w-0 w-9 h-9 bg-white text-gray-600 p-0 rounded-full shadow-lg hover:bg-[#7a1cac] hover:text-white transition-all hover:scale-110"
            >
              <MdOutlineZoomInMap size={16} />
            </Button>
          </div> */}
        </div>

        {/* Product Info */}
        <div className="p-4 flex flex-col flex-grow">
          <Link href={`/product/${product?.slug || product?._id}`}>
            <h3 className="text-gray-900 font-semibold text-base mb-2 hover:text-[#7a1cac] transition-colors line-clamp-2 h-12">
              {product?.name}
            </h3>
          </Link>
          
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[#7a1cac] font-bold text-xl">
              ₹{product?.sellingPrice?.toLocaleString()}
            </span>
            {product?.mrp && product.mrp > product.sellingPrice && (
              <span className="text-gray-400 text-sm line-through">
                ₹{product.mrp.toLocaleString()}
              </span>
            )}
          </div>
          
          
        </div>

        {/* Add to Cart Button */}
        <div className="p-4 pt-0">
          <button className="w-full bg-gradient-to-r from-[#7a1cac] to-[#9c27b0] text-white py-3 px-4 rounded-lg hover:from-[#6a0caa] hover:to-[#7b1fa2] transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0">
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductBox;