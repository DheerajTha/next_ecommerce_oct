"use client";
import Breadcrumbs from "@/components/adminComponents/Breadcrumb";
import MediaShow from "@/components/adminComponents/Media";
import UploadMedia from "@/components/adminComponents/uploadMedia";
import CustomButton from "@/components/Application/customButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import useDeleteMutation from "@/hooks/useDeleteMutation";
import { ADMIN_DASHBOARD, ADMIN_MEDIA_SHOW } from "@/routes/AdminPanelRoutes";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const breadCrumbData = [
  { href: ADMIN_DASHBOARD, label: "Home" },
  { href: "", label: "Media" },
];

const MediaClient = () => {
  const queryClient = useQueryClient();
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [deleteType, setDeleteType] = useState("SD");
  const [selectAll, setSelectAll] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams) {
      const trashOf = searchParams.get("trashof");
      setSelectedMedia([]);
      if (trashOf) {
        setDeleteType("PD");
      } else {
        setDeleteType("SD");
      }
    }
  }, [searchParams]);

  const fetchMedia = async (page, deleteType) => {
    const { data: response } = await axios.get(
      `/api/media?page=${page}&&limit=10&&deleteType=${deleteType}`
    );
    return response;
  };

  const { data, error, fetchNextPage, hasNextPage, isFetching, status } =
    useInfiniteQuery({
      queryKey: ["media-data", deleteType],
      queryFn: async ({ pageParam }) => await fetchMedia(pageParam, deleteType),
      initialPageParam: 0,
      getNextPageParam: (lastPage, pages) => {
        const nextPage = pages.length;
        return lastPage.hasMore ? nextPage : undefined;
      },
    });

  const deleteMutation = useDeleteMutation("media-data", "/api/media/delete");

  const handleDelete = (ids, deleteType) => {
    let c = true;
    if (deleteType === "PD") {
      c = confirm("Are you sure to want to delete the data permanently");
    }
    if (c) {
      deleteMutation.mutate({ ids, deleteType });
    }
    setSelectAll(false);
    setSelectedMedia([]);
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  useEffect(() => {
    if (selectAll) {
      const ids = data.pages.flatMap((page) =>
        page.mediaData.map((media) => media._id)
      );
      setSelectedMedia(ids);
    } else {
      setSelectedMedia([]);
    }
  }, [selectAll]);
  return (
    <div>
      <Breadcrumbs breadCrumbData={breadCrumbData} />
      <Card className="py-3 rounded shadow-md">
        <CardHeader className="border-b-1 pb-4 ">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-3xl uppercase">
              {deleteType === "SD" ? "Media" : "Media Trash"}
            </h4>
            <div className="flex items-center gap-5">
              {deleteType === "SD" && (
                <UploadMedia isMultiple={true} queryClient={queryClient} />
              )}
              <div className="flex gap-3">
                {deleteType === "SD" ? (
                  <Button type="button">
                    <Link href={`${ADMIN_MEDIA_SHOW}?trashof=media`}>
                      {" "}
                      Trash{" "}
                    </Link>
                  </Button>
                ) : (
                  <Button type="button" variant="secondary">
                    <Link href={`${ADMIN_MEDIA_SHOW}`}> Back To Media </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="mb-2">
          {selectedMedia.length > 0 && (
            <div className="py-2 px-2 border bg-gray-600  mt-2 mb-2 rounded flex justify-between text-black items-center">
              <Label>
                <Checkbox
                  checked={selectAll}
                  onCheckedChange={handleSelectAll}
                  className="border  border-black data-[state=checked]:bg-black data-[state=checked]:text-black"
                />
                select All
              </Label>
              <div className="flex gap-2">
                {deleteType === "SD" ? (
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(selectedMedia, deleteType)}
                  >
                    Move into Trash
                  </Button>
                ) : (
                  <>
                    <Button
                      className="bg-green-500 hover:bg-green-900"
                      onClick={() => handleDelete(selectedMedia, "RSD")}
                    >
                      Restore
                    </Button>

                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(selectedMedia, "PD")}
                    >
                      Delete Permanently
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}

          {status === "pending" ? (
            <div>Loading ....</div>
          ) : status === "error" ? (
            <div className=" text-red-600 pb-6 text-sm"> {error.message} </div>
          ) : (
            <>
              {data?.pages?.flatMap(
                (page) => page.mediaData?.map((media) => media._id) || []
              ).length === 0 && (
                <div className="text-center text-red-500">No Data Found</div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-7">
                {data?.pages?.map((page, index) => (
                  <React.Fragment key={index}>
                    {page?.mediaData?.map((media) => (
                      <MediaShow
                        key={media._id}
                        media={media}
                        handleDelete={handleDelete}
                        deleteType={deleteType}
                        selectedMedia={selectedMedia}
                        setSelectedMedia={setSelectedMedia}
                      />
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </>
          )}

          <div className="mt-5">
            {hasNextPage && (
              <CustomButton
                type="button"
                loading={isFetching}
                onClick={() => fetchNextPage()}
                text="Load More"
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaClient;
