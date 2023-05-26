import { useState } from "react";

const MAX_COUNT = 5;
const MAX_FILE_SIZE = 15;

function UploadFile() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileLimitExceeded, setFileLimitExceeded] = useState(false);

  const handleUploadFiles = (files) => {
    let limitExceeded = false;

    files.forEach((file) => {
      if (uploadedFiles.findIndex((f) => f.name === file.name) === -1) {
        const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);

        if (parseFloat(fileSizeMB) > MAX_FILE_SIZE) {
          alert(`File "${file.name}" exceeds the maximum size of ${MAX_FILE_SIZE}MB`);
          limitExceeded = true;
        } else if (uploadedFiles.length === MAX_COUNT) {
          setFileLimitExceeded(true);
        }

        if (!limitExceeded) {
          const uploaded = [
            ...uploadedFiles,
            {
              name: file.name,
              size: fileSizeMB,
            },
          ];
          setUploadedFiles(uploaded);
        }
      }
    });
  };

  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles);
  };

  return (
    <div>
      <input
        id="uploadFile"
        type="file"
        multiple
        accept="application/pdf"
        onChange={handleFileEvent}
        style={{ display: "none" }}
      />

      <label htmlFor="uploadFile">
        <a className={`btn btn-primary ${fileLimitExceeded ? "disabled" : ""}`} href>
          Upload file
        </a>
      </label>

      <div className="uploaded-files-list">
        {uploadedFiles.map((file) => (
          <div>
            {file.name} ({file.size} MB)
          </div>
        ))}
      </div>
    </div>
  );
}

export default UploadFile;
