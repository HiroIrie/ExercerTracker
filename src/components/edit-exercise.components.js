import React, { useState, useEffect, useContext } from 'react';
import { UsersDataContext } from './UsersDataContext';
import axios from 'axios';
import './CreateExercise.css';
import { useParams, useNavigate } from 'react-router-dom';


function Editexercise() {
    const { id } = useParams();
    const navigate = useNavigate();
    const usersData = useContext(UsersDataContext);
    const [exercise, setExercise] = useState(null);

    useEffect(() => {
        const fetchExerciseData = async () => {
            try {
                const fetchData = await axios.get(`http://localhost:5000/exercises/${id}`);
                const data = fetchData.data;
                const formattedDate = new Date(data.date).toISOString().substring(0, 10);
                data.date = formattedDate;
                setExercise(data);
            } catch (err) {
                console.log(err)
            }

        }
        fetchExerciseData();
    }, [id])

    const onChangeExercise = (e) => {
        const { name, value } = e.target;
        if(name==="duration"&&value<0){
            const newDuration=0;
           setExercise(prevExercise=>({
            ...prevExercise,
            [name]:newDuration
           }));
        }
       else if (name === "date") {
            const formattedDate = new Date(value).toISOString().substring(0, 10);
            setExercise(prevExercise => ({
                ...prevExercise,
                [name]: formattedDate
            }));
        }
        
        else {
            setExercise(prevExercise => ({
                ...prevExercise,
                [name]: value
            }));
        }
    };

    const onSubmitExercise = async (e) => {
        e.preventDefault();
        // フォームの送信処理を実行するためのコードを追加する
        const formattedData = exercise;
        try {
            await axios.post(`http://localhost:5000/exercises/${id}`, exercise).then((res) => {
                console.log('送信完了');
            })
        } catch (err) {
            console.log(err);
        }
        navigate('/', { state: formattedData });
    };

    return (
        <div className="create-exercise-container">
            <h1 className="create-exercise-title">CreateExercise</h1>
            {exercise ? <form className="create-exercise-form" onSubmit={onSubmitExercise}>
                <div className="form-group">
                    <label className="form-label">Username:</label>
                    <select className="form-input" name="username" value={exercise.username} onChange={onChangeExercise}>
                        <option value="">-- Select Username --</option>
                        {usersData ? <>({usersData.map((user) => {
                            return (<option key={user._id} value={user.username}>{user.username}</option>)
                        })})</> : <>Loading...</>}

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
                <button className="form-button" type="submit">Create Exercise</button>
            </form> : <h1>Loading...</h1>}

        </div>
    );
}

export default Editexercise;