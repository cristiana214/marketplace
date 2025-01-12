/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { Button } from "../ui/button";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit
const ALLOWED_TYPES = ["image/jpeg", "image/png"];

const ImageUploader: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    const newErrors: string[] = [];
    const validFiles: File[] = [];

    // validate files
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

    // update state with valid files and errors
    setFiles((prev) => [...prev, ...validFiles]);
    setErrors((prev) => [...prev, ...newErrors]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
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
      const uploadPromises = files.map(async (file) => {
        const { data } = await axios.post("/api/upload", {
          name: file.name,
          type: file.type,
        });

        // Use the signed URL to upload the file directly to S3
        await axios.put(data.signedUrl, file, {
          headers: { "Content-Type": file.type },
        });

        return data.fileName;
      });

      const uploadedFileNames = await Promise.all(uploadPromises);
      console.log("Uploaded files:", uploadedFileNames);
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #ccc",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        <p>
          Drag and drop JPEG or PNG files here, or click to select files (Max
          5MB)
        </p>
      </div>

      <h3>Files to Upload:</h3>
      <ul>
        {files.map((file, idx) => (
          <li
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "5px",
            }}
          >
            {file.name} - {(file.size / 1024).toFixed(2)} KB
            {/* added an X button next to each file in the file list. */}
            {/* clicking the button removes the file from the files state */}
            <Button
              onClick={() => removeFile(idx)}
              style={{
                marginLeft: "10px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              X
            </Button>
          </li>
        ))}
      </ul>

      {errors.length > 0 && (
        <>
          <h3 style={{ color: "red" }}>Errors:</h3>
          <ul>
            {errors.map((error, idx) => (
              <li
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "5px",
                  color: "red",
                }}
              >
                {error}
                <Button
                  onClick={() => removeError(idx)}
                  style={{
                    marginLeft: "10px",
                    backgroundColor: "gray",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
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
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          backgroundColor: "#0070f3",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        {uploading ? "Uploading..." : "Upload Files"}
      </Button>
    </div>
  );
};

export default ImageUploader;
