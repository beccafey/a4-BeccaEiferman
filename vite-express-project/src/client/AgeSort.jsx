import { useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./SignIn.css";

function AgeSort() {
  const [name, setName] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [userClass, setUserClass] = useState('');
  const [users, setUsers] = useState([]);

  const [newName, editName] = useState('');
  const [newBirthYear, editBirthYear] = useState('');
  const [newUserClass, editUserClass] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  
  async function handleSubmit(event, action) {
    event.preventDefault()
    let userInfo = {
    name: name,
    birthYear: birthYear,
    userClass: userClass,
    };

    const response = await fetch(action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInfo) 
    })
    const data = await response.json();
    setUsers([...users, data]);
  }

    const ageSortOldest = function() {
        const sortedUsers = [...users].sort(function(user_a, user_b){
            return user_b.age - user_a.age;
        });
        setUsers(sortedUsers);
    }

    const ageSortYoungest = function() {
        const sortedUsers = [...users].sort(function(user_a, user_b){
            return user_a.age - user_b.age;
        });
        setUsers(sortedUsers);
    }

    const deleteUser = async function(id) {
        const response = await fetch('/remove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: id
            })
        })
        if (response.ok) {
            setUsers(users.filter(user => user._id !== id));
        }
    }

    const editUser = function(user) {
        editName(user.newName);
        editBirthYear(user.newBirthYear);
        editUserClass(user.newUserClass);
    }

    useEffect(() => {
    fetch('/docs')
        .then(response => response.json())
        .then(data => setUsers(data))
    }, [])

    const closeForm = () => {
        setEditingUser(null);
    }   

  return (
    <>
    <div className="container text-center mt-4">
        <div className="box p-4">
            <h1>Welcome to Age Sort</h1>
            <p>
            Insert you and your friends' Name, Birth Year, and your Class and we will sort by the age you all turn in 2026!
            </p>
        </div>
        </div>
        
        <main role="main">
        <div className="container mt-4">
            <div className="box2 p-4">
                <h2>My Information</h2>
            <form id="user_form">
            <fieldset>
              <legend>Insert New User Information</legend>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name *:</label>
                <input type="text" id="name" name="name" className="form-control" value={name} onChange={(event) => setName(event.target.value)} required/>
              </div>
              <div className="mb-3">
                <label htmlFor="birthYear" className="form-label">Birth Year *:</label>
                <input type="number" id="birthYear" name="birthYear" min="0" max="2026" className="form-control" value={birthYear} onChange={(event) => setBirthYear(event.target.value)} required/>
              </div>
              <div className="mb-3">
                <label htmlFor="userClass" className="form-label">
                  <span>Class:</span>
                </label>
                <select id="userClass" name="userClass" className="form-select" value={userClass} onChange={(event) => setUserClass(event.target.value)}>
                  <option value="Freshman">Freshman</option>
                  <option value="Sophomore">Sophomore</option>
                  <option value="Junior">Junior</option>
                  <option value="Senior">Senior</option>
                </select>
              </div>
              <p className="button">
                <button type="submit" className="btn btn-primary btn-purple" onClick={(event) => handleSubmit(event, '/submit')}>Submit!</button>
              </p>
            </fieldset>
          </form>
        </div>
      
      </div>
    </main>


    <div className="container mt-4">
      <div className="box2 p-4">
            <h2>My User Information</h2>
            <div className="table-responsive">
              <table id="age_table" className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Class</th>
                    <th>Birth Year</th>
                    <th>Age</th>
                    <th>Delete</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody id="age_table_body">
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.userClass}</td>
                            <td>{user.birthYear}</td>
                            <td>{user.age}</td>
                            <td>
                                <button type="submit" className="btn btn-primary btn-purple" onClick={() => deleteUser(user._id)}>Delete</button>
                                
                            </td>
                            <td>
                                <button type="submit" className="btn btn-primary btn-purple" onClick={() => editUser(user)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
              </table>
              <div className="d-flex justify-content-center align-items-center gap-3">
                <button type="button" id="young_button" className="btn btn-purple" onClick={ageSortYoungest}>Sort Youngest -{'>'} Oldest</button>
                <button type="button" id="old_button" className="btn btn-purple" onClick={ageSortOldest}>Sort Oldest -{'>'} Youngest</button>
              </div>
          </div>
        </div>
      </div>

    <div className="container text-center mt-4">
      <div className="box p-4">
        <form method="POST">
            <div className="d-flex justify-content-center align-items-center gap-3">
                <button type="submit" id="allDataRedirect" className="btn btn-purple">All User Data</button>
            </div>
        </form>
      </div>
    </div>


    <div className="form-popup box2 p-4" id="editFormDiv">
        <form id="editForm" className="form-container">
          <fieldset>
            <legend>Insert New Information</legend>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name *:</label>
              <input type="text" id="newName" name="newName" className="form-control" value={newName} onChange={(event) => editName(event.target.value)} required/>
            </div>
            <div className="mb-3">
              <label htmlFor="birthYear" className="form-label">Birth Year *:</label>
              <input type="number" id="newBirthYear" name="newBirthYear" min="0" max="2026" className="form-control" value={newBirthYear} onChange={(event) => editBirthYear(event.target.value)} required/>
            </div>
            <div className="mb-3">
              <label htmlFor="newUserClass" className="form-label" value={newUserClass} onChange={(event) => editUserClass(event.target.value)}>
                <span>Class:</span>
              </label>
              <select id="editClass" name="editClass" className="form-select">
                <option value="Freshman">Freshman</option>
                <option value="Sophomore">Sophomore</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
              </select>
            </div>
            <p className="button">
              <button type="submit" className="btn btn-primary btn-purple" id="save_update">Update</button>
            </p>
            <button type="button" className="btn btn-primary btn-purple cancel" onClick={closeForm}>Close</button>
          </fieldset>
        </form>
    </div>


    </>

  );
}

export default AgeSort;
