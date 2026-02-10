"use client";
import {
  getDownloadURL,
  uploadBytesResumable,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../Firebase/AuthHolder";

export const UploadVideosVV = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No file provided");
      return;
    }

    try {
      const DateNow = Date.now();
      const extension = file.name.split(".").pop();
      const name = file.name.split(".").slice(0, -1).join(".");
      const uploadFileName = `${name}_${DateNow}.${extension}`;

      // Detect content type automatically
      const metadata = { contentType: file.type };

      const storageRef = ref(storage, `AllVideos/${uploadFileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Optional: Track progress
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress.toFixed(2)}% done`);
        },
        (error) => {
          console.error("Upload failed:", error);
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (err) {
            reject(err);
          }
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};

export const UploadVideos = (file, onProgress) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No file provided");
      return;
    }

    try {
      const DateNow = Date.now();
      const extension = file.name.split(".").pop();
      const name = file.name.split(".").slice(0, -1).join(".");
      const uploadFileName = `${name}_${DateNow}.${extension}`;

      const metadata = { contentType: file.type };
      const storageRef = ref(storage, `AllVideos/${uploadFileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          if (onProgress) {
            onProgress(progress.toFixed(2)); // Send progress back
          }
        },
        (error) => {
          console.error("Upload failed:", error);
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (err) {
            reject(err);
          }
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};

export const UploadFile = (file) => {
  const DateNow = Date.now();

  return new Promise((resolve, reject) => {
    try {
      if (!file || !file.name) {
        reject("No file provided");
        return;
      }

      // Extract file details
      const extension = file.name.split(".").pop();
      const name = file.name.split(".").slice(0, -1).join(".");
      const filename = `${name}_${DateNow}.${extension}`;

      const metadata = {
        contentType: file.type || "image/jpeg",
        contentDisposition: `attachment; filename="${filename}"`, // Force download
      };

      // Firebase storage reference
      const storageRef = ref(storage, `AllImages/${filename}`);

      // Upload file with metadata
      uploadBytes(storageRef, file, metadata)
        .then(() => getDownloadURL(storageRef))
        .then((url) => resolve(url))
        .catch((error) => {
          console.error("Upload error:", error);
          reject(error);
        });
    } catch (error) {
      console.error("Unexpected error:", error);
      reject(error);
    }
  });
};

export const ProfilePicture = (CanImage, onProgress) => {
  const DateNow = Date.now();

  return new Promise((resolve, reject) => {
    try {
      if (!CanImage || !CanImage.name) {
        reject("No file provided");
        return;
      }

      let filename = CanImage.name;

      // Add timestamp to File Name
      const extension = filename.split(".").pop();
      const name = filename.split(".").slice(0, -1).join(".");
      let uploadUriX = `${name}_${DateNow}.${extension}`;

      const metadata = { contentType: CanImage.type || "image/jpeg" };
      const storageRef = ref(storage, `AllImages/${uploadUriX}`);

      // Use resumable upload to get progress
      const uploadTask = uploadBytesResumable(storageRef, CanImage, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          if (onProgress) {
            onProgress(progress.toFixed(2)); // Send progress back
          }
        },
        (error) => {
          console.error("Upload failed:", error);
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (err) {
            reject(err);
          }
        }
      );
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
};
