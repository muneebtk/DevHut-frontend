import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  LinearProgress,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppContext from "../../Context/AppContext";
import "./authProfile.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box } from "@mui/system";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

function AuthorProfile() {
  let {
    authorProfileData,
    isAuthorUser,
    isAuthor,
    AuthorProfile,
    loading,
    followRes,
    FollowAuthor,
  } = useContext(AppContext);
  useEffect(() => {
    AuthorProfile(p);
    isAuthorUser(p);
  }, []);
 
  let navigate = useNavigate();

  const BASE_URL = "https://www.devhut.lappie.store";
 
  let params = useParams();
  let p = params.id;

  return (
    <div>
      {loading ? (
        <Box sx={{ display: "flex" }}>
          <LinearProgress />
        </Box>
      ) : null}
      {authorProfileData
        ? authorProfileData.author.slice(0, 1).map((obj) => (
            <Card className="bloger_card" sx={{ width: 230, minHeight: 500 }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {obj.author.image ? (
                  <CardMedia
                    style={{
                      borderRadius: "50%",
                      padding: "0px 40px",
                      marginTop: "20px",
                    }}
                    component="img"
                    alt="author"
                    height="150"
                    image={BASE_URL + obj.author.image}
                  />
                ) : (
                  <AccountCircleIcon sx={{ width: 120, height: 120 }} />
                )}
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {obj.author.first_name}
                    <span>
                      {" "}
                      {obj.author.last_name ? obj.author.last_name : null}
                    </span>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  ></Typography>
                  <Typography align="center">
                    {followRes ? followRes.followers : obj.author.followers}{" "}
                    followers
                  </Typography>
                </CardContent>
                <CardActions>

                {isAuthor&&isAuthor.is_author?
              isAuthor?isAuthor.is_author&&
            <div><Button size="small" variant="outlined" onClick={()=>navigate(`/author/profile/edit/${obj.author.id}/`)}>edit profile</Button>
           </div>  
            :null:

            followRes?followRes.status?
               <button
               onClick={() => FollowAuthor(obj.author.id)}
               className="follow_button"
             >Unfollow
             </button>:
              <button
              onClick={() => FollowAuthor(obj.author.id)}
              className="follow_button"
            >Follow
            </button>:
              
              isAuthor?isAuthor.is_followed? <button
                    onClick={() => FollowAuthor(obj.author.id)}
                    className="follow_button"
                  >Unfollow
                  </button>:
                   <button
                  onClick={() => FollowAuthor(obj.author.id)}
                  className="follow_button"
                >Follow
                </button>:
                <button
                onClick={() => FollowAuthor(obj.author.id)}
                className="follow_button"
              >Follow
              </button>
                }

                  
                  {/* {followRes ? (
                    followRes.status ? (
                      <button
                        onClick={() => FollowAuthor(obj.author.id)}
                        className="follow_button"
                      >
                        UnFollow1
                      </button>
                    ) : (
                      <button
                        onClick={() => FollowAuthor(obj.author.id)}
                        className="follow_button"
                      >
                        Follow
                      </button>
                    )
                  ) : isUser ? (
                    isUser.is_followed ? (
                      <button
                        onClick={() => FollowAuthor(obj.author.id)}
                        className="follow_button"
                      >
                        UnFollow
                      </button>
                    ) : (
                      <button
                        onClick={() => FollowAuthor(obj.author.id)}
                        className="follow_button"
                      >
                        Follow
                      </button>
                    )
                  ) : isAuthor ? (
                    <Button onClick={()=>navigate(`/author/profile/edit/${obj.author.id}/`)}>edit profile</Button>
                  ) : (
                    <button
                      onClick={() => FollowAuthor(obj.author.id)}
                      className="follow_button"
                    >
                      Follow
                    </button>
                  )} */}
                </CardActions>
                <Typography>About Author:</Typography>
                <hr style={{ width: "30%" }} />
                <Typography
                  variant="body2"
                  sx={{ margin: 2, textIndent: "40px" }}
                >
                  {obj.author.about}
                </Typography>
                Followers:
                <Card
                  variant="outlined"
                  sx={{ height: "200px", width: "150px" }}
                >
                  {authorProfileData.followers
                    ? authorProfileData.followers.map((obj) => (
                        <div>
                        {obj.user_from.is_staff?
                          <div
                            style={{ display: "flex", ml: 2 }}
                            className="follower_list"
                            onClick={() => {AuthorProfile(obj.user_from.id)}}
                          >
                            {obj.user_from.image ? (
                              <CardMedia
                                sx={{
                                  width: "25px",
                                  borderRadius: "50%",
                                  ml: 1,
                                }}
                                component="img"
                                height="25"
                                image={BASE_URL + obj.user_from.image}
                                alt="Paella dish"
                              />
                            ) : (
                              <AccountCircleOutlinedIcon sx={{ ml: 1 }} />
                            )}
                            <Typography ml variant="body2">
                              {obj.user_from.first_name +
                                " " +
                                obj.user_from.last_name}
                            </Typography>
                          </div>
                          :
                          <div
                            style={{ display: "flex", ml: 2 }}
                            className="follower_list"
                          >
                            {obj.user_from.image ? (
                              <CardMedia
                                sx={{
                                  width: "25px",
                                  borderRadius: "50%",
                                  ml: 1,
                                }}
                                component="img"
                                height="25"
                                image={BASE_URL + obj.user_from.image}
                                alt="Paella dish"
                              />
                            ) : (
                              <AccountCircleOutlinedIcon sx={{ ml: 1 }} />
                            )}
                            <Typography ml variant="body2">
                              {obj.user_from.first_name +
                                " " +
                                obj.user_from.last_name}
                            </Typography>
                          </div>
                          }

                        </div>
                      ))
                    : null}
                </Card>
              </div>
            </Card>
          ))
        : null}
    </div>
  );
}

export default AuthorProfile;
