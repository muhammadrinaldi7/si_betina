import React from "react";

const LayoutAuth = ({children}) => {
    return (
        <div className="w-full bg-cover justify-center flex items-center bg-center bg-gradient-to-b from-[#EED7F5] via-[#FCCEC2] to-[#C6E1FC] min-h-screen">
           {children}
        </div>
    );
};

export default LayoutAuth