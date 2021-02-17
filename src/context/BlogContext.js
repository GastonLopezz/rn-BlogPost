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
        case 'remove':
            return state.filter((blogPost)=> blogPost.id !== action.payload);
        default:
            return state;

    }
}

const addBlogPost = dispatch => {
    return (title,content)=>{
        dispatch({type: 'add', payload:{title,content} });
    }   
}

const deleteBlogPost = dispatch => {
    return (id) => {
        dispatch({type: 'remove', payload: id});
    }
}

export const { Context, Provider} = createDataContext(
    blogReducer, 
    {addBlogPost, deleteBlogPost},
    []
    );

