const port = 4000 //where we listen
const express = require("express")
const app = express();
const mongoose = require("mongoose") //database
const jwt = require("jsonwebtoken") //authentication
const multer = require("multer") //create image storage system
const path = require("path") 
const cors = require("cors")

app.use(express.json()) //our response will be json
app.use(cors()); //get access to frontend to connect backend


///DATABASE
mongoose
    .connect("mongodb+srv://curbeamonae:mongodb033198@cluster0.04qbogb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log('connected to database')
    })
    .catch((err) => {
        console.log(err)
    });



    //API creation

app.get("/", (req, res)=>{
    res.send("express app is running")
})

//Image Storage Engine 
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
      console.log(file);
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({storage: storage})
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:4000/images/${req.file.filename}`
    })
})
app.use('/images', express.static('upload/images'));

//middleware

const fetchuser = async (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
      res.status(401).send({ errors: "Please authenticate using a valid token" });
    }
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({ errors: "Please authenticate using a valid token" });
    }
  };

//schema for creating products

const Product = mongoose.model("Product", {
    id:{
        type: Number,
        required:true,

    },
    name:{
        type: String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    availible:{
        type:Boolean,
        default:true
    },

})


//schema user model

const Users = mongoose.model("Users",{
    name:{
        type:String,

    },
    email:{
        type:String,
        unnique:true,

    },
    password:{
        type:String,

    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default: Date.now()

    }
})

//Create an endpoint at ip/login for login the user and giving auth token
app.post('/login', async (req, res) => {
    console.log("Login");
      let success = false;
      let user = await Users.findOne({ email: req.body.email });
      if (user) {
          const passCompare = req.body.password === user.password;
          if (passCompare) {
              const data = {
                  user: {
                      id: user.id
                  }
              }
              success = true;
        console.log(user.id);
              const token = jwt.sign(data, 'secret_ecom');
              res.json({ success, token });
          }
          else {
              return res.status(400).json({success: success, errors: "please try with correct email/password"})
          }
      }
      else {
          return res.status(400).json({success: success, errors: "please try with correct email/password"})
      }
  })
  
  //Create an endpoint at ip/auth for registering the user in data base & sending token
  app.post('/signup', async (req, res) => {
    console.log("Sign Up");
          let success = false;
          let check = await Users.findOne({ email: req.body.email });
          if (check) {
              return res.status(400).json({ success: success, errors: "existing user found with this email" });
          }
          let cart = {};
            for (let i = 0; i < 300; i++) {
            cart[i] = 0;
          }
          const user = new Users({
              name: req.body.username,
              email: req.body.email,
              password: req.body.password,
              cartData: cart,
          });
          await user.save();
          const data = {
              user: {
                  id: user.id
              }
          }
          
          const token = jwt.sign(data, 'secret_ecom');
          success = true; 
          res.json({ success, token })
      })




 //Create an endpoint adding the product in cart
app.post('/addtocart', fetchuser, async (req, res) => {
	console.log("Add Cart");
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
    res.send("Added")
  })

  //Create an endpoint for removing the product in cart
app.post('/removefromcart', fetchuser, async (req, res) => {
	console.log("Remove Cart");
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]!=0)
    {
      userData.cartData[req.body.itemId] -= 1;
    }
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
    res.send("Removed");
  })

  //Create an endpoint for getting the products in cart
app.post('/getcart', fetchuser, async (req, res) => {
  console.log("Get Cart");
  let userData = await Users.findOne({_id:req.user.id});
  res.json(userData.cartData);

  })

  
  //creating api for adding products
app.post('/addproduct', async(req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length > 0){
        let last_product_arry = products.slice(-1);
        let last_product = last_product_arry[0];
        id = last_product.id+1
    }else{
        id=1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        price:req.body.price

    });
    console.log(product)
    await product.save();
    console.log("saved");
    res.json({
        success:true,
        name:req.body.name,
    })

})

//creating api for deleting products

app.post('/removeproduct',async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log('removed')
    res.json({
        success:true,
        name:req.body.name
    })

})
//NEW PRODUCTS
//creating api for getting all products
app.get('/allproducts', async(req,res)=>{
    let products = await Product.find({})
    console.log("All Products fetched")
    res.send(products);
})



app.listen(port, (error) =>{
    if(!error){
        console.log("server is running")
    }
})