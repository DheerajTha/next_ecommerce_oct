"use client";
import React from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "../ui/button";
import { MdFilter9Plus } from "react-icons/md";
import { showToast } from "@/lib/showToast";
import { AiFillPlusSquare } from "react-icons/ai";
import axios from "axios";

const UploadMedia = ({ isMultiple }) => {
  const handleOnError = (error) => {
    showToast("error", error.statusText);
  };
  const handleQueueEnd = async (results) => {
    const files = results.info.files;
    const uploadedFiles = files
      .filter((file) => file.uploadInfo)
      .map((file) => ({
        asset_id: file.uploadInfo.asset_id,
        public_id: file.uploadInfo.public_id,
        path: file.uploadInfo.path || file.uploadInfo.secure_url,
        thumbnail_url: file.uploadInfo.thumbnail_url || file.uploadInfo.secure_url,
      }));

    if (uploadedFiles.length > 0) {
      try {
        const { data: mediaUploadResponse } = await axios.post(
          "/api/media/create",
          uploadedFiles
        );
        if (!mediaUploadResponse.success) {
          throw new Error(mediaUploadResponse.message);
        }
        showToast("success", mediaUploadResponse.message);
      } catch (error) {
        showToast("error", error.message);
      }
    }
  };
  return (
    <CldUploadWidget
      signatureEndpoint="/api/cloudinary-signature"
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESETS}
      onError={handleOnError}
      onQueuesEnd={handleQueueEnd}
      config={{
        cloud: {
          cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
          apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
        },
      }}
      options={{
        multiple: isMultiple,
        sources: ["local", "url", "unsplash", "google_drive"],
      }}
    >
      {({ open }) => {
        return (
          <Button onClick={() => open()}>
            <AiFillPlusSquare />
            Upload an Image
          </Button>
        );
      }}
    </CldUploadWidget>
  );
};

export default UploadMedia;
