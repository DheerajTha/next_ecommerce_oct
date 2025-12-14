import React from "react";
import { Checkbox } from "../ui/checkbox";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";
import { ADMIN_MEDIA_EDIT } from "@/routes/AdminPanelRoutes";
import { ImPencil } from "react-icons/im";
import { FaLink } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import { showToast } from "@/lib/showToast";

const MediaShow = ({  media,  handleDelete,  deleteType,  selectedMedia,  setSelectedMedia,}) => {
  const handleCheck = () => {
    if (selectedMedia.includes(media._id)) {
      setSelectedMedia(selectedMedia.filter((id) => id !== media._id));
    } else {
      setSelectedMedia([...selectedMedia, media._id]);
    }
  };

  // const handleCheck = () => {
  //   let newselectedMedia = []
  //   if (selectedMedia.includes(media._id)) {
  //     newselectedMedia= selectedMedia.filter(m => m !== media._id)
  //   } else {
  //     newselectedMedia = [...selectedMedia, media._id]
  //   }
  //   setSelectedMedia(newselectedMedia)
  // };

  const handleCopyLink = async (url) => {
    await navigator.clipboard.writeText(url);
    showToast("success", "Copied to clipboard");
  };

  return (
    <>
      <div className="border border-gray-200 dark:border-gray-900 relative group rounded overflow-hidden">
        <div className="absolute text-black flex items-center p-2 top-2 left-2 z-20 ">
          <Checkbox
            className="border border-black data-[state=checked]:bg-black data-[state=checked]:text-white"
            checked={selectedMedia.includes(media._id)}
            onCheckedChange={handleCheck}
          />
        </div>

        <div className="absolute right-2 top-2 z-20">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="w-7 h-7 flex items-center justify-center bg-gray-900 rounded-full cursor-pointer"
              >
                <BsThreeDotsVertical color="#fff" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {deleteType === "SD" && (
                <div>
                  <DropdownMenuItem
                    asChild
                    className="flex items-center gap-2 cursor-pointer"
                    
                  >
                    <Link className="flex items-center gap-2" href={ADMIN_MEDIA_EDIT(media._id)}>
                      <ImPencil size={18} />
                      <span>Edit</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => handleCopyLink(media.secure_url)}
                  >
                    <FaLink size={18} />
                    Copy Link
                  </DropdownMenuItem>
                </div>
              )}

              <DropdownMenuItem className="cursor-pointer" onClick={() => 
                handleDelete([media._id], deleteType)} >
                <IoTrashBin size={18} />
                {deleteType === "SD" ? "Move into Trash" : "Delete Parmanently"}
              </DropdownMenuItem> 
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="w-full h-[150px] sm:h-[220px] relative">
          <Image
            src={media?.secure_url}
            alt={media?.alt || "image"}
            fill
            sizes="(max-width: 640px) 120px, 150px"
            className="object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
};

export default MediaShow;
