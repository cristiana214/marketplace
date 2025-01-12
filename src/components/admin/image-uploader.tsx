/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { Button } from "@/components/ui/button";

// constants for file validation

const MAX_FILE_SIZE = 5 * 1024 * 1024; // maximum file size: 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png"]; // allowed file types: JPEG and PNG

/**
 * ImageUploader Component
 * - allows users to upload multiple images via drag-and-drop.
 * - validates file size and type.
 * - provides functionality to remove files and error messages dynamically.
 */
type ImageUploaderProps = {
  id: string;
};
const ImageUploader = ({ id }: ImageUploaderProps) => {
  // state to store valid files
  const [files, setFiles] = useState<File[]>([]);

  // state to store error messages for invalid files
  const [errors, setErrors] = useState<string[]>([]);

  // state to manage upload progress
  const [uploading, setUploading] = useState(false);

  /**
   * handles file drop event.
   * - filters valid files based on size and type.
   * - updates state with valid files and error messages for invalid ones.
   */
  const onDrop = (acceptedFiles: File[]) => {
    const newErrors: string[] = []; // temporary array for storing new error messages
    const validFiles: File[] = []; // temporary array for storing valid files

    // validate each file
    acceptedFiles.forEach((file) => {
      if (!ALLOWED_TYPES.includes(file.type)) {
        newErrors.push(
          `${file.name} is not a valid file type. Only JPEG and PNG are allowed.`,
        );
      } else if (file.size > MAX_FILE_SIZE) {
        newErrors.push(`${file.name} exceeds the 5MB size limit.`);
      } else {
        validFiles.push(file); // add valid files to the array
      }
    });

    // update state with new valid files and errors
    setFiles((prev) => [...prev, ...validFiles]); // append valid files to the existing list
    setErrors((prev) => [...prev, ...newErrors]); // append new errors to the existing list
  };

  // initialize react-dropzone with validation settings
  const { getRootProps, getInputProps } = useDropzone({
    onDrop, // function to handle file drops
    accept: ALLOWED_TYPES.reduce((acc, type) => ({ ...acc, [type]: [] }), {}), // allowed file types
    maxSize: MAX_FILE_SIZE, // maximum file size in bytes
  });

  /**
   * removes a specific file from the `files` state.
   * @param index - index of the file to be removed
   */
  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  /**
   * removes a specific error message from the `errors` state.
   * @param index - index of the error message to be removed
   */
  const removeError = (index: number) => {
    setErrors((prev) => prev.filter((_, i) => i !== index));
  };

  /**
   * uploads all files to the server.
   * - uses a signed URL for secure uploads to AWS S3.
   */
  const uploadFiles = async () => {
    setUploading(true); // set uploading state to true

    try {
      // upload each file asynchronously
      const uploadPromises = files.map(async (file) => {
        // request a signed URL from the server
        const { data } = await axios.post("/api/action/upload_image", {
          name: file.name,
          type: file.type,
          size: file.size,
          id,
        });

        // use the signed URL to upload the file directly to S3
        await axios.put(data.signedUrl, file, {
          headers: { "Content-Type": file.type }, // set the correct Content-Type header
        });

        return data.fileName; // return the uploaded file's name or path
      });

      // wait for all uploads to complete
      const uploadedFileNames = await Promise.all(uploadPromises);
      console.log("Uploaded files:", uploadedFileNames); // log the uploaded file names
    } catch (error) {
      console.error("Error uploading files:", error); // handle upload errors
    } finally {
      setUploading(false); // reset uploading state
    }
  };

  return (
    <div className="mx-auto max-w-lg p-4">
      {/* dropzone for file upload */}
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

      {/* list of files to be uploaded */}
      <h3 className="mt-4 text-lg font-medium">Files to Upload:</h3>
      <ul className="mt-2">
        {files.map((file, idx) => (
          <li
            key={idx}
            className="mb-2 flex items-center justify-between rounded-lg bg-gray-100 p-2"
          >
            <span className="text-gray-700">
              {file.name} - {(file.size / 1024).toFixed(2)} KB
            </span>
            {/* remove file button */}
            <Button
              onClick={() => removeFile(idx)}
              className="rounded-lg bg-red-500 px-2 py-1 text-white hover:bg-red-600"
            >
              X
            </Button>
          </li>
        ))}
      </ul>

      {/* list of error messages */}
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
                {/* remove error button */}
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

      {/* upload button */}
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
