import React from 'react';
import Editor from "@monaco-editor/react";
import { Code } from 'lucide-react';

const CodeEditor = ({ code, setCode, language }) => {
  const getEditorLanguage = () => {
    switch (language) {
      case 'c++': return 'cpp';
      case 'python': return 'python';
      case 'java': return 'java';
      case 'c': return 'c';
      default: return 'cpp';
    }
  };

  return (
    <div className="h-full flex flex-col border-r border-border_Col">
      <div className="bg-slate-900  px-4 py-2 flex items-center border-b border-border_Col opacity-70">
        <Code className="h-4 w-4 text-slate-400 mr-2" />
        <span className="text-sm font-medium text-slate-300">Source Code</span>
      </div>

      <div className="flex-grow">
        <Editor
          height="500px"
          language={getEditorLanguage()}
          theme="vs-light"
          value={code}
          onChange={(value) => setCode(value || '')}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            lineNumbers: 'on',
            roundedSelection: true,
            automaticLayout: true,
            padding: { top: 16 },
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
