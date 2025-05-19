import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

type NotificationProps = {
  success?: boolean;
  message: string;
  onClose?: () => void;
};

export default function Notification({ success = true, message = "", onClose }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [message]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-50 max-w-md transform transition-all duration-300 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
      }`}
    >
      <div className={`flex items-start rounded-md p-4 shadow-lg ${success ? "bg-green-50" : "bg-red-50"}`}>
        <div className="flex-shrink-0">
          {success ? (
            <FaCheckCircle className="h-5 w-5 text-green-400" />
          ) : (
            <FaTimesCircle className="h-5 w-5 text-red-400" />
          )}
        </div>
        <div className="ml-3">
          <p className={`text-sm font-medium ${success ? "text-green-800" : "text-red-800"}`}>{message}</p>
        </div>
        <div className="ml-auto pl-3">
          <button
            onClick={() => {
              setIsVisible(false);
              if (onClose) onClose();
            }}
            className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              success
                ? "text-green-500 hover:bg-green-100 focus:ring-green-600 focus:ring-offset-green-50"
                : "text-red-500 hover:bg-red-100 focus:ring-red-600 focus:ring-offset-red-50"
            }`}
          >
            <span className="sr-only">Dismiss</span>
            <IoMdClose className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
