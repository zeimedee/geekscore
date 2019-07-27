import React,{useState} from 'react';
import axios from 'axios';

function Addpost(){
    const [title, setTitle] = useState('');
    const [post, setPost] = useState('');
    

    const handleSubmit = (e) =>{
            e.preventDefault();
        
        const newPost = {
            title: title,
            post: post
        };
        if(post !=='' && title !==''){
        axios.post('http://localhost:4000/mydb/add', newPost)
            .then(res => console.log(res.data))

            setTitle('');
            setPost('');
        
        }else{
                console.log('no post');
                
            }
    }

    const butState = () => {
        if( post === '' || title === ''){
            return true;
        }else{ console.log('post');
        }
    }

    
    return(
        <div>
           <form onSubmit={handleSubmit}>
           <label>Title</label>
           <input 
               className='bg-white focus:outline-0 focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal'
               type='text'
               name='title'
               value={title}
               onChange={e => setTitle(e.target.value)}
           />
           <label>Post</label>
           <input 
               className='bg-white focus:outline-0 focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal'
               type='text'
               name="post"
               value={post}
               onChange={e => setPost(e.target.value)}
           />
           
            <button 
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
            disabled={butState()}
            >Submit</button>
           </form>
        </div>
    );
}

export default Addpost;