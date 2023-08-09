const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const expressValidator = require('express-validator');
const crypto = require("crypto");
require('dotenv').config();
// import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const braintreeRoutes = require('./routes/braintree');
const orderRoutes = require('./routes/order');
const utils = require("./utils");
const db = require("./db");

// app
const app = express();

// db connection
const connectDB = async () => {
  try {
    await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }
    );
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    // exit process with failure
    process.exit(1);
  }
};
connectDB();

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// routes middleware
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', braintreeRoutes);
app.use('/api', orderRoutes);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// GET Methods
app.get("/get_user/id/:userID", async (req, res) => {
  utils.print_process(`GET request to get user: ${req.params.userID}`);
  let user = await db.get_user_by_id(req.params.userID);

  if(user == null) {
      utils.print_error(`Could not retrieve user with id: ${req.params.userID}`);
      return res.json({"status": "Could not retrieve user"});
  } else {
      utils.print_success(`Successfully retrieved user details: `);
      console.log(user);
      return res.json(user);
  }
})

app.get("/get_user/email/:userEmail", async (req, res) => {
  utils.print_process(`GET request to get user: ${req.params.userEmail}`);
  let user = await db.get_user_by_email(req.params.userEmail);

  if(user == null) {
      utils.print_error(`Could not retrieve user with email: ${req.params.userEmail}`);
      return res.json({"status": "Could not retrieve user"});
  } else {
      utils.print_success(`Successfully retrieved user details: `);
      console.log(user);
      return res.json(user);
  }
})

// POST Methods
app.post('/add_user', async (req, res) => {
  // let result = await db.get_user_by_email(req.body.email);
  let result = await db.add_user(req.body)

  if(result.email == req.body.email) {
      console.log('[+] Successfully added user');
      res.json({"response": "Successfully added user"});
  } else {
      console.log("[-] Could not add user");
      res.json({"response": "Could not add user"});
  }
})