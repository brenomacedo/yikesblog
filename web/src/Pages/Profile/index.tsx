import React, { useState, useEffect, Dispatch, SetStateAction } from "react"
import { FiLogOut, FiTrash, FiEdit } from "react-icons/fi"
import { Editor } from "@tinymce/tinymce-react"
import { useHistory, useLocation } from "react-router-dom"
import axios from 'axios'
import "./styles.css"

interface IUpdateProps {
  idToUpdate: number
  setTab: Dispatch<SetStateAction<string>>
}

interface IViewPostsProps {
  setIdToUpdate: Dispatch<SetStateAction<number>>
  setTab: Dispatch<SetStateAction<string>>
}

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
  const [file, setFile] = useState<File>()
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

    const formData = new FormData()
    formData.append("title", title)
    formData.append("content", content)
    formData.append("userId", `${location.state.user.id}`)
    formData.append("path", title.toLocaleLowerCase().split(' ').join('-'))
    formData.append("filename", file as Blob)
    

    try {
      await axios.post("/posts/create", formData)

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
        <input type='file' id='upload' style={{display: "none"}} onChange={e => {
          if(!e.target.files) {
            return
          }
          setFile(e.target.files[0])
        }} />
        <label htmlFor='upload' className="upload-button">Select post thumbnail</label>
        <button onClick={insertPost} className="create-button">Post</button>
    </div>
  )
}

const UpdatePost: React.FC<IUpdateProps> = (props) => {

  interface ILocation {
    user: {
      id: number
      login: string
      nickname: string
    }
  }

  interface IPost {
    title: string
    content: string
    urlImage: string
  }

  const location = useLocation<ILocation>()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const history = useHistory()
  
  const handleEditorChange = (content: string, editor: string) => {
    setContent(content)
  }

  useEffect(() => {
    axios.get<IPost>(`/posts/get/${props.idToUpdate}`)
      .then(resp => {
        setTitle(resp.data.title)
        setContent(resp.data.content)
      }).catch(err => {})
  }, [])

  useEffect(() => {
    if(!location.state.user) {
      history.push('/')
    }
  }, [])

  const updatePost = async (id: number) => {
    await axios.put(`/posts/update/${id}`, {
      title,
      content
    })
    alert('post successfuly updated!')
    props.setTab('VIEW')
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
        <button onClick={() => updatePost(props.idToUpdate)} className="create-button">Update!</button>
    </div>
  );
};

const ViewPosts: React.FC<IViewPostsProps> = (props) => {

  interface IPost {
    id: number
    urlImage: string
    path: string
    title: string
  }

  const [list, setList] = useState<IPost[]>([])

  useEffect(() => {
    refresh()
  }, [])

  const refresh = () => {
    axios.get<IPost[]>('/posts/all/get')
      .then(resp => {
        setList(resp.data)
    }).catch(err => {

    })
  }

  const deletePost = (id: number, title: string) => {
    const permission = window.confirm(`Are you sure you want to delete the post '${title}'?`)
    if(!permission) {
      return
    }

    axios.delete(`/posts/delete/${id}`).then(resp => {
      alert('post deletado com sucesso!')
      refresh()
    }).catch(err => {})
  }

  const renderViewPost = () => {
    return list.map(post => (
      <div className="view-post">
        <div className="view-post-image" style={{
          backgroundImage: `url('http://localhost:3003/${post.urlImage}')`
        }}></div>
        <div className="view-post-title">
          <h3>{post.title}</h3>
        </div>
        <div className="view-posts-options">
          <button className="update" onClick={() => {
            props.setTab("UPDATE")
            props.setIdToUpdate(post.id)
          }}><FiEdit size={20} color='white' /></button>
          <button className="delete" onClick={() => {
            deletePost(post.id, post.title)
          }}><FiTrash size={20} color='white' /></button>
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
  const [idToUpdate, setIdToUpdate] = useState(0)

  const logout = () => {
    sessionStorage.clear()
    axios.defaults.headers.authorization = ''
    history.push('/')
  }

  const renderTab = () => {
    if(tab === 'VIEW')
      return <ViewPosts setIdToUpdate={setIdToUpdate} setTab={setTab} />

    if(tab === 'CREATE')
      return <CreatePost />

    if(tab === 'UPDATE')
      return <UpdatePost idToUpdate={idToUpdate} setTab={setTab} />
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
