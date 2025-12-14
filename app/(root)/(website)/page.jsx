import HomeSlider from "@/components/website/HomeSlider";
import Link from "next/link";
import React from "react";
import banner1 from "@/public/assets/images/banner1.png";
import banner2 from "@/public/assets/images/banner2.png";
import Image from "next/image";
import FeatureProduct from "@/components/website/featureProduct";
import FooterBanner from "@/components/website/FooterBanner";
const Home = () => {
  return (
    <div>
      <div>
        <HomeSlider />
      </div>
      <section className="lg:px-32 px-4 sm:pt-20 pt-5 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
          {/* Banner 1 */}
          <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-500 border border-gray-200">
            <Link href="#">
              <Image
                src={banner1}
                alt="Banner 1"
                width={banner1.width}
                height={banner1.height}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
            {/* Optional overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          {/* Banner 2 */}
          <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-500 border border-gray-200">
            <Link href="#">
              <Image
                src={banner2}
                alt="Banner 2"
                width={banner2.width}
                height={banner2.height}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>
      </section>
      <FeatureProduct/>
      <FooterBanner/>
    </div>
  );
};

export default Home;
