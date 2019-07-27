import React,{useState, useEffect} from 'react';
import axios from 'axios';

function Edit(){
    const [title, setTitle] = useState('');
    const [post, setPost] = useState('');

    
    const [id, setID] = useState(window.location.href.split('/').pop());
    
        
    const fetchData = () =>{
        axios.get('http://localhost:4000/mydb/'+ id)
             .then(res => {
                 setTitle(res.data.title);
                 setPost(res.data.post);
             })
             .catch(err => console.log(err));
    }

    useEffect(() => {
       fetchData();
    },[]);



    const handleUpdate = (e) =>{
            e.preventDefault();
        
        const newPost = {
            title: title,
            post:  post
        };
        axios.post('http://localhost:4000/mydb/update/'+ id, newPost)
            .then(res => console.log(res.data))

            setTitle('');
            setPost('');
            setID('');
            
    }


    const butState = () => {
        if( post === '' || title === ''){
            return true;
        }else{ console.log('post');
        }
    }
    
    return(
        <div>
           <form onSubmit={handleUpdate}>
           <label>Title</label>
           <input 
               type='text'
               name='title'
               value={title}
               onChange={e => setTitle(e.target.value)}
               className='bg-white focus:outline-0 focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal'
           />
           <label>Post</label>
           <input 
               type='text'
               name="post"
               value={post}
               onChange={e => setPost(e.target.value)}
               className='bg-white focus:outline-0 focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal'
           />
           
            <button 
                type='submit'
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
                disabled={butState()}
            >Update</button>
           </form>
        </div>
    );
}

export default Edit;