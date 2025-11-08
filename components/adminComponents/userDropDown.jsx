import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSelector } from 'react-redux'
import Link from 'next/link'
 import { MdOutlineShoppingBag, MdProductionQuantityLimits } from "react-icons/md";
import Logout from './Logout'

const UserDropDown = () => {
  const auth= useSelector((store) =>store.authStore.auth)
  return (
    <DropdownMenu>
  <DropdownMenuTrigger asChild>
<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
 </Avatar>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="mr-5 w-44 " >
    <DropdownMenuLabel>
    <p className='font-bold uppercase text-md '> {auth?.name} </p>
    </DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem asChild>
      
      <Link href="#">
      <MdProductionQuantityLimits />
      New Product</Link>
    </DropdownMenuItem >
    <DropdownMenuItem asChild>
      
      <Link href="#"> <MdOutlineShoppingBag /> 
      Order</Link>
    </DropdownMenuItem>

    <Logout />
    
  </DropdownMenuContent>
</DropdownMenu>
  )
}

export default UserDropDown