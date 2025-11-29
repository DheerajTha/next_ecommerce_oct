import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import axios from "axios";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import ModalMediaBlock from "./ModalMediaBlock";
import { showToast } from "@/lib/showToast";

const MediaModal = ({
  open,
  setOpen,
  selectedMedia,
  setSelectedMedia,
  isMultiple,
}) => {

    const [periovesly, setPeriovesly] = useState([]);

    const fetchMedia = async (page) => {
        const {data: response}  = await axios.get(`/api/media?page=${page}&&limit=18&&deleteType=SD`)
        return response;
    }

    const {ispending,isError, error, data, isFetching, fetchNextPage, hasNextPage} = useInfiniteQuery({
        queryKey:['MediaModal'],
        queryFn: async ({pageParam}) => await fetchMedia(pageParam),
        placeholderData: keepPreviousData,
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = allPages.length
        return lastPage.hasMore ? nextPage : undefined;
        }
            
    })    

    const handleClear = ()=> {
        setSelectedMedia([]);
        setPeriovesly([]);
        showToast('All cleared', 'success')
    }

    const handleClose = () => {
        setSelectedMedia(periovesly);
        setOpen(false);
    }

    const handleSelect = () => {
        if(selectedMedia.length <= 0){
            return showToast("Please select a media", 'warning')
        }
        setPeriovesly(selectedMedia)
        setOpen(false);
    }

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="sm:max-w-[80%] h-screen p-0 py-10 bg-transparent border-0 shadow-none "
      >
        <DialogDescription className="hidden"></DialogDescription>

        <div className="h-[90vh] bg-amber-50 rounded shadow ">
          <DialogHeader className="h-7 p-5 border-b border-gray-100 mb-5">
            <DialogTitle>Media</DialogTitle>
          </DialogHeader>

          <div className="h-[calc(100%-8rem)] px-7">
                {
                    ispending ? 
                  ( <div className="size-full flex justify-center items-center">
                    <Image src='/assets/images/loading.svg' alt="Loading" width={80} height={80} />
                  </div>)

                        :
                    isError ?
                    <div>
                        <span>{error.message} </span>
                    </div>
                    :
                    <>
                    <div className="grid lg:grid-cols-5 grid-cols-3 gap-3">

                    {data?.pages?.map((page, index) => (
                  <React.Fragment key={index}>
                    {page?.mediaData?.map((media) => (
                      <ModalMediaBlock 
                       key={media._id}
                       media={media}
                       selectedMedia={selectedMedia}
                       setSelectedMedia={setSelectedMedia}
                       isMultiple={isMultiple}

                      />
                      
                    ))}
                  </React.Fragment>
                ))}

                    </div>
                    </>
                    
                }
          </div>

          <div className="h-10 pt-2 px-5 border-t flex justify-between  ">
            <div>
                <Button  type="button" variant='outline' onClick={handleClear}  >
                  Clear All
                </Button>
            </div>
            <div className="flex gap-5">
                <div className="flex gap-3">
                <Button  type="button" variant='secondary' onClick={handleClose}  >
                  Close
                </Button>
            </div>
            <div className="flex gap-3">
                <Button  type="button" variant='default' onClick={handleSelect}  >
                  Select
                </Button>
            </div>
            </div>
          </div>


        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MediaModal;
