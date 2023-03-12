import Header from "./Component/Header";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from "./Component/ProtectedRoute";
import Login from "./Component/Login";
import Register from "./Component/Register";
import Home from "./Component/Home";
import AddNote from "./Component/addNote";
import NotesState from "./Context/NoteState";
import Note from "./Component/Note";
const App = () => {
  return (
    <div className="App">
      <Router>
        <NotesState>
          <Header />
          <Routes>
            <Route exact path='/' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/' element={<ProtectedRoute />}>
              <Route exact path='/home' element={<Home />} />
              <Route exact path='/addNote' element={<AddNote />} />
              <Route exact path='/note/:id' element={<Note />} />
            </Route>
          </Routes>
        </NotesState>
      </Router>
    </div>
  );
}

export default App;
