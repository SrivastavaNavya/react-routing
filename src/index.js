import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, NavLink, Route, Routes, useParams } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

const Home = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((data) => data.json())
      .then((data) => setPosts(data))
  }, [])
  return (
    <div className='home'>
      <h1>Posts</h1>
      <div className="post-container">
        {
          posts.map((post) => (
            <NavLink className={'nav'} style={{ display: "block" }} to={`/post/${post.id}`}>{post.title}</NavLink>
          ))
        }
      </div>
    </div>
  )
}

const About = () => {
  return (
    <h1>About Page</h1>
  )
}

const Profile = () => {
  return (
    <h1>Profile Page</h1>
  )
}

const Settings = () => {
  return (
    <h1>Settings Page</h1>
  )
}

const SayUser = () => {
  const params = useParams()
  console.log(params)
  return (
    <div>
      <h1>Your name is {params.userId}</h1>
    </div>
  )
}

const PostPage = () => {
  const params = useParams()
  console.log(params)
  const [data,setData]=useState(null)
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`)
      .then(data=>data.json())
      .then((data)=>setData(data))
  }, [])

  if(data===null){
    return <p>Loading.....</p>
  }
  return (
    <div className='post-page'>
      <h1>{data.title}</h1>
      <p>{data.body}</p>
    </div>
  )
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/post/:postId' element={<PostPage />} />
        <Route path='/user/:userId' element={<SayUser />} />
        <Route path='account'>
          <Route path='profile' element={<Profile />} />
          <Route path='settings' element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
