"use client"
import React from 'react'
import {Editor}from "@monaco-editor/react"
const CodeEditor = () => {
  return (<div>

    <Editor
    height="75vh"
  theme='vs-dark'
  defaultLanguage='python'
  defaultPath='write python code'
    />

  
  </div>
  )
}

export default CodeEditor