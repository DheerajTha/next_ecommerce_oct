"use client";
import Breadcrumbs from "@/components/adminComponents/Breadcrumb";
import { ADMIN_DASHBOARD, ADMIN_PRODUCT_SHOW } from "@/routes/AdminPanelRoutes";
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
import { zSchema } from "@/lib/zodSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "@/components/Application/customButton";
import { useEffect, useState } from "react";
import slugify from "slugify";
import { showToast } from "@/lib/showToast";
import axios from "axios";
import useFetch from "@/hooks/useFetch";
import Select from "@/components/adminComponents/Select";
import Editor from "@/components/adminComponents/Editor";
import MediaModal from "@/components/adminComponents/MediaModal";
import Image from "next/image";
const breadCrumbData = [
  { href: ADMIN_DASHBOARD, label: "Home" },
  { href: ADMIN_PRODUCT_SHOW, label: "Product" },
  { href: "", label: "Add Product" },
];

const AddProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [categoryOption, setCategoryOption] = useState([]);
  const { data: getCategory } = useFetch(
    "/api/category?deleteType=SD&&size=1000"
  );

  const [open, setOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState([])

  useEffect(() => {
    if (getCategory && getCategory.success) {
      console.log(getCategory);
      const data = getCategory.data;
      const options = data.map((item) => ({
        value: item._id,
        label: item.name,
      }));
      setCategoryOption(options);
    }
  }, [getCategory]);

  const formSchema = zSchema.pick({
    name: true,
    slug: true,
    category: true,
    mrp: true,
    sellingPrice: true,
    discountPercentage: true,
    description: true,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
      category: "",
      mrp: 0,
      sellingPrice: 0,
      discountPercentage: 0,
      description: "",
    },
  });

  useEffect(() => {
    const name = form.getValues("name");
    if (name) {
      form.setValue("slug", slugify(name).toLowerCase());
    }
  }, [form.watch("name")]);

  const editor = (event, editor) => {
    const data = editor.getData();
    form.setValue("description", data);
  };

  // discount percetange calu 

  useEffect(() => {
    const mrp = form.getValues("mrp") || 0
    const sellingPrice = form.getValues("sellingPrice") || 0

    if(mrp > 0 && sellingPrice > 0){
      const percentage = ((mrp - sellingPrice)/mrp)*100;
    form.setValue("discountPercentage", Math.round(percentage))
    }
    
  }
  ),[form.watch("mrp"), form.watch("sellingPrice")]

  const handlerSubmit = async (values) => {
    setLoading(true);
    try {
      if(selectedMedia.length <=0) {
        return showToast('Error', 'Please select media')
      }

      const mediaIds = selectedMedia.map(item => item._id)
      values.media = mediaIds;
      const { data: response } = await axios.post(
        "/api/product/create", values
      );
      if (!response.success) {
        throw new Error(response.message);
      }
      form.reset();
      showToast("Success", "Category Added Successfully", "success");
    } catch (error) {
      showToast("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Breadcrumbs breadCrumbData={breadCrumbData}></Breadcrumbs>

      <Card className="py-3 rounded shadow-md">
        <CardHeader className="border-b-1 pb-4 ">
          <h4 className="font-semibold text-xl">Add Product</h4>
        </CardHeader>
        <CardContent className="mb-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handlerSubmit)}>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Name <span className="text-red-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter Name "
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="">
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Slug <span className="text-red-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter Slug "
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Category <span className="text-red-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <Select
                            options={categoryOption}
                            selected={field.value}
                            setSelected={(e) => {
                              field.onChange(e);
                            }}
                            placeholder={"Select Category"}
                            isMulti={false}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="">
                  <FormField
                    control={form.control}
                    name="mrp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Mrp <span className="text-red-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter Mrp "
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="">
                  <FormField
                    control={form.control}
                    name="sellingPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Selling Price <span className="text-red-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter Selling Price "
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="">
                  <FormField
                    control={form.control}
                    name="discountPercentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Discount Percentage{" "}
                          <span className="text-red-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            readOnly
                            placeholder="Enter Discount Percentage "
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className=" md:col-span-2 ">
                  <FormLabel className='mb-2'>Description<span className="text-red-600">*</span></FormLabel>
                  <Editor onChange={editor}  />
                  <FormMessage></FormMessage>
                </div>
              </div>

            <div className="md:col-span-2 border border-dashed rounded p-2  ">
              <MediaModal 
              open={open}
              setOpen={setOpen}
              selectedMedia={selectedMedia}
              setSelectedMedia={setSelectedMedia}
              isMultiple={true}
              
              />
            {selectedMedia.length > 0 &&
            <div className="flex justify-center items-center flex-wrap mb-3 gap-2 "> {selectedMedia.map(media => (
              <div key={media._id} className="w-24 h-24 border"> 
              <Image src={media.url}
              className="size-full object-cover" 
              alt="" 
              width={80} 
              height={80}/>
               </div>
            ) )} </div>
            }


              <div onClick={() => setOpen(true) } className=" border border-gray-400  transition-all duration-300 rounded flex justify-center items-center  w-[150px] mx-auto cursor-pointer py-5 my-3">
                <span>Select Media</span>
              </div>
            </div>

              <CustomButton
                loading={loading}
                className="cursor-pointer text-lg mt-5 py-6 px-5"
                type="submit"
                text="Add Product"
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProductPage;
