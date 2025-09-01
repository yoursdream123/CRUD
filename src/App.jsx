
import axios from 'axios'
import { useState, useEffect } from 'react'  //for R adding useEffect
import './app.css'


function App() {
    const [postTitle, setPostTitle] = useState("")
    const [postImage, setPostImage] = useState("")
    const [postDesc, setPostDesc] = useState("")
    const [posts, setPosts] = useState([])   //for R => yeh eik list hai saari posts list mein add hongi 


    const [updateId, setUpdateId] = useState(null)   //fro U means update


    //from line 1407 to 1441 yeh likha gaya hai post ka data ui par dikhanay kay liye
    const getPosts = async () => {
        try {
            const res = await axios.get("https://68b4764045c9016787706c6c.mockapi.io/posts")
            setPosts(res.data)
        } catch (error) {
            console.log("error uploading data", error)
        }
    }

    useEffect(() => {
        getPosts()
    }, [])



    const postHandler = async () => {
        const data = {
            postTitle,
            postImage,
            postDesc
        }
        try {
            const response = await axios.post("https://68b4764045c9016787706c6c.mockapi.io/posts", data)

            setPosts((prevPosts) => [...prevPosts, response.data]);

            setPostTitle("")
            setPostImage("")
            setPostDesc("")

        } catch (error) {
            console.log("error uploading data", error)
        }
    }

    //this line is for U means update from 1440 to 1469
    const editHandler = (id, post) => {
        setUpdateId(id)
        setPostTitle(post.postTitle)
        setPostImage(post.postImage)
        setPostDesc(post.postDesc)
    }


    const updateHandler = async () => {
        const updatedData = {
            postTitle,
            postImage,
            postDesc
        }
        try {
            const updatePost = await axios.put(`https://68b4764045c9016787706c6c.mockapi.io/posts/${updateId}`, updatedData)
            getPosts()

            setPostTitle("")
            setPostImage("")
            setPostDesc("")
            setUpdateId(null)
        } catch (error) {
            console.log("error hai jani", error)
        }
    }

    // this part is D means delete form C R U D from 1472 to 1479
    const deleteHandler = async (id) => {
        try {
            await axios.delete(`https://68b4764045c9016787706c6c.mockapi.io/posts/${id}`)
            getPosts()
        } catch (error) {
            console.log("error toh phir error hai", error)
        }
    }
    return (
        <div className="container">
            <div>
                <div>
                <input type="text" placeholder='title here...' value={postTitle} onChange={(e) => setPostTitle(e.target.value)} style={{width: "150px"}} />
                <input type="text" placeholder='image url...' value={postImage} onChange={(e) => setPostImage(e.target.value)} style={{width: "150px"}} />
                </div>
                <div className='last'>
                    <input type="text" placeholder='description...' value={postDesc} onChange={(e) => setPostDesc(e.target.value)} style={{width: "230px"}} />
                    {updateId ? <button onClick={updateHandler}>Update</button> : <button onClick={postHandler}>Post</button>} {/* this line is for u means Update */}
                </div>
            </div>

            {/*this part is the part of R from CRUD*/}
            {posts.map((post) => (
                <div className="container2" key={post.id}>
                    <h2>{post.postTitle}</h2>
                    <img src={post.postImage} width = "300px" height = "100px" />
                    <p>{post.postDesc}</p>
                    <button onClick={() => editHandler(post.id, post)}>Edit</button>
                    <button onClick={() => deleteHandler(post.id)}>Delete</button> {/* this button is D from C R U D */}
                </div>
            ))}
        </div>
    )
}

export default App;
