// This is the modal page to show image and its description.........

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

const DetailsModal = ({ isOpen, onOpenChange, itemDetails }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="max-h-[90vh] overflow-y-auto">
      <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Image Details</AlertDialogTitle>
            <AlertDialogDescription className="font-semibold text-normal">
              {itemDetails.title}
            </AlertDialogDescription>
          </AlertDialogHeader>

          {/* Handling error using onError props of next images and using a dummy image if image loading fails */}

          <div className="bg-neutral-primary-soft block border border-default rounded-base shadow-xs">
            {!imageError ? (
              <>
                {imageLoading && (
                  <div className="flex items-center justify-center h-[400px] text-gray-500 font-medium">
                    Loading image...
                  </div>
                )}
                <Image
                  src={itemDetails.url}
                  width={400}
                  height={400}
                  alt="Image"
                  placeholder="blur"
                  blurDataURL="/placeholder.png"
                  priority
                  onError={() => setImageError(true)}
                  onLoadingComplete={() => setImageLoading(false)}
                  className={imageLoading ? "hidden" : ""}
                />
              </>
            ) : (
              <div className="flex flex-col items-center h-[400px] gap-y-4 text-red-500 font-semibold">
                <p>Failed to load image, this is a dummy image!</p>
                <Image
                  src="https://cdn.prod.website-files.com/5ff66329429d880392f6cba2/6703dc08a6a4eacccd6fd2c5_60bdda0e212247626479da02_use%2520api.png"
                  width={400}
                  height={400}
                  alt="Fallback Image"
                />
              </div>
            )}

            <div className="p-6 text-center">
              <span className="inline-flex items-center bg-brand-softer border border-brand-subtle text-fg-brand-strong text-xs font-medium px-1.5 py-0.5 rounded-sm">
                <svg
                  className="w-3 h-3 me-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18.122 17.645a7.185 7.185 0 0 1-2.656 2.495 7.06 7.06 0 0 1-3.52.853 6.617 6.617 0 0 1-3.306-.718 6.73 6.73 0 0 1-2.54-2.266c-2.672-4.57.287-8.846.887-9.668A4.448 4.448 0 0 0 8.07 6.31 4.49 4.49 0 0 0 7.997 4c1.284.965 6.43 3.258 5.525 10.631 1.496-1.136 2.7-3.046 2.846-6.216 1.43 1.061 3.985 5.462 1.754 9.23Z"
                  />
                </svg>
                <a href={itemDetails.url} target="_blank">
                  {" "}
                  {itemDetails.url}
                </a>
              </span>
              <a href={itemDetails.thumbnailUrl} target="_blank">
                <h5 className="mt-3 mb-3 font-semibold tracking-tight text-sm">
                  {itemDetails.thumbnailUrl}
                </h5>
              </a>
              <p className="text-sm">
                Id: <span className="font-semibold">{itemDetails.id}</span>
              </p>
              <p className="text-sm">
                AlbumId:{" "}
                <span className="font-semibold">{itemDetails.albumId}</span>
              </p>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DetailsModal;
