import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./Table.css";

function App() {
  const [userData, setUserData] = useState([]);

  const retriveUserDataList = async () => {
    const res = await fetch(
      "https://l6bpf9bsc8.execute-api.ap-south-1.amazonaws.com/Test-Production/user-data"
    );

    let jsonData = await res.json();

    setUserData(jsonData);
  };

  useEffect(() => {
    retriveUserDataList();
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h3>
        This project is designed to test AWS cloud services, including Lambda,
        API Gateway, DynamoDB, and Amplify.
      </h3>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>NIC</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user: any) => (
              <tr key={user.NIC}>
                <td>{user.NIC}</td>
                <td>{user.FirstName + " " + user.LastName}</td>
                <td>{user.Gender}</td>
                <td>{user.Email}</td>
                <td>{user.MobileNumber}</td>
                <td>{user.Address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
