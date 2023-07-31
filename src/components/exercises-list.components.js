import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ExercisesList.css';
import { useNavigate } from 'react-router-dom';

function ExercisesList() {
  const [exerciseData,setExerciseData] =useState(null) ;
  const navigate=useNavigate();

  // データベースからexercisesデータを取得する関数
  const fetchData=async()=>{
    try{
      const response= await axios.get('http://localhost:5000/exercises');
      const data=response.data.data;
      const formattedData=data.map((exercise)=>({
        ...exercise,date:formatDate(exercise.date)
      }))
      setExerciseData(formattedData);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const response= await axios.get('http://localhost:5000/exercises');
        const data=response.data.data;
        const formattedData=data.map((exercise)=>({
          ...exercise,date:formatDate(exercise.date)
        }))
        setExerciseData(formattedData);
      }catch(err){
        console.log(err);
      }
    }
    fetchData();
  },[])

// 日付のフォーマットを変換する関数
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

  const handleEdit = (id) => {
    // Editアクションの処理を追加する
    console.log(`Edit exercise with ID: ${id}`);

    
    navigate(`/edit/${id}`);
  };

  const handleDelete = async(id) => {
    // Deleteアクションの処理を追加する
   const shouldDelete= window.confirm('削除しますか❔');
    if(shouldDelete){
      try{
        await axios.delete(`http://localhost:5000/exercises/${id}`);
        console.log('削除完了');
        fetchData();
      }catch(err){
         console.log(err)
      }
    }else{
      window.alert('削除を中止しました');
      return
    }
 
   
  };

  return (
    <div className="logged-exercises-container">
      <h3 className="logged-exercises-title">Logged Execises</h3>
      {exerciseData?
      <table className="logged-exercises-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
         <>{exerciseData.map((exercise) => {return(
            <tr key={exercise._id}>
              <td>{exercise.username}</td>
              <td>{exercise.description}</td>
              <td>{exercise.duration}</td>
              <td>{exercise.date}</td>
              <td>
                <button className="edit-button" onClick={() => handleEdit(exercise._id)}>
                  Edit
                </button>
                <button className="delete-button" onClick={() => handleDelete(exercise._id)}>
                  Delete
                </button>
              </td>
            </tr>
          )})}</>
        </tbody>
      </table>
      :<div className="loading-container">
      <h1>Loading...</h1>
    </div>}
    </div>
  );
}

export default ExercisesList;