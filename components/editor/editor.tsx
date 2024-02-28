
"use client"


import  "react-quill/dist/quill.bubble.css";
import './editor.css'
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
interface EditorProps{
    value: string;
    setValue:(data:any) => any;
}
const TextEditor:React.FC<EditorProps> = ({value,setValue}) => {
  const  modules  = {
    toolbar: [
        [{ font: [] }],
        [  { 'size': ['small', false, 'large', 'huge'] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
       
        [{ color: [] }, { background: [] }],
        [{ script:  "sub" }, { script:  "super" }],
        ["blockquote", "code-block"],
        [{ list:  "ordered" }, { list:  "bullet" }],
        ["link"],
        ["clean"],
    ],
};
const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "indent",
    "link",
    "align",
  ];
  


    return (
        
          <div className="">
            <ReactQuill className="dark:bg-gray-700 text-black  dark:text-white  w-full " modules={modules} formats={formats} theme="bubble" onChange={setValue} placeholder="The content starts here..." />
          </div>
       
      );
      
    ;
};

export default TextEditor;