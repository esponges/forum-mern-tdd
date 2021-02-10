import React, { useEffect, useState } from "react";
import { Switch, Route, HashRouter } from 'react-router-dom';
import MainNav from "./MainNav";
import Body from "./Body";
import axios from "axios";
import SinglePost from "./SinglePost";

const Index = (props) => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    axios
      .get("/api/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  

  return (
    <HashRouter>
      <Switch>
        <MainNav />
        <Route path="/">
          <Body posts={posts} fetchPosts={fetchPosts} />
        </Route>
        <Route path="/posts/:id">
            <SinglePost />
        </Route>
      </Switch>
    </HashRouter>
  );
};

export default Index;
