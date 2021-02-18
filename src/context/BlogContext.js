import createDataContext from './createDataContext'

const blogReducer =(state,action)=>{
    switch(action.type){
        case 'add':
            return [
                ...state, 
                { 
                    id: Math.floor(Math.random() * 99999), 
                    title: action.payload.title,
                    content: action.payload.content 
                }
            ];
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

const addBlogPost = dispatch => {
    return (title,content, callback)=>{
        dispatch({type: 'add', payload:{title,content} });
        callback();
    }   
}

const editBlogPost = dispatch => {
    return (id,title,content, callback)=>{
        console.log(id);
        console.log(title);
        console.log(content);
        dispatch({type: 'edit', payload:{id,title,content} });
        callback();
    }   
}

const deleteBlogPost = dispatch => {
    return (id) => {
        dispatch({type: 'remove', payload: id});
    }
}

export const { Context, Provider} = createDataContext(
    blogReducer, 
    {addBlogPost, deleteBlogPost, editBlogPost},
    [{title:'TEST', content:'TEST CONTENT', id: 1}]
    );

