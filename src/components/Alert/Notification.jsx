import { useState } from "react";

export const Notification = (props) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;
    return (
        
        <>
        <div className="fixed inset-0 z-50 flex items-center bg-transparent p-4 justify-center">
        <div className=" rounded-2xl border border-blue-100 bg-white p-4 shadow-lg sm:p-6 lg:p-8" role="alert">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <span className="shrink-0 rounded-full bg-blue-400 p-2 text-white">
                        <svg
                            className="size-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                clipRule="evenodd"
                                d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
                                fillRule="evenodd"
                            />
                        </svg>
                    </span>

                    <p className="font-medium sm:text-lg">{props.message}!</p>
                </div>

                <button
                    onClick={handleClose}
                    className="rounded-full bg-gray-100 p-1.5 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
                    aria-label="Close"
                >
                    <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414L10 8.586z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>

            <p className="mt-4 text-gray-500">
                {props.detail}
            </p>

            <div className="mt-6 sm:flex sm:gap-4">
                <div
                    className="inline-block w-full rounded-lg bg-blue-500 px-5 py-3 text-center text-sm font-semibold text-white sm:w-auto"
                >
                    Periksa Lagi Tanggal  {props.date}
                </div>

                {/* <a
                    className="mt-2 inline-block w-full rounded-lg bg-gray-50 px-5 py-3 text-center text-sm font-semibold text-gray-500 sm:mt-0 sm:w-auto"
                    href="#"
                >
                    Mark as Read
                </a> */}
            </div>
        </div>
        </div>
        </>
    );
}