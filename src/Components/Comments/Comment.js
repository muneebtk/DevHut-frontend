import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CssBaseline,
  Fade,
  Grid,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState, useContext, useEffect } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import "./comment.css";
import AppContext from "../../Context/AppContext";
import AuthContext from "../../Context/AuthContext";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import axios from "../../Utils/axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function Comment() {
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

  // delete function modal
  const [delOpen, setDelOpen] = React.useState(false);
  const handleDelOpen = () => setDelOpen(true);
  const handleDelClose = () => setDelOpen(false);

  let [editCommentData, setEditCommentData] = useState();
  let [commentId, setCommentId] = useState();
  let [editedCommentRes, setEditedCommentRes] = useState();

  let { singleBlogData, postComment, singleBlogView } = useContext(AppContext);
  let { user,authTokens } = useContext(AuthContext);
  let navigate = useNavigate();
  let SubmitComment = (e) => {
    e.preventDefault();
    if (e.target.comment.value === "") {
      return false;
    } else {
      postComment(e.target.comment.value);
    }
  };
  // fetch data of edit comment
  let GetComment = (id) => {
    axios.get(`/edit_or_delete_comment/${id}/`).then((response) => {
      if (response.status === 200) {
        setEditCommentData(response.data.comment);
        setCommentId(response.data.id);
      }
    });
  };
  // submit edited comment
  let SubmitEditedComment = (id) => {
    axios
      .put(
        `/edit_or_delete_comment/${id}/`,
        { comment: editCommentData },
        config
      )
      .then((response) => {
        if (response.status === 200) {
          setEditedCommentRes(response.data);
          setOkButton(true);
        }
      });
  };
  let [deleteRes, setDeleteRes] = useState();
  let [okButton, setOkButton] = useState();
  let EditButton = (id) => {
    handleOpen();
    GetComment(id);
  };
  let clickOkButton = () => {
    handleClose();
    setOkButton(false);
  };
  const config = {
    headers: { Authorization: `Bearer ${authTokens?authTokens.access:null}` }
  };


  let DeleteComment = (id) => {
    axios.delete(`/edit_or_delete_comment/${id}/`, config).then((response) => {
      if (response.status === 200) {
        setDeleteRes(response.data);
        setOkButton(true);
      }
    });
  };
  let [deleteCommentId, setDeleteCommetId] = useState();
  let onDeleteButtonClick = (id) => {
    setDeleteCommetId(id);
    setDelOpen(true);
  };
  let clickDelOkButton = () => {
    handleDelClose();
    setOkButton(false);
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
                <textarea
                  onChange={(e) => setEditCommentData(e.target.value)}
                  value={editCommentData}
                  style={{ width: "100%", height: "110px" }}
                  placeholder="Write comment"
                />
                <Box
                  align="center"
                  sx={{ position: "relative", marginTop: "5px" }}
                >
                  <Button
                    variant="contained"
                    onClick={() => SubmitEditedComment(commentId)}
                  >
                    post
                  </Button>
                </Box>
              </div>
            ) : (
              <div>
                <CheckCircleIcon
                  align="center"
                  sx={{ margin: "0 120px", color: "#20fc03", fontSize: "80px" }}
                />
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  {editedCommentRes}
                </Typography>
                <Box align="end" sx={{ position: "relative" }}>
                  <Button
                    onClick={clickOkButton}
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

      {/* delete modal */}
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={delOpen}
          onClose={handleDelClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={delOpen}>
            <Box sx={style}>
              {!okButton ? (
                <div>
                  <Typography
                    align="center"
                    id="transition-modal-title"
                    variant="h5"
                    component="h2"
                  >
                    Are you sure?
                  </Typography>
                  <Typography>Do you want to delete this comment?</Typography>
                  <Box
                    align="center"
                    sx={{ position: "relative", marginTop: "5px" }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => DeleteComment(deleteCommentId)}
                    >
                      delete
                    </Button>
                  </Box>
                </div>
              ) : (
                <div>
                  <CheckCircleIcon
                    align="center"
                    sx={{
                      margin: "0 120px",
                      color: "#20fc03",
                      fontSize: "80px",
                    }}
                  />
                  <Typography
                    id="transition-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    {deleteRes && deleteRes.message}
                  </Typography>
                  <Box align="end" sx={{ position: "relative" }}>
                    <Button
                      onClick={clickDelOkButton}
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
      </div>

      <Card elevation={0} className="singleBlogCard" variant="outlined">
        <Grid container spacing={3}>
          <Grid item>
            <CssBaseline />
            <CardContent>
              <div style={{ display: "flex" }}>
                <AccountCircleOutlinedIcon />
                <Typography sx={{ marginLeft: "10px" }}>
                  {user ? user.name : null}
                </Typography>
              </div>
              <form onSubmit={SubmitComment}>
                <textarea
                  name="comment"
                  placeholder="add comment"
                  className="boxsizingBorder"
                  cols="100"
                  rows="4"
                ></textarea>
                <button
                  type="submit"
                  className="follow_button"
                >
                  Post
                </button>
              </form>
            </CardContent>
          </Grid>
        </Grid>
      </Card>

      {singleBlogData
        ? singleBlogData.comments.map((obj) => (
            <div>
              <Card elevation={0} variant="outlined">
                <Grid container spacing={3}>
                  <Grid item>
                    <div>
                      <CssBaseline />
                      <CardContent>
                        <div style={{ display: "flex" }}>
                          {obj.user.image ? (
                            <CardMedia
                              sx={{ width: "35px", borderRadius: "50%" }}
                              component="img"
                              height="35"
                              image={obj.user.image}
                              alt="Paella dish"
                            />
                          ) : (
                            <AccountCircleOutlinedIcon />
                          )}
                          <Typography sx={{ marginLeft: "10px" }}>
                            {obj.user.first_name}
                          </Typography>
                          {user
                            ? obj.user.id === user.user_id && (
                                <div align="end" style={{ marginLeft: "auto" }}>
                                  <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={() => EditButton(obj.id)}
                                  >
                                    edit
                                  </Button>
                                  <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={() => onDeleteButtonClick(obj.id)}
                                  >
                                    delete
                                  </Button>
                                </div>
                              )
                            : null}
                        </div>

                        <Typography
                          sx={{ marginLeft: "auto" }}
                          variant="caption"
                        >
                          {obj.created_at} ago
                        </Typography>
                        <Typography>{obj.comment}</Typography>
                        <Container maxWidth="sm">
                          <Box sx={{ bgcolor: "#cfe8fc" }} />
                        </Container>
                      </CardContent>
                    </div>
                  </Grid>
                </Grid>
              </Card>
            </div>
          ))
        : null}
    </div>
  );
}

export default Comment;
