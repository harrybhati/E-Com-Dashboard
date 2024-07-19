const express=require('express');
const app= express();
const Core=require('cors');
require('./db/Confi');
const User=require('./db/SingUp');
const Product=require('./db/Product');
app.use(express.json());
app.use(Core());


// registration Api 
app.post('/register', async (req,resp)=>{
    let db= new  User(req.body);
    let result=await db.save();
    console.log(result);
    resp.send(result);
    
})


// Login Api
app.post('/login',  async (req,resp)=>{
    
// it is used for if we have these two paras than it will go forward other nothing 
     if (req.body.password && req.body.Email){
        let user= await User.findOne(req.body).select('-password');// . select is used to remove the password portion from the rsponce 
    // here if user exist then it will send the responce and if not it will send that user is not found
    if (user){
        resp.send(user);
    }else{
        resp.send("No User Found")
    }

     }else{
        resp.send("No User Found")
     }
    })


// product Api 

app.post('/add-product', async (req,resp)=>{
    let product =new Product(req.body);
    let result= await product.save();
    resp.send(result);
    console.log(result);
})

// product get Api

app.get('/product-get', async (req,resp)=>{
    let product= await Product.find();
    if(product.length>0){
        resp.send(product)
    }else{
        resp.send("No Result Found")
    }
})



// Product Delete Api
app.delete('/product-del/:id', async (req, resp) => {
    try {
        // Use await to ensure the deletion completes before sending the response
        let product = await Product.deleteOne({ _id: req.params.id });
        
        // Check if product deletion was successful
        if (product.deletedCount === 1) {
            resp.status(200).send({ message: 'Product deleted successfully' });
        } else {
            resp.status(404).send({ error: 'Product not found' });
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        resp.status(500).send({ error: 'Server error' });
    }
});    


 

// Update Api

app.put("/product-update/:id", async (req,resp)=>{
    let Upd=  await Product.updateOne({_id:req.params.id},{$set:req.body})
  if(Upd){
    resp.send(Upd)
  }else{
    resp.send("No Result Found")
  }
       console.log(Upd);
})

// update the data using the seperate api 

app.get("/product/:id", async (req,resp)=>{
    let Fir= await Product.findOne({_id:req.params.id});
    if(Fir){
        resp.send(Fir);
    }else{
        resp.send("No data Found")
    }
    

    
  })
 
app.get("/product-search/:key",async (req,resp)=>{
    const result=await Product.find({
        "$or":[
            {
                name:{$regex:req.params.key}
            }, {
                company:{$regex:req.params.key}
            }
        ]
    })
    resp.send(result);
})


app.listen(5000);