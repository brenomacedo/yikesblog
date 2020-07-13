import React, { useState } from "react";
import { FiLogOut, FiTrash, FiEdit } from "react-icons/fi";
import { Editor } from "@tinymce/tinymce-react";
import "./styles.css";

const CreatePost = () => {

  const [text, setText] = useState('')

  const handleEditorChange = (content: string, editor: string) => {
    setText(content)
    console.log(text)
  }

  return (
    <div className="create-post">
        <h3>Post title:</h3>
        <input type="text" />
        <Editor
            value={text} onEditorChange={handleEditorChange}
            apiKey="w32catiriiirutgmkiypr53w0cpy3rughud01410u38ke1i6"
            init={{
            height: 300,
            menubar: false,
            plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
                "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
            }}
        />
        <button className="upload-button">Select post thumbnail</button>
        <button onClick={() => console.log(text)} className="create-button">Post</button>
    </div>
  );
};

const ViewPosts = () => {
  return (
    <div className="view-posts">
            <div className="post">
                <div className="post-image"></div>
                <div className="post-title">
                    <h3>Como integrar o graphQL com react</h3>
                </div>
                <div className="view-posts-options">
                    <button className="update"><FiEdit size={20} color='white' /></button>
                    <button className="delete"><FiTrash size={20} color='white' /></button>
                </div>
                </div>
            </div>
  )
}

const Profile = () => {
  return (
    <div className="profile-container">
      <div className="admin-bar">
        <div className="admin-info">
          <div className="admin-image"></div>
          <h3>admin</h3>
        </div>
        <div className="logout">
          <h3>LogOut</h3>
          <FiLogOut color="white" size={20} />
        </div>
      </div>
      <h2>Welcome, admin!</h2>
      <div className="panel">
        <div className="panel-options">
          <div className="option view-posts">View Posts</div>
          <div className="option create-post">Create Post</div>
          <div className="option update-post">Update Post</div>
        </div>
        <div className="selected-option">
            <CreatePost />
        </div>
      </div>
    </div>
  );
};

export default Profile;
