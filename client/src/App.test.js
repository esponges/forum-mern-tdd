import React from "react";
import App from "./App";
import MainNav from "./components/MainNav";
import Body from "./components/Body";
import Index from "./components/Index";
import SinglePost from "./components/SinglePost";

import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import toJson from "enzyme-to-json";
import { shallow, mount, configure } from "enzyme";
Enzyme.configure({ adapter: new Adapter() });

import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import { create, update } from 'react-test-renderer';

const posts = [
  {
    title: "lorem 1",
    body:
      "Reprehenderit eiusmod ut non officia reprehenderit do. Cillum pariatur voluptate adipisicing cillum culpa id exercitation occaecat quis. Laborum sunt dolore culpa Lorem amet eiusmod consequat non pariatur qui cillum.",
    excerpt: "Est sit est aliqua adipisicing laboris.",
    user: 1231314546764,
  },
  {
    title: "lorem 2",
    body:
      "Incididunt nostrud aliqua minim quis. Cillum quis excepteur magna culpa reprehenderit elit proident non. Commodo tempor laborum nulla proident aute cillum commodo aliquip reprehenderit ut sunt aliqua. Eiusmod ipsum reprehenderit nisi minim ullamco laborum fugiat ipsum. Mollit mollit reprehenderit mollit proident qui eiusmod ex sint esse quis cillum laboris.",
    excerpt:
      "Dolore nulla proident proident minim amet culpa officia dolore irure ea ea sint nisi.",
    user: 1231314546764,
  },
  {
    title: "lorem 3",
    body:
      "Commodo sit do deserunt laborum dolore. Esse pariatur ea enim laborum proident consequat minim labore ex magna cupidatat laboris aliquip. Cillum non consequat nostrud incididunt occaecat cillum cillum aliqua et. Sunt nulla Lorem in commodo cupidatat reprehenderit. Cupidatat laborum commodo ea deserunt enim occaecat.",
    excerpt: "Laborum nisi sunt culpa sunt occaecat elit dolore.",
    user: 1231234554632,
  },
];

const response = {
  data: [
    {
      title: "lorem 1",
      body:
        "Reprehenderit eiusmod ut non officia reprehenderit do. Cillum pariatur voluptate adipisicing cillum culpa id exercitation occaecat quis. Laborum sunt dolore culpa Lorem amet eiusmod consequat non pariatur qui cillum.",
      excerpt: "Est sit est aliqua adipisicing laboris.",
      user: 1231314546764,
    },
    {
      title: "lorem 2",
      body:
        "Incididunt nostrud aliqua minim quis. Cillum quis excepteur magna culpa reprehenderit elit proident non. Commodo tempor laborum nulla proident aute cillum commodo aliquip reprehenderit ut sunt aliqua. Eiusmod ipsum reprehenderit nisi minim ullamco laborum fugiat ipsum. Mollit mollit reprehenderit mollit proident qui eiusmod ex sint esse quis cillum laboris.",
      excerpt:
        "Dolore nulla proident proident minim amet culpa officia dolore irure ea ea sint nisi.",
      user: 1231314546764,
    },
    {
      title: "lorem 3",
      body:
        "Commodo sit do deserunt laborum dolore. Esse pariatur ea enim laborum proident consequat minim labore ex magna cupidatat laboris aliquip. Cillum non consequat nostrud incididunt occaecat cillum cillum aliqua et. Sunt nulla Lorem in commodo cupidatat reprehenderit. Cupidatat laborum commodo ea deserunt enim occaecat.",
      excerpt: "Laborum nisi sunt culpa sunt occaecat elit dolore.",
      user: 1231234554632,
    },
  ]
}

const users = [
  {
    name: "Paco",
    email: "paco@gmail.com",
    password: "123456",
  },
  {
    name: "Jose",
    email: "Jose@gmail.com",
    password: "223456",
  },
];

const wrapper = shallow(<Index />);

describe("App renders without crashing", () => {
  it("renders", () => {
    expect(wrapper).toBeTruthy();
  });

  it("contains a navbar", () => {
    // console.log(wrapper.debug(), "debug snapshot");
    expect(wrapper.find(<MainNav />)).toBeTruthy();
  });

  it("contains a single post", () => {
    // console.log(wrapper.debug(), "debug snapshot");
    expect(wrapper.find(<SinglePost />)).toBeTruthy();
  });

  it("contains a body", () => {
    expect(wrapper.find(<Body />)).toBeTruthy();
  });

  it("body accepts props", () => {
    const bodyWrapper = mount(<Body posts={posts}/>);
    // console.log(bodyWrapper.debug());
    expect(bodyWrapper.props().posts.length).toBe(3);
  });

  it('fetchs the posts from api', (done) => {
    const mock = new MockAdapter(axios);
    mock.onGet('/api/posts').reply(200, response.data);
    setImmediate(() => {
      wrapper.update();
      // console.log(wrapper.debug());
      done ();
    });
  });

  it('button triggers prop fn', () => {
    const fn = jest.fn();
    let tree = create(<Body onClick={fn} />);
    // console.log(tree.debug());
    // simulate btn click
    const button = tree.root.findByType('button');
    button.props.onClick();
    // verify callback
    console.log(fn.mock);
    expect(fn.mock.calls.length).toBe(1);
  });
});
