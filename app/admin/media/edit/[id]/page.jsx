"use client";
import Breadcrumbs from "@/components/adminComponents/Breadcrumb";
import CustomButton from "@/components/Application/customButton";
 import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useFetch from "@/hooks/useFetch";
import { showToast } from "@/lib/showToast";
import { zSchema } from "@/lib/zodSchema";
import { ADMIN_DASHBOARD, ADMIN_MEDIA_SHOW } from "@/routes/AdminPanelRoutes";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const breadCrumbData = [
  { href: ADMIN_DASHBOARD, label: "Home" },
  { href: ADMIN_MEDIA_SHOW, label: "Media" },
  { href: "", label: "Edit Media" },
];

const EditPage = ({ params }) => {
  const { id } = use(params); 
  const { data: mediaData } = useFetch(`/api/media/get/${id}`);
  const [loading, setLoading] = useState(false);

  const formSchema = zSchema.pick({
    _id: true,
    alt: true,
    title: true,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      _id: "",
      alt: "",
      title: "",
    },
  });

  useEffect(() => {
    if (mediaData && mediaData.success) {
      const data = mediaData.data;
      form.reset({
        _id: data._id,
        alt: data.alt,
        title: data.title,
      });
    }
  }, [mediaData]);

  const handlerEditSubmit = async (values) => {
    try {
      setLoading(true);
      const { data: response } = await axios.put("/api/media/update/", values);
      if (!response.success) {
        throw new Error(response.message);
      }
      showToast("success", response.message);
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Breadcrumbs breadCrumbData={breadCrumbData} />
      <Card className="py-3 rounded shadow-md">
        <CardHeader className="border-b-1 pb-4 ">
          <h4 className="font-semibold text-xl">Edit Media</h4>
        </CardHeader>
        <CardContent className="mb-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handlerEditSubmit)}
              className="space-y-8"
            >
              {mediaData?.data?.secure_url ? (
                <Image
                  src={mediaData.data.secure_url}
                  width={400}
                  height={400}
                  alt={mediaData?.data?.alt || "image"}
                  className="rounded-md"
                />
              ) : (
                <div className="w-[400px] h-[400px] bg-gray-100 flex items-center justify-center rounded-md">
                  <span className="text-gray-400">Loading image...</span>
                </div>
              )}

              <div className="mb-5 mt-5">
                <FormField
                  control={form.control}
                  name="alt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ALt</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter Alt "
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-5 mt-5">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter Title "
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* <Button type="submit">Submit</Button> */}
              <CustomButton
                loading={loading}
                className="w-full cursor-pointer text-lg py-6 px-5"
                type="submit"
                text="Update Media"
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditPage;
