import { useState, useRef } from "react";
import axios from "axios";
import "./UploadForm.css";

function UploadForm() {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);
    const handleFiles = (event) => {
        const selectedFiles = Array.from(event.target.files);
        const wordFiles = selectedFiles.filter(
            (file) =>
                file.name.endsWith(".doc") ||
                file.name.endsWith(".docx")
        );
        setFiles(wordFiles);
    };
    const removeFile = (index) => {

        const updatedFiles = files.filter(
            (_, i) => i !== index
        );
        setFiles(updatedFiles);
    };
    const uploadFiles = async () => {
        if (files.length === 0) {
            alert("Please select documents");
            return;
        }
        const formData = new FormData();
        files.forEach((file) => {

            formData.append(
                "files",
                file
            );
        });
        try {
            setUploading(true);
            await axios.post(
                "http://localhost:5000/api/upload",
                formData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data"
                    }
                }
            );
            alert(
                "Files uploaded successfully"
            );
            // Reset upload section
            setFiles([]);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
        catch (error) {
            console.log(
                "Upload Error:",
                error
            );
            alert(
                "File upload failed"
            );
        }
        finally {
            setUploading(false);
        }
    };
    return (
        <div className="upload-card">
            <h2>
                Upload Design Documents
            </h2>
            <label className="upload-box">
                <div className="upload-icon">
                    ⬆
                </div>
                <p>
                    Click here to select documents
                </p>
                <span>
                    Supported formats: DOC, DOCX
                </span>
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".doc,.docx"
                    onChange={handleFiles}
                />
            </label>
            {
                files.length > 0 &&
                <div className="file-section">
                    <h3>
                        Selected Files
                    </h3>
                    {
                        files.map(
                            (file, index) => (
                                <div className="file-item" key={index}>
                                    <div>
                                        📄 {file.name}
                                        <small>
                                            {
                                                (
                                                    file.size /
                                                    1024
                                                ).toFixed(2)
                                            }
                                            KB
                                        </small>
                                    </div>
                                    <button
                                        onClick={() =>
                                            removeFile(index)
                                        }
                                    >
                                        Remove
                                    </button>
                                </div>
                            )
                        )
                    }
                </div>
            }
            <button

                className="upload-btn"

                onClick={uploadFiles}

                disabled={uploading}
            >
                {
                    uploading
                        ?
                        "Uploading..."
                        :
                        "Upload Documents"
                }
            </button>
        </div>
    );
}
export default UploadForm;