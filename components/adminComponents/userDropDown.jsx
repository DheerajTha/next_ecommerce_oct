import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSelector } from "react-redux";

import Logout from "./Logout";
import { FaRegUserCircle } from "react-icons/fa";


const UserDropDown = () => {
  const auth = useSelector((store) => store.authStore.auth);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <FaRegUserCircle  className="text-xl cursor-pointer" size={27} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-5 w-44 ">
        <DropdownMenuLabel>
          <p className="font-bold uppercase text-md "> {auth?.name} </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          
        </DropdownMenuItem>

        <Logout className='cursor-pointer'/>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropDown;
