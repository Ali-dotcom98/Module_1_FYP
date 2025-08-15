import React, { useEffect, useState } from 'react'
import AxiosInstance from '../../Utility/AxiosInstance'
import { API_PATHS } from '../../Utility/API_Path'
import { Trophy, TrophyIcon } from 'lucide-react'
import LeaderBoardHeader from './Components/LeaderBoardHeader'
import ChallengeCard from '../../Components/Cards/User/ChallengeCard '
const Leaderboard = () => {
  const [TopPerformers, setTopPerformers] = useState([])
  const [LeaderBoardData, setLeaderBoardData] = useState([])
  console.log("LeaderBoardData",LeaderBoardData);
  
  const FetchTopPerformer = async()=>{
    try {
      const response = await AxiosInstance.get(API_PATHS.CODE.GET_TOP_PERFORMER);
      if(response.data)
      {
        setTopPerformers(response.data)
      }
      
    } catch (error) {
      console.log(error);
      
    }
  }

  const FetchCompletedChallenges = async()=>{
    try {
      const result = await AxiosInstance.get(API_PATHS.CHALLENGE.GET_LEADERBOARD);
      if(result.data)
      {
        setLeaderBoardData(result.data)
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{
    FetchTopPerformer();
  },[])
  useEffect(() => {
    FetchCompletedChallenges();
  }, [])
  

  return (
    <div className='font-urbanist min-h-screen  px-4 '>
      <LeaderBoardHeader TopPerformers={TopPerformers} />
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
              {
                LeaderBoardData.map((item)=>{
                return ( 
                  <ChallengeCard
                      tag={"Leaderboard"}
                      ID={item._id}
                      title = {item.title}
                      description = {item.description}
                      priority= {item.difficulty}  
                      startTime={item.startTime}
                      endTime={item.endTime}
                      status ={item.duration}
                      dueDate = {item.dueDate || ""}
                      onselect={(ID)=>ConfirmID(ID)}
                    
                  />
                )
                })
              }
            </div>

    </div>
  )
}

export default Leaderboard