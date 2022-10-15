import React, { useContext, useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    Paper,
    TableContainer,
    TableHead,
    TableRow,
    Button,
  } from "@mui/material";
import axios from 'axios';
import AuthContext from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';


function AdminBlogList() {
  let navigate = useNavigate()
    let [allBlogsData,setAllBlogsData] = useState()
    let { authTokens } = useContext(AuthContext);
    let [BlogState, setBlogState] = useState();
    const config = {
        headers: {
          Authorization: `Bearer ${authTokens ? authTokens.access : null}`,
        },
      };
      const BASE_URL = "https://www.devhut.lappie.store";
    let AllBlogsList = ()=>{
        axios.get(BASE_URL+'/admin_panel/all_blogs/',config)
        .then ((response)=>{
            setAllBlogsData(response.data)
        })
    }
    useEffect(() => {
        AllBlogsList()
    }, [])

    let BlockOrUnblockBlog = (id) => {
      axios.put(BASE_URL + `/admin_panel/block_or_unblock_blog/${id}/`).then((response) => {
        AllBlogsList()
      });
    };
   
    
  return (
    <div>
         <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Id</TableCell>
            <TableCell align="center">Category</TableCell>
            <TableCell align="center">Author</TableCell>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Read Time</TableCell>
            <TableCell align="center">Created At</TableCell>
            <TableCell align="center">Likes</TableCell>
            <TableCell align="center">Action</TableCell>
            <TableCell align="center">Action</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {allBlogsData?allBlogsData.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="center">{row.category}</TableCell>
              <TableCell align="center">{row.author}</TableCell>
              <TableCell align="center">{row.title}</TableCell>
              <TableCell align="center">{row.read_time}</TableCell>
              <TableCell align="center">{row.created_at}</TableCell>
              <TableCell align="center">{row.likes}</TableCell>
              <TableCell> { !row.is_blocked ? (
                        <Button variant='outlined' size='small'
                          onClick={() => BlockOrUnblockBlog(row.id)}
                          color="error"
                        >
                          block
                        </Button>
                      ) : (
                        <Button variant='outlined' size='small'
                          onClick={() => BlockOrUnblockBlog(row.id)}
                          color="success"
                        >
                          UnBlock
                        </Button>
                      )}
                    </TableCell>
                    <TableCell align="center" >
                      <Button variant='outlined' size='small' onClick={()=>navigate(`/blog_view/${row.id}`)}>view</Button>
                    </TableCell>
            </TableRow>
           )):null}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default AdminBlogList