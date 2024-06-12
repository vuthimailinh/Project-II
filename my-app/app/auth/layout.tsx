import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className=" dark:bg-zinc-900 h-screen flex justify-center items-center">
            {children}
        </div>
    );
};

export default layout;
