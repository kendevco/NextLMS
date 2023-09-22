"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill/dist/quill.bubble.css";

interface PreviewProps {
    value: string;
};

export const Preview = ({

    value
}: PreviewProps) => {

    // Import Quill w/o server side rendering to prevent hydration errors.
    const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), {
        ssr: false
    }), []);


    return (
        <div className="bg-white dark:bg-slate-700">
            <ReactQuill
                theme="bubble"
                value={value}
                readOnly={true}
            />
        </div>
    );
}