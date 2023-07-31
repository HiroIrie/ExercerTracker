import React, { useState,useContext } from 'react';
import axios from 'axios';
import './CreateExercise.css';
import { useNavigate } from 'react-router-dom';
import { UsersDataContext } from './UsersDataContext';


function CreateExercise() {
    const navigate = useNavigate();
    const usersData=useContext(UsersDataContext);
    const [message,setMessage]=useState(null);
    const initDate = new Date().toISOString().substring(0, 10);
    const [exercise, setExercise] = useState({
        username: "",
        description: "",
        duration: 0,
        date: initDate,
        users: []
    });




    const onChangeExercise = (e) => {
        const { name, value } = e.target;
        if (name === "date") {
            const formattedDate = new Date(value).toISOString().substring(0, 10);
            setExercise(prevExercise => ({
                ...prevExercise,
                [name]: formattedDate
            }));
        } 
        else if(name==="duration"&&value<0){
           const newDuration=0;
           setExercise(prevExercise=>({
            ...prevExercise,
            [name]:newDuration
           }));
        }
        else {
            setExercise(prevExercise => ({
                ...prevExercise,
                [name]: value
            }));
        }
    };

    const onSubmitExercise = async(e) => {
        e.preventDefault();
        // フォームの送信処理を実行するためのコードを追加する
        try{
            await axios.post('http://localhost:5000/exercises',exercise).then((res)=>{
             console.log('送信完了');
             navigate('/',);
            })
        }catch(err){
            console.log(err.response.data.error);
            setMessage(err.response.data.error);
        }
    };

    return (
        <div className="create-exercise-container">
            <h1 className="create-exercise-title">CreateExercise</h1>
            <form className="create-exercise-form" onSubmit={onSubmitExercise}>
                <div className="form-group">
                    <label className="form-label">Username:</label>
                    <select className="form-input" name="username" value={exercise.username} onChange={onChangeExercise}>
                    <option value="">-- Select Username --</option>
                        {usersData?<>({usersData.map((user)=>{
                          return( <option key={user._id} value={user.username}>{user.username}</option>)
                        })})</>:<>Loading...</>}
                        
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label">Description:</label>
                    <input className="form-input" type="text" name="description" value={exercise.description} onChange={onChangeExercise} />
                </div>
                <div className="form-group">
                    <label className="form-label">Duration:</label>
                    <input className="form-input" type="number" name="duration" value={exercise.duration} onChange={onChangeExercise} />
                </div>
                <div className="form-group">
                    <label className="form-label">Date:</label>
                    <input className="form-input" type="date" name="date" value={exercise.date} onChange={onChangeExercise} />
                </div>
               {message&&<div className="error-message">*{message}</div>} 
                <button className="form-button" type="submit">Create Exercise</button>
            </form>
        </div>
    );
}

export default CreateExercise;