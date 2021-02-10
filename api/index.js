const mongoose = require("mongoose");
const createServer = require('./server');

mongoose.connect("mongodb://127.0.0.1:27017/forum_mern_tdd", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
    // from ./server
    const app = createServer();

    app.listen(9000, () => {
        console.log('server started');
    })
})
