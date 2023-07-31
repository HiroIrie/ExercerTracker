import React from 'react';
import { UsersDataProvider } from './components/UsersDataContext';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import NavigationBar from './components/navbar.components';
import EditExercise from './components/edit-exercise.components';
import CreateExercise from './components/create-exercise.components';
import ExercisesList from './components/exercises-list.components';
import CreateUser from './components/create-user.component';

 
function App() {
  return (
     <UsersDataProvider> 
       <BrowserRouter>
        <div className="container">
          <NavigationBar />
          <Routes>
            <Route path="/" element={<ExercisesList />} />
            <Route path="/edit/:id" element={<EditExercise />} />
            <Route path="/create" element={<CreateExercise />} />
            <Route path="/user" element={<CreateUser />} />
          </Routes>
        </div>
      </BrowserRouter> 
   </UsersDataProvider> 
  );
}

export default App;
