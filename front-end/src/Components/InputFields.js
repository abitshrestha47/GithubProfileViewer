import React, { useState } from "react";
import axios from "axios";
import "font-awesome/css/font-awesome.min.css";

const InputField = () => {
  const [username, setUserName] = useState("");
  const [error,setError]=useState("");
  const [textEntered, setTextEntered] = useState(false);
  const [user, setUser] = useState(null);
  const valueChanged = (e) => {
    setUserName(e.target.value);

    setTextEntered(!(e.target.value === ""));
  };
  //GETTING USERPROFILE FROM THE BACKEND
  const fetchUserProfile = async () => {
    try {
      console.log("waiting for data");
      const response = await axios.get(
        `http://localhost:3001/api/user/${username}`
      );
      console.log(response);
      const responseData=response.data;
      if(responseData.message==="Request failed with status code 404"){
        console.log('check');
        setError('Is this user exists? Try again...');
      }
      else{
        setUser(response.data);
      }
    }catch (error) {
      if (error.response) {
        console.log(`Server responded with status code: ${error.response.status}`);
        console.log(`Response data:`, error.response.data);
      } else if (error.request) {
        console.log(`No response received. Network error.`);
      } else {
        console.log(`Error:`, error.message);
      }
    }
  };
  return (
    <div className="contents">
      <div className="inner">
        <h1>Github Profile Viewer</h1>
        {/* <label>Enter Github Username here</label> */}
        <br />
        <div className="input-group">
          {!textEntered && <i className="fa fa-search FAS"></i>}
          <input
            type="text"
            onChange={valueChanged}
            value={username}
            placeholder="enter github username..."
            name="username"
          />
          <button onClick={fetchUserProfile}>Search</button>
        </div>
        <div className={`generatedContent ${user||error ? "dis" : "none"}`}>
          {user ? (
            <div className="user-profile">
              <img
                width={150}
                src={user.avatar_url}
                alt={`${user.login}'s avatar`}
              />
              <div className="details">
                <div className="top">
                  <div className="names">
                    <h1 className="name">{user.name}</h1>
                    <h2 className="username">{user.login}</h2>
                  </div>
                  <p className="created">{user.created_at}</p>
                </div>
                <p className="bio">{user.bio}</p>
                <div className="follows">
                  <p className="repo"><span>Repo</span><br/>{user.public_repos}</p>
                  <p className="followers"><span>Followers</span><br/>{user.followers}</p>
                  <p className="following"><span>Following</span><br/>{user.following}</p>
                </div>
                <a className="url" href={user.html_url}><i className="fa fa-link"></i>{" "+user.html_url}</a>
              </div>
            </div>
          ) : (
            error && (
              <div className="erroring">
                <p>{error}</p>
              </div>
            )            )}
        </div>
      </div>
    </div>
  );
};

export default InputField;
