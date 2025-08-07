import React, { useEffect, useRef, useState } from 'react'
import { DefaultContext } from 'react-icons/lib';
import { formatYearMonth } from '../../../Utility/Helper';

const Title = ({ text, color }) => {
    return (
        <div className="relative w-fit mb-2.5">
        <span
            className="absolute bottom-0 left-0 w-full h-2"
            style={{ backgroundColor: color }}
        ></span>
        <h2 className="relative text-sm font-bold">{text}</h2>
        </div>
    );
};
const CodeBlock = ({ code }) => (
  <pre className="bg-gray-100 text-sm p-2 rounded-md overflow-x-auto">{code}</pre>
);
const RenderFrom = ({data , containerWidth}) => {
    const [showAllTests, setShowAllTests] = useState(false);
    const displayedTests = showAllTests ? data.testCases : data.testCases.slice(0, 2);

    const DEFAULT_THEME = ["#EBFDFF", "#A1F4FD", "#CEFAFE", "#00B8DB", "#4A5565"];
     const resumeRef = useRef(null);
    const [baseWidth, setBaseWidth] = useState(780); // Default value
    const [scale, setScale] = useState(1);

    useEffect(() => {
        if (resumeRef.current) {
        const actualBaseWidth = resumeRef.current.offsetWidth;
        setBaseWidth(actualBaseWidth);
        setScale(containerWidth / actualBaseWidth);
        }
    }, [containerWidth]);
  return (
    <div
        ref={resumeRef}
        className="p-3 bg-white"
        style={{
        transform: containerWidth > 0 ? `scale(${scale})` : "none",
        transformOrigin: "top left",
        width: containerWidth > 0 ? `${baseWidth}px` : "auto", // Keep the original width when not scaled
        height: "auto",
        }}>
        <div className="flex flex-col bg-white ">
            <div className="py-5 border-b-2  border-b-[#A1F4FD] " style={{ backgroundColor: DEFAULT_THEME[0] }}>
                <div className="flex flex-col items-center px-2  ">
                    <Title text="Code Asced Code Competion " color={DEFAULT_THEME[1]} />
                    <div className='flex items-center justify-between w-full px-4 py-2'>
                        <Title text={`Time : ${data.duration} Min`} color={DEFAULT_THEME[1]} />
                         <Title text={`Date : ${formatYearMonth(data.startTime)}`} color={DEFAULT_THEME[1]} />
                    </div>
                    <div>
                        <Title text={data.Question} color={DEFAULT_THEME[1]} />
                    </div>
                    
                </div>
               
            </div>
            <div className='px-5 py-3 space-y-4'>
                <div>
                    <Title text="Problem Description" color={DEFAULT_THEME[1]} />
                    <p className="text-sm font-medium">
                        {data.description}
                    </p>
                </div>
                <div className='grid grid-cols-5 gap-4 '>
                    <div className='col-span-4'>
                        <Title text="Function Signature" color={DEFAULT_THEME[1]} />
                        <CodeBlock code={data.functionSignature} />
                    </div>
                    <div>
                        <Title text="Difficulty" color={DEFAULT_THEME[1]} />
                        <span className="inline-block bg-yellow-100 text-yellow-700 px-2 py-1 text-xs rounded-full">
                            {data.difficulty}
                        </span>
                    </div>

                </div>
                <div className='grid grid-cols-4 gap-4 '>
                    <div className='col-span-2'>
                        <Title text="Examples" color={DEFAULT_THEME[1]} />
                        {data.examples.map((ex, idx) => (
                            <div key={ex._id || idx} className="mb-2 text-sm">
                            <div><span className="font-semibold">Input:</span> <CodeBlock code={ex.input} /></div>
                            <div><span className="font-semibold">Output:</span> <CodeBlock code={ex.output} /></div>
                            </div>
                        ))}
                    </div>
                   <div className="col-span-2">
                        <Title text="TestCases" color={DEFAULT_THEME[1]} />

                        {displayedTests.map((ex, idx) => (
                            <div key={ex._id || idx} className="mb-2 text-sm">
                            <div>
                                <span className="font-semibold">Input:</span>{' '}
                                <CodeBlock code={ex.input} />
                            </div>
                            <div>
                                <span className="font-semibold">Output:</span>{' '}
                                <CodeBlock code={ex.expectedOutput} />
                            </div>
                            </div>
                        ))}
                        {data.testCases.length > 2 && (
                            <button
                            onClick={() => setShowAllTests(!showAllTests)}
                            className="mt-2 text-xs text-blue-600 hover:underline"
                            >
                            {showAllTests ? 'Show Less' : 'Read More'}
                            </button>
                        )}
                    </div>
                </div>
                  <div className="w-full col-span-2 ">
                            <Title text="Tags" color={DEFAULT_THEME[1]} />
                            <div className="flex flex-row items-center flex-wrap gap-3">
                                {data.tags.map((interest, index) => {
                                if (!interest) return null;
                                return (
                                    <div
                                    key={`interest_${index}`}
                                    className="text-[10px] font-medium py-1 px-3 rounded-lg"
                                    style={{ backgroundColor: DEFAULT_THEME[2] }}
                                    >
                                    {interest}
                                    </div>
                                );
                                })}
                            </div>
                    </div>
                {/* <div className="w-full col-span-2 ">
                            <Title text="Tags" color={DEFAULT_THEME[1]} />
                            <div className="flex flex-row items-center flex-wrap gap-3">
                                {data.tags.map((interest, index) => {
                                if (!interest) return null;
                                return (
                                    <div
                                    key={`interest_${index}`}
                                    className="text-[10px] font-medium py-1 px-3 rounded-lg"
                                    style={{ backgroundColor: DEFAULT_THEME[2] }}
                                    >
                                    {interest}
                                    </div>
                                );
                                })}
                            </div>
                    </div> */}
            </div>
            
        </div>
    </div>

      
  )
}

export default RenderFrom