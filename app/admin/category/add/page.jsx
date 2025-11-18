"use client";
import Breadcrumbs from "@/components/adminComponents/Breadcrumb";
import {
  ADMIN_CATEGORY_SHOW,
  ADMIN_DASHBOARD,
} from "@/routes/AdminPanelRoutes";
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
import { use, useEffect, useState } from "react";
import slugify from "slugify";
import { showToast } from "@/lib/showToast";
import axios from "axios";
const breadCrumbData = [
  { href: ADMIN_DASHBOARD, label: "Home" },
  { href: ADMIN_CATEGORY_SHOW, label: "Category" },
  { href: "", label: "Add Category" },
];

const AddCategoryPage = () => {
  const [loading, setLoading] = useState(false);

  const formSchema = zSchema.pick({
    name: true,
    slug: true,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  useEffect(() => {
    const name = form.getValues('name')
    if(name){
        form.setValue('slug', slugify(name).toLowerCase())
    }

  }, [form.watch('name')]);

  const handlerSubmit = async (values) => {
    setLoading(true);
    try {
        const {data: response } = await axios.post('/api/category/create', values);
        if(!response.success){
            throw new Error(response.message)
        }
        form.reset()
        showToast("Success", 'Category Added Successfully', 'success')
    } catch (error) {
        showToast("Error", error.message)
    }finally{
        setLoading(false)
    }

  };

  return (
    <div>
      <Breadcrumbs breadCrumbData={breadCrumbData}></Breadcrumbs>

      <Card className="py-3 rounded shadow-md">
        <CardHeader className="border-b-1 pb-4 ">
          <h4 className="font-semibold text-xl">Add Category</h4>
        </CardHeader>
        <CardContent className="mb-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handlerSubmit)}
              className="space-y-8"
            >
              <div className="mb-5 mt-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter Category "
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
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
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

              {/* <Button type="submit">Submit</Button> */}
              <CustomButton
                loading={loading}
                className="w-full cursor-pointer text-lg py-6 px-5"
                type="submit"
                text="Add Category"
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddCategoryPage;
