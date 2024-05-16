"use client"
import React, { useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { MdContentCopy } from "react-icons/md";
import { IoCheckmarkOutline } from "react-icons/io5";
interface CodeHighlighterComponentProps{
  language:string;
  codeString:string;
}
const CodeHighlighterComponent:React.FC<CodeHighlighterComponentProps> = ({codeString,language}) => {

  const [copy, setCopy]=useState(false)

  return (<div className=" w-full md:max-w-2xl md:min-w-[25rem] bg-[#3a404d] overflow-hidden">
    <div className="flex justify-between px-4  text-xs text-white items-center">
      <p className='text-sm'>Example Code</p>
      {copy? <button      
       className=' inline-flex gap-1 items-center py-1'>
        <IoCheckmarkOutline size={14}/>
        <span>Copied!</span></button>:<button 
      onClick={()=>{
        navigator.clipboard.writeText(codeString);
        setCopy(true);
        setTimeout(()=>{
          setCopy(false)
        },3000)
      }}
      className=' inline-flex gap-1 items-center py-1'>
        <MdContentCopy size={18}/>
      </button>}
    </div>
    <SyntaxHighlighter language={language}
     style={atomOneDark} 
    customStyle={{padding:"25px"}}
    wrapLongLines={true}
    >
      {codeString}
    </SyntaxHighlighter>
    </div>
  );
}

export default CodeHighlighterComponent


