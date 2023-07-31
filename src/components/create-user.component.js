import React, { useState } from 'react';
import './CreateUser.css';
import axios from 'axios';

function CreateUser() {
  const [user, setUser] = useState({username:""});
  const[message,setMessage]=useState(null);

  const handleInputChange = (e) => {
    const{name,value}=e.target;
    setUser(prevUser=>({
      ...prevUser,[name]:value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // フォームのデータを送信する処理を追加する
    try{
      await axios.post('http://localhost:5000/users',user).then((res)=>{
        setMessage('登録しました');
      });
    }catch(err){
      setMessage(err.response.data.error);
    }
  }

  return (
    <div className="create-user-container">
      <h3 className="create-user-title">Create New User</h3>
      <form className="create-user-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username" className="form-label">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-input"
            value={user.username}
            onChange={handleInputChange}
          />
          {message&&<div className='error-message'>*{message}</div>}
        </div>
        <button type="submit" className="form-button">Create User</button>
      </form>
    </div>
  );
}

export default CreateUser;
