import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Body = (props) => {
  const posts = props.posts;

  const handleClick = () => {
      console.log('handling click')
  }
  

  return (
    <div className="container">
      I'm the body
      {posts &&
        posts.map((post, i) => {
          return (
            <div key={i}>
              <h1>{post.title}</h1>
              <p>{post.body}</p>
            </div>
          );
        })}
      <Button id="getPostsBtn" onClick={handleClick}>Get the posts</Button>
    </div>
  );
};

export default Body;
