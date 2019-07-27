import  React, { useState, useEffect,  } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';






function Posts(props) {

    const [post, setPost] = useState([]);

    const fetchData= () => {
        axios.get('http://localhost:4000/mydb')
         .then(res => setPost(res.data))
         .catch(error => console.log(error));
         
    }

    useEffect(() => {
        fetchData();
     },[post]);

     

     const handleDelete = (e, id) => {
        e.preventDefault();

         axios.delete('http://localhost:4000/mydb/delete/' + id)
              .then(console.log('post deleted'))
              .catch(err => console.log(err))
              
     }
       
    
    return (
       
        <div style={{paddingLeft: '20px'}} >
           {post.map((n,index) => (
               <React.Fragment>
               <h2 key={index} style={{paddingTop: '10px'}}>{n.title}</h2>
               <p>{n.post}</p>
               <button style={{paddingRight: '5px'}}><Link to={'/editpost/'+ n._id}>Edit</Link></button>
               <button onClick={e => handleDelete(e, n._id)}>Delete</button>
               </React.Fragment>
           ))}
        </div>
    );
} 

export default Posts;