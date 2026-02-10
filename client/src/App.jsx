
import { useEffect, useState } from "react";
import "./App.css";
import { api, testApi } from "./api";

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({ name: "", age: "", city: "" });

  const getAllUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
      setFilteredUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const apiMsg = await testApi();
        console.log("API Test:", apiMsg);
        await getAllUsers();
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  const handleSearchChange = (e) => {
    const searchText = e.target.value.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchText) ||
        user.city.toLowerCase().includes(searchText)
    );
    setFilteredUsers(filtered);
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
    if (isConfirmed) {
      const res = await api.delete(`/users/${id}`);
      setUsers(res.data);
      setFilteredUsers(res.data);
    }
  };

  const handleAddRecord = () => {
    setUserData({ name: "", age: "", city: "" });
    setIsModalOpen(true);
  };

  const handleData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.id) {
      await api.patch(`/users/${userData.id}`, userData);
    } else {
      await api.post("/users", userData);
    }

    closeModal();
    setUserData({ name: "", age: "", city: "" });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    getAllUsers();
  };

  const handleUpdateRecord = (user) => {
    setUserData(user);
    setIsModalOpen(true);
  };

  // let unusedvar = "unused varaible here";

  return (
    <div className="container">
      <h3>CRUD Application with React.js Frontend and Node.js Backend</h3>

      <div className="input-search">
        <input type="search" placeholder="Search Text Here" onChange={handleSearchChange} />
        <button className="btn blue" onClick={handleAddRecord}>Add User Record</button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.city}</td>
              <td>
                <button className="btn green" onClick={() => handleUpdateRecord(user)}>Edit</button>
              </td>
              <td>
                <button className="btn green" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>{userData.id ? "Update Record" : "Add User"}</h2>

            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" name="name" value={userData.name} onChange={handleData} />
            </div>

            <div className="input-group">
              <label htmlFor="age">Age</label>
              <input type="number" name="age" value={userData.age} onChange={handleData} />
            </div>

            <div className="input-group">
              <label htmlFor="city">City</label>
              <input type="text" name="city" value={userData.city} onChange={handleData} />
            </div>

            <button className="btn green" onClick={handleSubmit}>
              {userData.id ? "Update Record" : "Add User"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
