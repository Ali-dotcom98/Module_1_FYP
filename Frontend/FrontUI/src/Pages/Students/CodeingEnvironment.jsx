import React, { useEffect, useState } from 'react'
import OnlineCompiler from './Components/OnlineCompiler';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import AxiosInstance from '../../Utility/AxiosInstance';
import { API_PATHS } from '../../Utility/API_Path';

const CodeingEnvironment = () => {
  const {ChallengeID} = useParams();
  const [CompetitonDetail, setCompetitonDetail] = useState({})
  console.log("CompetitonDetail",CompetitonDetail);
  
  const fetchCompetitonDetail = async()=>{
    try {
      const response = await AxiosInstance.get(API_PATHS.CHALLENGE.GET_BY_ID(ChallengeID));
      console.log("response",response);
      
      if(response.data)
      {
        setCompetitonDetail(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    fetchCompetitonDetail();
  },[])

 return (
    <>
      <div className=" min-h-screen rounded-[6px] ">
        

      <main className="">
        <OnlineCompiler />
      </main>
        
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        className={"mt-20 mr-7 "}
      />

    </>
  );
  
}

export default CodeingEnvironment