import React from 'react'
import { Input } from '../ui/input'
import { FaSearchengin } from "react-icons/fa6";

const Searchbar = () => {
  return (
    <div className="w-full md:w-[350px]">
      <div className="relative flex items-center">
        <Input
          className="rounded-full pr-10"
          placeholder="Search"
          type="text"
          readOnly
        />
        <button className="absolute right-2 text-xl text-gray-500 hover:text-gray-700 transition">
          <FaSearchengin />
        </button>
      </div>
    </div>
  )
}

export default Searchbar
