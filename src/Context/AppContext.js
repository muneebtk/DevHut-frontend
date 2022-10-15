import React ,{createContext, useState,useContext}from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';

const AppContext = createContext()

export default AppContext;

export const AppProvider =({children})=> {
    const [allBlogs,setAllBlogs] = useState([])
    const [singleBlogData,setSingleBlogData] = useState()
    const navigate = useNavigate()
    const BASE_URL = 'https://www.devhut.lappie.store/'
    
    const [prms,setPrms] = useState()
    const [authorProfileData,setAuthorProfileData] = useState()  
    const [userId,setUserId] = useState()
    let [loading,setLoading] = useState()
    const [followRes, setFollowRes] = useState();
    const [searchData,setSearchData] = useState()
    

    const {authTokens} = useContext(AuthContext);
    
    const config = {
        headers: { Authorization: `Bearer ${authTokens?authTokens.access:null}` }
    };

    let blogs =async ()=>{
        await axios.get(BASE_URL)
        .then ((response)=>{
            setAllBlogs(response.data)
        })
    }

    // let [isUser,setIsUser] = useState()
    let [isAuthor,setIsAuthor] = useState()

    let isAuthorUser=(id)=>{
      axios.get(BASE_URL+`/blogs_author/${id}/`,config)
      .then((response)=>{
        if (response.status===200){
          setIsAuthor(response.data)
        }else{
          setIsAuthor(response.data)
        }
      })
    }

    //single blog page view
    let singleBlogView =async (id)=>{
        setPrms(id)
        await axios.get(BASE_URL+`/blog_view/${id}/`)
        .then ((response)=>{
            setSingleBlogData(response.data.serializer)
            isAuthorUser(response.data.id)
            navigate(`/blog_view/${id}`)
        })
    }
    // post comment on blogs
    let postComment = async(comment)=>{
        await axios.post(BASE_URL+`/blog_view/${prms}/`,{
            comment:comment
        },config)
        .then ((response)=>{
            if (response.status === 200){
            }else{
            }
        }).catch((error)=>{
          navigate('user/login/')
        })
    }

    // profile page view of author
    let AuthorProfile =async (userid)=>{
        setLoading(true)
        setUserId(userid)
        console.log('author Profile');
        await axios.get(BASE_URL+`/author/profile/${userid}/`)
        .then ((response)=>{
            if (response.status===200){
                setLoading(false)
                setAuthorProfileData(response.data)
                isAuthorUser(response.data.id)
                navigate(`/author/profile/${userid}/`)
            }else{
                setLoading(false)
            }
        })
    }
// follow an author
    let FollowAuthor = async (user_id) => {
        await axios
          .post(BASE_URL +`/author/profile/${user_id}/`,{}, config)
          .then((response) => {
            if (response.status === 200) {
              setFollowRes(response.data);
            } else if (response.status===401){
             
            }
          }).catch((err)=>{
            navigate('user/login')
          })
      };
    // search blogs 
    let searchBlogs = (key)=>{
        axios.get(BASE_URL+`/search/?search=${key}`)
        .then((response)=>{
            if (response.status === 200){
                setSearchData(response.data)
                navigate(`/search/${key}`)
            }else{
            }
        })
      }

      let [categoryData, setCategoryData] = useState();
      let CategoryView = (slug) => {
        axios.get(BASE_URL + `/blogs/${slug}/`).then((response) => {
          if (response.status === 200) {
            setCategoryData(response.data);
            navigate(`/blogs/${slug}/`)
          } else {
          }
        });
      };
      let [titleText,setTitleText] = useState([])

      let makeTitle = (slug) =>{
        if (slug){
          var words = slug.split('-');
      
          for (var i = 0; i < words.length; i++) {
            var word = words[i];
            words[i] = word.charAt(0).toUpperCase() + word.slice(1);
          }
              setTitleText(words.join(' '))
        }else{
          setTitleText(words)
        }
      }  
   
    let contextData = {
        blogs:blogs,
        allBlogs:allBlogs,
        singleBlogData:singleBlogData,
        singleBlogView:singleBlogView,
        postComment:postComment,
        prms:prms,
        AuthorProfile:AuthorProfile,
        authorProfileData:authorProfileData,
        userId:userId,
        loading:loading,
        FollowAuthor:FollowAuthor,
        followRes:followRes,
        searchBlogs:searchBlogs,
        searchData:searchData,
        categoryData:categoryData,
        CategoryView:CategoryView,
        titleText:titleText,
        makeTitle:makeTitle,
        isAuthorUser:isAuthorUser,
        isAuthor:isAuthor,
    }
    return (
   <AppContext.Provider value={contextData}>
        {children}
   </AppContext.Provider>
  )
}

