import React, { useState, useEffect } from "react"
import { FiLogOut, FiTrash, FiEdit } from "react-icons/fi"
import { Editor } from "@tinymce/tinymce-react"
import { useHistory, useLocation } from "react-router-dom"
import axios from 'axios'
import "./styles.css"

const CreatePost = () => {

  interface ILocation {
    user: {
      id: number
      login: string
      nickname: string
    }
  }

  const location = useLocation<ILocation>()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const history = useHistory()

  const handleEditorChange = (content: string, editor: string) => {
    setContent(content)
  }

  useEffect(() => {
    if(!location.state.user) {
      history.push('/')
    }
  }, [])

  const insertPost = async () => {
    try {
      await axios.post("/posts/create", {
        title,
        content,
        userId: location.state.user.id,
        urlImage: "/image.png",
        path: title.toLocaleLowerCase().split(' ').join('-')
      })

      alert('post successfuly added!')
      setTitle('')
      setContent('')
    } catch(e) {
      alert("an error ocurred, try again")
    }
  }

  return (
    <div className="create-post">
        <h3>Post title:</h3>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="my post title" type="text" />
        <Editor
            value={content} onEditorChange={handleEditorChange}
            apiKey="w32catiriiirutgmkiypr53w0cpy3rughud01410u38ke1i6"
            init={{
            height: 500,
            menubar: true,
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
        <button onClick={insertPost} className="create-button">Post</button>
    </div>
  )
}

const UpdatePost = () => {

  interface ILocation {
    user: {
      id: number
      login: string
      nickname: string
    }
  }

  const location = useLocation<ILocation>()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const history = useHistory()

  const handleEditorChange = (content: string, editor: string) => {
    setContent(content)
  }

  useEffect(() => {
    if(!location.state.user) {
      history.push('/')
    }
  }, [])

  

  return (
    <div className="create-post">
        <h3>Post title:</h3>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="my post title" type="text" />
        <Editor
            value={content} onEditorChange={handleEditorChange}
            apiKey="w32catiriiirutgmkiypr53w0cpy3rughud01410u38ke1i6"
            init={{
            height: 500,
            menubar: true,
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
        <button onClick={() => {}} className="create-button">Post</button>
    </div>
  );
};

const ViewPosts = () => {

  interface IPost {
    id: number
    urlImage: string
    path: string
    title: string
  }

  const [list, setList] = useState<IPost[]>([])

  useEffect(() => {
    axios.get<IPost[]>('/posts/all/get')
      .then(resp => {
        setList(resp.data)
      }).catch(err => {

      })
  }, [])

  const renderViewPost = () => {
    return list.map(post => (
      <div className="view-post">
        <div className="view-post-image" style={{
          backgroundImage: `url('${post.urlImage}')`
        }}></div>
        <div className="view-post-title">
          <h3>{post.title}</h3>
        </div>
        <div className="view-posts-options">
          <button className="update"><FiEdit size={20} color='white' /></button>
          <button className="delete"><FiTrash size={20} color='white' /></button>
        </div>
      </div>
    ))
  }
  
  return (
    <div className="view-posts">
        {renderViewPost()}
    </div>
  )
}

const Profile = () => {

  const history = useHistory()
  const [tab, setTab] = useState('VIEW')

  const logout = () => {
    sessionStorage.clear()
    axios.defaults.headers.authorization = ''
    history.push('/')
  }

  const renderTab = () => {
    if(tab === 'VIEW')
      return <ViewPosts />

    if(tab === 'CREATE')
      return <CreatePost />

    if(tab === 'UPDATE')
      return <UpdatePost />
  }

  return (
    <div className="profile-container">
      <div className="admin-bar">
        <div className="admin-info">
          <div className="admin-image"></div>
          <h3>admin</h3>
        </div>
        <div onClick={logout} className="logout">
          <h3>LogOut</h3>
          <FiLogOut color="white" size={20} />
        </div>
      </div>
      <h2>Welcome, admin!</h2>
      <div className="panel">
        <div className="panel-options">
          <div onClick={() => setTab('VIEW')} className="option view-posts">View Posts</div>
          <div onClick={() => setTab('CREATE')} className="option create-post">Create Post</div>
          <div className="option update-post">Update Post</div>
        </div>
        <div className="selected-option">
            {renderTab()}
        </div>
      </div>
    </div>
  );
};

export default Profile;
