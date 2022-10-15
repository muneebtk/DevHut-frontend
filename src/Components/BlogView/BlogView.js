import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import AppContext from "../../Context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import "./blogView.css";
import AuthContext from "../../Context/AuthContext";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

function BlogView() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,

    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let { authTokens } = useContext(AuthContext);
  const config = {
    headers: { Authorization: `Bearer ${authTokens && authTokens.access}` },
  };

  const BASE_URL = "http://13.233.6.228";
  let {
    singleBlogData,
    singleBlogView,
    AuthorProfile,
    FollowAuthor,
    isAuthor,
    isAuthorUser,
    followRes,
  } = useContext(AppContext);
  let [likeRes, setLikeRes] = useState(undefined);
  let params = useParams();
  let x = params.id;
  let [deleteRes, setDeleteRes] = useState();
  let [okButton, setOkButton] = useState();

  let navigate = useNavigate();
  useEffect(() => {
    singleBlogView(x);
    isAuthorUser(x);
  }, []);

  let LikeBlog = async (id) => {
    axios.put(BASE_URL + `/blog_view/${id}/`, {}, config).then((response) => {
      if (response.status === 200) {
        setLikeRes(response.data);
      } else {
      }
    }).catch((error)=>{
      navigate('/user/login/')
    })
  };
  let deleteBlog = () => {
    axios
      .delete(BASE_URL + `/blogs/edit_blog/${x}/`, config)
      .then((response) => {
        if (response.status === 200) {
          setDeleteRes(response.data);
          setOkButton(true);
        } else {
          setDeleteRes(
            "Something went wrong! Blog does not deleted,Please try again"
          );
          setOkButton(true);
        }
      });
  };
 
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {!okButton ? (
              <div>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Do you want to delete this blog?
                </Typography>
                <Box align="end" sx={{ position: "relative" }}>
                  <Button
                    onClick={deleteBlog}
                    color="error"
                    variant="contained"
                  >
                    yes
                  </Button>
                </Box>
              </div>
            ) : (
              <div>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  {deleteRes}
                </Typography>
                <Box align="end" sx={{ position: "relative" }}>
                  <Button
                    onClick={() => navigate("/")}
                    color="primary"
                    variant="contained"
                  >
                    ok
                  </Button>
                </Box>
              </div>
            )}
          </Box>
        </Fade>
      </Modal>

      {singleBlogData ? (
        <Card elevation={0}>
          <CardContent>
            <div className="userDetail">
              {singleBlogData.author.image ? (
                <CardMedia
                  sx={{ width: "35px", borderRadius: "50%" }}
                  component="img"
                  height="35"
                  image={BASE_URL + singleBlogData.author.image}
                  alt="Paella dish"
                />
              ) : (
                <AccountCircleOutlinedIcon />
              )}
              <Typography
                onClick={() => AuthorProfile(singleBlogData.author.id)}
                sx={{ marginLeft: "5px", cursor: "pointer" }}
              >
                {singleBlogData.author.first_name}
              </Typography>

              {isAuthor && isAuthor.is_author ? (
                isAuthor ? (
                  isAuthor.is_author && (
                    <div style={{ marginLeft: "auto" }}>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() =>
                          navigate(`/blogs/edit_blog/${singleBlogData.id}/`)
                        }
                      >
                        edit
                      </Button>
                      <Button
                        style={{ marginLeft: "8px" }}
                        size="small"
                        variant="outlined"
                        onClick={handleOpen}
                      >
                        delete
                      </Button>
                    </div>
                  )
                ) : null
              ) : followRes ? (
                followRes.status ? (
                  <button
                    onClick={() => FollowAuthor(singleBlogData.author.id)}
                    className="follow_button"
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={() => FollowAuthor(singleBlogData.author.id)}
                    className="follow_button"
                  >
                    Follow
                  </button>
                )
              ) : isAuthor ? (
                isAuthor.is_followed ? (
                  <button
                    onClick={() => FollowAuthor(singleBlogData.author.id)}
                    className="follow_button"
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={() => FollowAuthor(singleBlogData.author.id)}
                    className="follow_button"
                  >
                    Follow
                  </button>
                )
              ) : (
                <button
                  onClick={() => FollowAuthor(singleBlogData.author.id)}
                  className="follow_button"
                >
                  Follow
                </button>
              )}

            </div>
            <Typography variant="caption">
              {singleBlogData.created_at} ago .{" "}
            </Typography>
            <Typography variant="caption">
              {singleBlogData.read_time} min read
            </Typography>
            {/* <Typography variant="caption">
              {singleBlogData.likes} Likes
            </Typography> */}

            <div>
              <CardMedia
                component="img"
                height="350"
                image={BASE_URL + singleBlogData.image}
                alt="Paella dish"
              />
              <Typography variant="h4" style={{ fontWeight: "" }}>
                {singleBlogData.title}
              </Typography>
              <Typography sx={{ textIndent: "40px" }}>
                {singleBlogData.content}
              </Typography>
              {/* {singleBlogData.author.is_liked? */}
              {/* <Box align='center' sx={{marginTop:'15px'}}>
              <Button onClick={() => LikeBlog(singleBlogData.id)}>
                <ThumbUpAltIcon fontSize="large" />
              </Button>
              <Typography>{likeRes?likeRes.count:singleBlogData.likes} Likes</Typography>
            </Box>
              : */}
              {likeRes !== undefined ? (
                likeRes.status ? (
                  <Box align="center" sx={{ marginTop: "15px" }}>
                    <Button onClick={() => LikeBlog(singleBlogData.id)}>
                      <ThumbUpAltIcon fontSize="large" />
                    </Button>
                    <Typography>
                      {likeRes ? likeRes.count : singleBlogData.likes} Likes
                    </Typography>
                  </Box>
                ) : (
                  <Box align="center" sx={{ marginTop: "15px" }}>
                    <Button onClick={() => LikeBlog(singleBlogData.id)}>
                      <ThumbUpOffAltIcon fontSize="large" />
                    </Button>
                    <Typography>
                      {likeRes ? likeRes.count : singleBlogData.likes} Likes
                    </Typography>
                  </Box>
                )
              ) : isAuthor ? (
                isAuthor.is_liked ? (
                  <Box align="center" sx={{ marginTop: "15px" }}>
                    <Button onClick={() => LikeBlog(singleBlogData.id)}>
                      <ThumbUpAltIcon fontSize="large" />
                    </Button>
                    <Typography>{singleBlogData.likes} Likes</Typography>
                  </Box>
                ) : (
                  <Box align="center" sx={{ marginTop: "15px" }}>
                    <Button onClick={() => LikeBlog(singleBlogData.id)}>
                      <ThumbUpOffAltIcon fontSize="large" />
                    </Button>
                    <Typography>{singleBlogData.likes} Likes</Typography>
                  </Box>
                )
              ) : (
                <Box align="center" sx={{ marginTop: "15px" }}>
                  <Button onClick={() => LikeBlog(singleBlogData.id)}>
                    <ThumbUpOffAltIcon fontSize="large" />
                  </Button>
                  <Typography>{singleBlogData.likes} Likes</Typography>
                </Box>
              )}
            </div>
          </CardContent>
        </Card>
      ) : null}
      <Typography sx={{ marginLeft: "10px" }} variant="subtitle1">
        Comments
      </Typography>
    </div>
  );
}

export default BlogView;
