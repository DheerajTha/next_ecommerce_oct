import React from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { IoIosLogOut } from "react-icons/io";
import { showToast } from "@/lib/showToast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "@/store/reducer/authReducer";
import { useRouter } from "next/navigation";
import { WEBSITE_LOGIN } from "@/routes/WebsiteRoute";

const Logout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const { data: logoutResponse } = await axios.post("/api/auth/logout");
      if (!logoutResponse.success) {
        throw new Error(logoutResponse.message);
      }
      dispatch(logout());
      showToast("Logged out successfully", logoutResponse.message);
      router.push(WEBSITE_LOGIN);
    } catch (error) {
      showToast("Error", error.message);
    }
  };

  return (
    <DropdownMenuItem onClick={handleLogout}>
      <IoIosLogOut />
      Logout
    </DropdownMenuItem>
  );
};

export default Logout;
