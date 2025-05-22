import { useState, useRef } from 'react';
import { FaUpload, FaFile, FaTimes, FaDownload } from 'react-icons/fa';
import { DotLoader } from 'react-spinners';
import { customFile } from '../types';
import Notification from './Notification';
const DragDropFileUpload = ({ 
  file, 
  setFile, 
  files, 
  uploadLoading, 
  onUpload, 
  onRemove 
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [notification, setNotification] = useState({ success: false, message: "", show: false });
  const fileInputRef = useRef(null);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
      }
      e.dataTransfer.clearData();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
      }
    }
  };

  const validateFile = (file) => {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf', 
                         'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      setNotification({success: false, message: 'Nepodporovaný typ súboru. Podporované sú: PNG, JPEG, JPG, PDF, DOC, DOCX', show: true});
      return false;
    }
    
    return true;
  };

  const handleUpload = async () => {
    if (!file) {
      setNotification({success: false, message: 'Prosím vyberte súbor', show: true});
      return;
    }
    
    await onUpload();
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <>
    <Notification
        success={notification.success}
        message={notification.message}
        onClose={() => setNotification((prev) => ({ ...prev, show: false }))}/>
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Nahraj súbor</h2>
      
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 mb-4
          ${isDragOver 
            ? 'border-blue-400 bg-blue-50 scale-105' 
            : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400'
          }
        `}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className={`p-4 rounded-full transition-colors duration-200 ${
            isDragOver ? 'bg-blue-100' : 'bg-gray-200'
          }`}>
            <FaUpload className={`w-8 h-8 ${isDragOver ? 'text-blue-500' : 'text-gray-500'}`} />
          </div>
          
          <div>
            <p className={`text-lg font-medium transition-colors duration-200 ${
              isDragOver ? 'text-blue-600' : 'text-gray-600'
            }`}>
              {isDragOver ? 'Pustite súbor sem' : 'Pretiahni súbor sem alebo klikni na výber'}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Podporované formáty: PNG, JPEG, JPG, PDF, DOC, DOCX
            </p>
            <p className="text-sm text-gray-500">
              Maximálna veľkosť: 2MB
            </p>
          </div>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept=".png,.jpeg,.jpg,.doc,.docx,.pdf"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      
      {file && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FaFile className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">{file.name}</p>
                <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setFile(null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
              }}
              className="p-1 hover:bg-blue-200 rounded-full transition-colors duration-200"
            >
              <FaTimes className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center mb-6 space-x-4">
        <button
          onClick={handleUpload}
          disabled={!file || uploadLoading}
          className={`
            flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-all duration-200
            ${!file || uploadLoading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white hover:shadow-md'
            }
          `}
        >
          {uploadLoading ? (
            <>
              <DotLoader size={15} color="#ffffff" />
              <span>Nahrávam...</span>
            </>
          ) : (
            <>
              <FaUpload className="w-4 h-4" />
              <span>Nahraj</span>
            </>
          )}
        </button>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">Súbory ({files.length})</h3>
        <div className="max-h-80 overflow-y-auto space-y-3">
          {files.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Žiadne súbory neboli nahrané</p>
          ) : (
            files.map((file: customFile) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  <FaFile className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500">Súbor je pripravený na stiahnutie</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <a
                    href={`${import.meta.env.VITE_URL}storage/${file.path}`}
                    className="flex items-center space-x-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm transition-colors duration-200"
                  >
                    <FaDownload className="w-4 h-4" />
                    <span>Stiahnúť</span>
                  </a>
                  <button
                    onClick={() => onRemove(file.id)}
                    className="flex items-center space-x-1 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm transition-colors duration-200"
                  >
                    <FaTimes className="w-4 h-4" />
                    <span>Odstrániť</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default DragDropFileUpload;