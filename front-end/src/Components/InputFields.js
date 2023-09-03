import React, { useState } from "react";
import axios from "axios";

const InputField = () => {
  const [username, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const valueChanged = (e) => {
    setUserName(e.target.value);
  };
  const fetchUserProfile = async () => {
    try {
      console.log("waiting for data");
      const response = await axios.get(
        `http://localhost:3001/api/user/${username}`
      );
      console.log(response);
      setUser(response.data);
    } catch (error) {
      console.log(`Error fetching user profile`, error.message);
      console.log(error.code);
    }
  };
  return (
    <div className="contents">
      <div className="inner">
        <h1>Github Profile Viewer</h1>
        {/* <label>Enter Github Username here</label> */}
        <br />
        <div className="input-group">
          <input
            type="text"
            onChange={valueChanged}
            value={username}
            placeholder="enter github username..."
            name="username"
          />
          <button onClick={fetchUserProfile}>Fetch User</button>
        </div>
        <div className="generatedContent">
          {user? (
            <div className=".user-profile">
              <img
                width={150}
                src={user.avatar_url}
                alt={`${user.login}'s avatar`}
                />
              <h2>Username:{user.login}</h2>
              <p className="repo">{user.url}</p>
              <p>Repository:{user.repos_url}</p>
              <p>Followers:{user.followers}</p>
              <p>Following:{user.following}</p>
              <p>Github:{user.url}</p>
            </div>
          ):'Ops,No Data found!!'}
        </div>
      </div>
    </div>
  );
};

export default InputField;
