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

// Function to get the cropped image as a Data URL
const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number }
): Promise<string | null> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

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

  // Convert canvas to Data URL and return it
  return new Promise((resolve) => {
    const dataUrl = canvas.toDataURL("image/jpeg");
    resolve(dataUrl);
  });
};

// Function to convert a Data URL to a Blob
const dataURLtoBlob = (dataURL: string): Blob => {
  const arr = dataURL.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
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
  const [cropData, setCropData] = useState<{ croppedAreaPixels: { x: number; y: number; width: number; height: number } } | null>(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null); // State for cropped image preview

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
    setCropData({ croppedAreaPixels });
    if (image) {
      const croppedImageUrl = await getCroppedImg(image, croppedAreaPixels);
      setCroppedImageUrl(croppedImageUrl); // Set the cropped image URL for preview
    }
  };

  const handleUpload = async () => {
    if (cropData && image) {
      const croppedImageBlob = await getCroppedImg(image, cropData.croppedAreaPixels);
      if (croppedImageBlob) {
        const blob = dataURLtoBlob(croppedImageBlob); // Convert the cropped image data URL to Blob
        const formData = new FormData();
        formData.append("image", blob, "profile.jpg"); // Append the Blob to FormData
        
        // Pass the form data to the parent component for uploading
        onUpload(formData);
        onOpenChange(); // Close the modal after upload
      }
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
        <p>Drag 'n' drop your profile picture here, or click to select one.</p>
      </div>

      {/* Preview of Cropped Image Below the Upload Tool */}
      {/* {croppedImageUrl && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <h4>Preview:</h4>
          <img src={croppedImageUrl} alt="Cropped Profile Preview" className="" style={{ maxWidth: "200px", borderRadius: "50%" }} />
        </div>
      )} */}

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
                <div onClick={onOpenChange} className="p-0.5 relative hover:scale-110 active:scale-90 transition-all duration-300 ease-in-out cursor-pointer rounded-full">
                  <MdOutlineClose size={25} />
                </div>
              </ModalHeader>
              <ModalBody className="flex flex-col gap-6 justify-center items-center">
                {image && (
                  <div style={{ position: "relative", width: "100%", height: "400px", overflow: "hidden", display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
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
                <Button onClick={handleUpload} className="self-end" size="sm">Done</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
