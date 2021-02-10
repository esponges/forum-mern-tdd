const createServer = require("./server");
const mongoose = require("mongoose");
const supertest = require("supertest");

const Post = require("./models/Post");
const User = require("./models/User");

const app = createServer();

//setup server
beforeEach((done) => {
  mongoose.connect(
    "mongodb://localhost:27017/forum_mern_tdd",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
    () => done
  );
  done();
});

//clear (rollback) server

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

const mockDB = async () => {
  const createUsers = await User.create([
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
  ]);
  const users = await User.find();
  const posts = await Post.create([
    {
      title: "lorem 1",
      body:
        "Reprehenderit eiusmod ut non officia reprehenderit do. Cillum pariatur voluptate adipisicing cillum culpa id exercitation occaecat quis. Laborum sunt dolore culpa Lorem amet eiusmod consequat non pariatur qui cillum.",
      excerpt: "Est sit est aliqua adipisicing laboris.",
      user: users[0]._id,
    },
    {
      title: "lorem 2",
      body:
        "Incididunt nostrud aliqua minim quis. Cillum quis excepteur magna culpa reprehenderit elit proident non. Commodo tempor laborum nulla proident aute cillum commodo aliquip reprehenderit ut sunt aliqua. Eiusmod ipsum reprehenderit nisi minim ullamco laborum fugiat ipsum. Mollit mollit reprehenderit mollit proident qui eiusmod ex sint esse quis cillum laboris.",
      excerpt:
        "Dolore nulla proident proident minim amet culpa officia dolore irure ea ea sint nisi.",
      user: users[0]._id,
    },
    {
      title: "lorem 3",
      body:
        "Commodo sit do deserunt laborum dolore. Esse pariatur ea enim laborum proident consequat minim labore ex magna cupidatat laboris aliquip. Cillum non consequat nostrud incididunt occaecat cillum cillum aliqua et. Sunt nulla Lorem in commodo cupidatat reprehenderit. Cupidatat laborum commodo ea deserunt enim occaecat.",
      excerpt: "Laborum nisi sunt culpa sunt occaecat elit dolore.",
      user: users[1]._id,
    },
  ]);
  return [posts, users];
};

describe("test all the crud routes", () => {
  it("GET /api/posts get all posts", async () => {
    await mockDB();
    await supertest(app)
      .get("/api/posts")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.length).toBe(3);
      });
  });

  it("GET /api/post/:id single post", async () => {
    const db = await mockDB();

    await supertest(app)
    .get(`/api/posts/${db[0][0]._id}`) // [0][0] first post
    .expect(200)
    .then(async res => {
      expect(await (await Post.findById({ _id: res.body._id }))._id).toEqual(db[0][0]._id); // compare param id vs retrieved id
    });
  });

  it("POST /api/", async () => {
    const db = await mockDB();

    await supertest(app)
      .delete(`/api/posts/${db[0][0]._id}`) // [0][0] = first post
      .expect(204)
      .then(async () => {
        expect(await Post.findById(db[0][0]._id)).toBeFalsy();
      });
  });

  it("GET posts by user id /api/posts/user/:id", async () => {
    const db = await mockDB();

    await supertest(app)
      .get(`/api/posts/user/${db[1][0]._id}`) // [1][0] = first user
      .expect(200)
      .then(res => {
        expect(res.body.length).toBe(2); // first user has two posts from mock db
      })
  });
});
