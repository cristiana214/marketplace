/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png"];

type ImageUploaderProps = {
  id?: string;
  images: string[];
  setImages: (filenames: string[]) => void;
};

const ImageUploader = ({ id, setImages, images }: ImageUploaderProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    const newErrors: string[] = [];
    const validFiles: File[] = [];

    acceptedFiles.forEach((file) => {
      if (!ALLOWED_TYPES.includes(file.type)) {
        newErrors.push(
          `${file.name} is not a valid file type. Only JPEG and PNG are allowed.`,
        );
      } else if (file.size > MAX_FILE_SIZE) {
        newErrors.push(`${file.name} exceeds the 5MB size limit.`);
      } else {
        validFiles.push(file);
      }
    });

    setFiles((prev) => [...prev, ...validFiles]);
    setErrors((prev) => [...prev, ...newErrors]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ALLOWED_TYPES.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize: MAX_FILE_SIZE,
  });

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const removeError = (index: number) => {
    setErrors((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async () => {
    setUploading(true);

    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("file", file));
      // formData.append("id", id);
      formData.append("directory", "product");
      const response = await fetch("/api/action/upload_image/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrors((prev) => [...prev, errorData.message || "Upload failed."]);
        return;
      }

      const data = await response.json();
      toast.success("All images uploaded successfully!");
      setImages(data.files); // handle success response
      setFiles([]); // clear files after successful upload
    } catch (error) {
      setErrors((prev) => [...prev, "Error uploading files."]);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg p-4">
      <div
        {...getRootProps()}
        className="cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:bg-gray-100"
      >
        <input {...getInputProps()} />
        <p className="text-gray-500">
          Drag and drop JPEG or PNG files here, or click to select files (Max
          5MB)
        </p>
      </div>

      <h4 className="mt-4 text-lg font-medium">Images to Upload:</h4>
      <span className="text-sm">{images}</span>
      <ul className="mt-2">
        {files.map((file, idx) => (
          <li
            key={idx}
            className="mb-2 flex items-center justify-between rounded-lg bg-gray-100 p-2"
          >
            <span className="text-gray-700">
              {file.name} - {(file.size / 1024).toFixed(2)} KB
            </span>
            <Button
              onClick={() => removeFile(idx)}
              className="rounded-lg bg-red-500 px-2 py-1 text-white hover:bg-red-600"
            >
              X
            </Button>
          </li>
        ))}
      </ul>

      {errors.length > 0 && (
        <>
          <h3 className="mt-4 text-lg font-medium text-red-600">Errors:</h3>
          <ul className="mt-2">
            {errors.map((error, idx) => (
              <li
                key={idx}
                className="mb-2 flex items-center justify-between rounded-lg bg-red-100 p-2 text-red-700"
              >
                <span>{error}</span>
                <Button
                  onClick={() => removeError(idx)}
                  className="rounded-lg bg-gray-500 px-2 py-1 text-white hover:bg-gray-600"
                >
                  X
                </Button>
              </li>
            ))}
          </ul>
        </>
      )}

      <Button
        onClick={uploadFiles}
        disabled={uploading || files.length === 0}
        className={`mt-4 w-full rounded-lg px-4 py-2 font-medium text-white ${
          uploading || files.length === 0
            ? "cursor-not-allowed bg-gray-400"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {uploading ? "Uploading..." : "Upload Files"}
      </Button>
    </div>
  );
};

export default ImageUploader;
