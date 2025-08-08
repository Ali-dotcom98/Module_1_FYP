import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import LanguageSelector from './LanguageSelector';
import OutputSection from './OutputSection';
import InputSection from './InputSection';
import { runCode } from '../utils/codeExecution';
import { Check, Play, Info, RefreshCw } from 'lucide-react';
import { toast } from 'react-toastify';
import RenderFrom from '../../Instructor/RenderForm/RenderFrom';


const OnlineCompiler = ({ProblemDetail}) => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [input, setInput] = useState('');
  const [languageId, setLanguageId] = useState(63); // Default to C++
  const [languageLabel, setLanguageLabel] = useState('C++');
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle' | 'running' | 'success' | 'error'

  const setBoilerCode = (label) => {
  switch (label) {
    case "C++":
      return setCode(`#include <iostream>
using namespace std;

int main() {
    
    return 0;
}`);

    case "Python":
      return setCode(`# Your code here`);

    case "Java":
      return setCode(`public class Main {
    public static void main(String[] args) {
        
    }
}`);

    case "C":
      return setCode(`#include <stdio.h>

int main() {
    
    return 0;
}`);

    default:
      break;
  }
};

  const handleLanguageChange = (id, label) => {
    
    setLanguageId(id);
    setLanguageLabel(label);
    setBoilerCode(label);
  };  

  const handleRunCode = async () => {
    try {
      setIsRunning(true);
      setStatus('running');
      setOutput('Running code...');

      const result = await runCode(code, input, languageId);

      setOutput(result);
      setStatus(result.includes('Error') ? 'error' : 'success');
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
      });

    } catch (error) {
     
      setStatus('error');
    } finally {
      setIsRunning(false);
    }
  };

  const renderStatusIcon = () => {
    switch (status) {
      case 'running':
        return <RefreshCw className="animate-spin h-4 w-4" />;
      case 'success':
        return <Check className="h-4 w-4" />;
      case 'error':
        return <Info className="h-4 w-4" />;
      default:
        return <Play className="h-4 w-4" />;
    }
  };

  const NocodeNoServer = () => {
  toast.error("Please enter some code before running.",{className:"font-bold"});
};

  const handleRunClick = () => {
  if (!code.trim()) {
    NocodeNoServer(); 
    return;
  }
  handleRunCode(); 
};

  return (
    <>
      <div className="font-urbanist grid grid-cols-1 md:grid-cols-2">
        {/* Left Sider Column */}
        <div className="col-span-1">
          <div className="flex items-center justify-between gap-5 bg-white rounded-lg border border-purple-100 py-3 px-4 mb-4 mt-4">
            <LanguageSelector 
            selectedLanguageId={languageId} 
            onLanguageChange={handleLanguageChange} 
            />
            <h2 className="text-lg  font-semibold text-gray-900">Code Ascends Compiler</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={handleRunClick}
                disabled={isRunning }
                className={`
                    btn-small-light
                  ${isRunning ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 
                    status === 'success' ? 'bg-green-600 hover:bg-green-700 ' :
                    status === 'error' ? 'bg-red-600 hover:bg-red-700 ' :
                    `Btn1  focus:outline-none focus:ring-0 ${code.trim()=="" ?NocodeNoServer:""}`}
                `}
              >
                {code.trim()=="" ? NocodeNoServer:""}
                {renderStatusIcon()}
                {isRunning ? 'Running...' : 'Run Code'}
              </button>
            </div>
          </div>
          <div className="col-span-1">
            <CodeEditor 
              code={code} 
              setCode={setCode} 
              language={languageLabel.toLowerCase()} 
            />
          </div>
        </div>

        {/* Right Side Column */}
         <div className="col-span-1 bg-white ">
              
              {/* Header */}
              <div className="flex items-center justify-between gap-5 bg-white rounded-lg border border-purple-100 py-3 px-4 mb-4 mt-4">
                <h1>
                  {ProblemDetail.Question}
                </h1>
                <div className='flex gap-4'>
                  <button className='btn-small-light '>
                    {ProblemDetail.duration} Min  Remaining
                  </button>
                  <button className='btn-small' >
                    Submit
                  </button>
                </div>
              </div>
              {/* ProblemSummary */}
              <div className='bg-white rounded-lg border border-purple-100  overflow-y-scroll overflow-x-hidden'>
                  <h2 className="text-lg font-bold text-gray-900 px-5 py-3">{ProblemDetail.Question}</h2>
                  <div className='h-[90vh]'>
                    <RenderFrom data={ProblemDetail} containerWidth={650} status={"Student"}/>

                  </div>
              </div>
        </div>
      </div>
      <div className="grid grid-cols-2 w-full ">
          <div className='col-span-1'><InputSection input={input} setInput={setInput} /></div>
          <div className='col-span-1'><OutputSection output={output} status={status} /></div>
        </div>
    </>
  );
};

export default OnlineCompiler;
