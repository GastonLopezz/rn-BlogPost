import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

const blogReducer =(state,action)=>{
    switch(action.type){
        case 'get':
            return action.payload;
        case 'edit':
            console.log(action.payload);
            return state.map((blogPost)=>{
                return blogPost.id === action.payload.id ? action.payload : blogPost
            });
        case 'remove':
            return state.filter((blogPost)=> blogPost.id !== action.payload);
        default:
            return state;

    }
}

const getBlogPosts = dispatch=>{
    return async ()=>{
        const response = await jsonServer.get('blogposts');
        dispatch({type:'get',payload: response.data});
    }
};

const addBlogPost = dispatch => {
    return async (title,content, callback)=>{
        await jsonServer.post('/blogposts',{title,content})
        if(callback){
            callback();
        }        
    }   
}

const editBlogPost = dispatch => {
    return async (id,title,content, callback)=>{
        await jsonServer.put(`/blogposts/${id}`,{title,content})
        dispatch({type: 'edit', payload:{id,title,content} });
        callback();
    }   
}

const deleteBlogPost = dispatch => {
    return async (id) => {
        await jsonServer.delete(`/blogposts/${id}`);
        dispatch({type: 'remove', payload: id});
    }
}

export const { Context, Provider} = createDataContext(
    blogReducer, 
    {addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts},
    []
    );

