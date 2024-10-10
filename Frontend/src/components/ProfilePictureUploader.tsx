"use client";

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Cropper from "react-easy-crop";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import Button from "./utils/Button";
import Input from "./utils/Input"; // Ensure this is imported correctly
import { MdOutlineClose } from "react-icons/md";

// Utility function to create an image from a URL
const createImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = url;
    image.onload = () => {
      resolve(image);
    };
  });
};

// Function to get the cropped image as a Blob
const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number }
): Promise<string> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Set the canvas dimensions
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Draw the cropped image
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve) => {
    // Convert canvas to Blob and then to URL
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(URL.createObjectURL(blob));
      } else {
        resolve("");
      }
    }, "image/jpeg");
  });
};

// Define props for the ProfilePictureUploader component
interface ProfilePictureUploaderProps {
  onUpload: (formData: FormData) => void; // Prop to pass the form data to the parent
}

// Main ProfilePictureUploader component
export default function ProfilePictureUploader({ onUpload }: ProfilePictureUploaderProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [cropData, setCropData] = useState<any>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
      onOpen(); // Open the modal when an image is uploaded
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = async (
    croppedArea: any,
    croppedAreaPixels: { x: number; y: number; width: number; height: number }
  ) => {
    setCropData({ croppedArea, croppedAreaPixels, zoom });
    const croppedImageUrl = await getCroppedImg(image!, croppedAreaPixels);
    console.log(croppedImageUrl); // Cropped image URL for further processing
  };

  const handleUpload = async () => {
    if (cropData) {
      const formData = new FormData();
      const imageBlob = dataURLtoBlob(image!);
      formData.append("image", imageBlob, "profile.jpg");
      formData.append("cropData", JSON.stringify(cropData));
      
      // Pass the form data to the parent component via the onUpload prop
      onUpload(formData);

      onOpenChange.bind(false); // Close the modal after upload
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/gif': [],
      'image/webp': [],
      'image/svg+xml': [],
      'image/bmp': [],
      'image/tiff': [],
      'image/x-icon': []
    }
  });

  return (
    <>
      <div {...getRootProps()} style={{ border: "2px dashed #ccc", padding: "20px", textAlign: "center" }}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some your profile picture here, or click to select one.</p>
      </div>

      <Modal
        size="3xl"
        hideCloseButton
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-row justify-between items-center">
                <h3 className="text-2xl tracking-wide">Edit Your Profile Picture</h3>
                <div onClick={onOpenChange.bind(false)} className="p-0.5 relative hover:scale-110 active:scale-90 transition-all duration-300 ease-in-out cursor-pointer rounded-full">
                  <MdOutlineClose size={25} />
                </div>
              </ModalHeader>
              <ModalBody className="flex flex-col gap-6 justify-center items-center">
                {image && (
                  <div style={{ position: "relative", width: "-webkit-fill-available", height: "400px", overflow: "hidden", display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
                    <Cropper
                      image={image}
                      crop={crop}
                      zoom={zoom}
                      aspect={1} // Maintain a square aspect ratio
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={handleCropComplete}
                      cropShape="round"
                      zoomSpeed={0.1}
                      style={{
                        containerStyle: {
                          width: "100%", // Fill the full width
                          height: "100%", // Fill the full height
                        },
                        cropAreaStyle: {
                          borderRadius: "50%", // Make crop area circular
                          width: "100%", // Ensure crop area takes full width
                          height: "100%", // Ensure crop area takes full height
                          backgroundColor: "transparent", // Hide the background
                          padding: 0,
                          border: "none", // Remove any borders
                        },
                        mediaStyle: {
                          padding: 0
                        }
                      }}
                    />
                  </div>
                )}
              </ModalBody>
              <ModalFooter className="flex flex-col gap-5 justify-center items-center">
                <Button onClick={handleUpload}>Edit</Button> {/* Updated button text */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

// Utility function to convert Data URL to Blob
const dataURLtoBlob = (dataURL: string) => {
  const arr = dataURL.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};
