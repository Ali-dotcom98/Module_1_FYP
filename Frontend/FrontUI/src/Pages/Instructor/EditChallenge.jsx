import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AxiosInstance from '../../Utility/AxiosInstance';
import { API_PATHS } from '../../Utility/API_Path';
import TitleInput from '../../Components/TitleInput';
import { LuArrowLeft, LuCircleAlert, LuDownload, LuSave, LuTrash2 } from 'react-icons/lu';
import BasicChallengeInfoForm from './Form/BasicChallengeInfoForm';
import { Key } from 'lucide-react';
import FunctionSettingsForm from './Form/FunctionSettingsForm';
import TestCasesForm from './Form/TestCasesForm';
import ExamplesForm from './Form/ExamplesForm';

const EditChallenge = () => {
    const {ChallengeID} = useParams();
    const [currentPage, setcurrentPage] = useState("basic-info")
    const [errorMsg, seterrorMsg] = useState("")
    const [isLoading, setisLoading] = useState(false)

    const [DefaultChlng, setDefaultChlng] = useState({
        title : "",
        description : "",
        thumbnailLink :"", 
        functionSignature : "",
        difficulty : "",
        startTime: "",
        duration: "",
        Question:"",
        isPublic: null,
        testCases: [
            {
                input: "",
                expectedOutput: "",
            }
        ],
        tags: [
            ""
        ],
        examples: [
            {
                ExampleURl: "",
                input: "",
                output: "",
            }
        ],

    })
    console.log(DefaultChlng);
    

const fetchChallengeDetailsById = async () => {
  try {
    const response = await AxiosInstance.get(API_PATHS.CHALLENGE.GET_BY_ID(ChallengeID));

    if (response.data && response.data.title) {
      const challengeInfo = response.data;
      console.log("challengeInfo" , challengeInfo);
      

      setDefaultChlng((prevState) => ({
        ...prevState,
        title: challengeInfo?.title || "",
        description: challengeInfo?.description || "",
        functionSignature: challengeInfo?.functionSignature || "",
        difficulty: challengeInfo?.difficulty || "",
        startTime: challengeInfo?.startTime || "",
        duration: challengeInfo?.duration || "",    
        isPublic: challengeInfo?.isPublic || false,
        testCases: challengeInfo?.testCases || prevState?.testCases,
        tags: challengeInfo?.tags ||prevState?.tags,
        examples : challengeInfo?.examples || prevState?.examples,
        Question: challengeInfo.Question || prevState.Question
      }));
    }
  } catch (error) {
    console.error("Error Fetching the Challenge:", error);
  }
};

const uploadResumeImages = () =>{

}

const RenderForm= ()=>{
    switch (currentPage) {
        case "basic-info":
                return  (
                    <BasicChallengeInfoForm
                        Question = {DefaultChlng.Question}
                        Description = {DefaultChlng.description}
                        Difficulty = {DefaultChlng.difficulty}
                        updateSection = {(key,value)=>
                            updateSection(key , value)
                        }
                    />
                )
         case "function-settings":
            return (
                <FunctionSettingsForm   
                functionSignature={DefaultChlng.functionSignature}
                startTime={DefaultChlng.startTime}
                duration={DefaultChlng.duration}
                isPublic={DefaultChlng.isPublic}
                tags={DefaultChlng.tags}
                updateSection = {(key,value)=>
                    updateSection(key , value)
                }
                AddItemInArray = {(value)=> AddItemInArray("tags" , value)}
                removeArrayItem = {(index)=> removeArrayItem("tags", index)}
                updateArrayItem = {(index , key , value)=> updateArrayItem("tags" ,index , key , value )}
                />
            );
                case "test-cases":
                return (
                    <TestCasesForm
                    testCases={DefaultChlng.testCases}
                    updateArrayItem={(index, key, value) => updateArrayItem("testCases", index, key, value)}
                    AddItemInArray={(newItem) => AddItemInArray("testCases", newItem)}
                    removeArrayItem={(index) => removeArrayItem("testCases", index)}
                    />
                );

             case "examples":
                return (
                    <ExamplesForm
                    examples={DefaultChlng.examples}
                    updateArrayItem={(index, key, value) => updateArrayItem("examples", index, key, value)}
                    AddItemInArray={(newItem) => AddItemInArray("examples", newItem)}
                    removeArrayItem={(index) => removeArrayItem("examples", index)}
                    />
                );
    
        default:
            break;
    }
}

const AddItemInArray = (section , value)=>{
    setDefaultChlng((prev)=>(
        {
            ...prev,
            [section] : [...prev[section], value]
        }
    ))
}
const removeArrayItem = (section, index) => {
  setDefaultChlng((prev) => {
    const updatedArray = [...prev[section]];
    updatedArray.splice(index, 1); 
    return {
      ...prev, 
      [section]: updatedArray,  
    };
  });
}; 

const updateArrayItem = (section , index ,key , value)=>{
    setDefaultChlng((prev)=>{
        const updateArray= [...prev[section]]
        if(key==null)
        {
            updateArray[index]= value
        }
        else{
            updateArray[index] = {
                ...updateArray[index],
                [key] : value
            }
        }
        return{
            ...prev,
            [section]: updateArray
        }
    })
}
const updateSection = (key , value)=>{
    setDefaultChlng((prev)=>(
        {
            ...prev,
            [key] : value
        }
    ))
}


const goBack = ()=>{
    const pageOrder = [
    "basic-info",
    "function-settings",
    "test-cases",
    "examples",
    ];
    const CurrentPageIndex = pageOrder.indexOf(currentPage)
    
    setcurrentPage(pageOrder[CurrentPageIndex-1])
}

const validateAndNext = (e) => {
    const errors = [];

    switch (currentPage) {
        case "basic-info": {
            const { Question, description, difficulty } = DefaultChlng;
            if (!Question.trim()) errors.push("Question is required.");
            if (!description.trim()) errors.push("Description is required.");
            if (!difficulty.trim()) errors.push("Difficulty level is required.");
            break;
        }

        case "function-settings": {
            const { startTime, duration, functionSignature, tags } = DefaultChlng;
            if (!startTime) errors.push("Start time is required.");
            if (!duration) errors.push("Duration is required.");
            if (!functionSignature.trim()) errors.push("Function signature is required.");
            if (tags.length === 0 || !tags[0].trim()) {
                errors.push("At least one tag is required.");
            }
            break;
        }

        case "test-cases": {
            DefaultChlng.testCases.forEach(({ input, expectedOutput }, index) => {
                if (!input.trim()) errors.push(`Input is required for Test Case ${index + 1}.`);
                if (!expectedOutput.trim()) errors.push(`Expected Output is required for Test Case ${index + 1}.`);
            });
            break;
        }

        case "examples": {
             if (DefaultChlng.examples.length === 0) {
                errors.push("At least one Example is required.");
            }
            DefaultChlng.examples.forEach(({ input, output }, index) => {
                if (!input.trim()) errors.push(`Input is required for Example ${index + 1}.`);
                if (!output.trim()) errors.push(`Output is required for Example ${index + 1}.`);
            });
            break;
        }
    }

    if (errors.length > 0) {
        seterrorMsg(errors[0]); // Show the first error
    } else {
        seterrorMsg("");
        goToNextStep();
    }
};

const goToNextStep = ()=>{
    const pageOrder = [
    "basic-info",
    "function-settings",
    "test-cases",
    "examples",
    ];
    const CurrentPageIndex = pageOrder.indexOf(currentPage)
     if(CurrentPageIndex == 3)
    {
    
        return ;
    }


    setcurrentPage(pageOrder[CurrentPageIndex+1])
}

useEffect(() => {
//   updateBaseWidth();
//   window.addEventListener("resize", updateBaseWidth);
  if (ChallengeID) {
    fetchChallengeDetailsById();
  }
//   return () => {
//     window.removeEventListener("resize", updateBaseWidth);
//   };
}, [ChallengeID]);

    return (
    <div className="container mx-auto font-urbanist">
        <div className="flex items-center justify-between gap-5 bg-white rounded-lg border border-purple-100py-3 px-4 mb-4 py-3 ">
        <TitleInput
            title={DefaultChlng.title}
            setTitle={(value) =>
            setDefaultChlng((prevState) => ({
                ...prevState,
                title: value,
            }))
            }
        />
        <div className="flex items-center gap-4">

            <button
            className="btn-small-light"
            // onClick={()=> setDeleteModel(true)}
            >
            <LuTrash2 className="text-[16px]" />
            <span className="hidden md:block">Delete</span>
            </button>

            <button
            className="btn-small-light "
            // onClick={() => setOpenPreviewModal(true)}
            >
            <LuDownload className="text-[16px]" />
            <span className="hidden md:block ">Preview & Download</span>
            </button>
        </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white rounded-lg border border-purple-100 overflow-hidden">
            {/* <StepProgress progress= {progress} /> */}
            { 
            RenderForm(currentPage)
            }
            
            {errorMsg && (
            <div className=" flex items-center text-[11px] gap-2 font-medium  justify-center text-amber-600 bg-amber-100 py-0.5 px-2 my-1 rounded ">
                <LuCircleAlert className="text-md" />
                {errorMsg}
            </div>
            )}

            
            <div className="flex items-end justify-end  p-5 gap-3">
            <button
                onClick={goBack}
                disabled={currentPage === "basic-info"}
                className={`btn-small-light ${currentPage === "basic-info" ? "cursor-none opacity-50" : ""}`}
            >
            <LuArrowLeft className="text-[16px]" />

            Back
            </button>


        <button
            className="btn-small-light flex items-center gap-2 border"
            onClick={uploadResumeImages}
            disabled={isLoading}
        >
            <LuSave className="text-[16px]" />

            {isLoading ? "Updating..." : "Save & Exit"}
        </button>

            <button
                className="btn-small flex items-center gap-2"
                onClick={validateAndNext}
                disabled={isLoading}
            >
                {currentPage === "examples" ? (
                <>
                    <LuDownload className="text-[16px]" />
                    Preview & Download
                </>
                ) : (
                <>
                    <LuArrowLeft className="text-[16px] rotate-180" />

                    Next
                </>
                )}
            </button>
            </div>

            </div>
        </div>

    </div>
    )
}   
export default EditChallenge