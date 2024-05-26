const express = require('express');
const router = express.Router();
const post = require('../models/post');

/**
 * GET /
 * HOME
*/
router.get('' , async (req, res) =>{
try{
    const locals = {
        title : "nodejs blog",
        description: "simple blog created using Nodejs, Express and Mongodb."
     }
    
     let perPage = 5;
     let page = req.query.page || 1;

     const data = await post.aggregate([{ $sort: { createdAt :-1}}])
     .skip(perPage * page - perPage)
     .limit(perPage)
     .exec();

     const count = await post.countDocuments({});
     const nextPage = parseInt(page) + 1;
     const hasNextPage = nextPage <= Math.ceil(count / perPage);

        
    res.render('index', {
        locals ,
        data,
        current: page,
        nextPage: hasNextPage ? nextPage:null,
        currentroute: '/'});

}catch(error){
    console.log(error)
}
   
});

/**
 * GET /
 * Post :id
*/
 router.get("/post/:id" , async (req, res) =>{
     
    try{
        let slug = req.params.id;

        const data = await  post.findById({ _id: slug});
        const locals = {
            title: data.title,
            description: "simple blog created using Nodejs, Express and Mongodb.",
         }
        res.render('post', {
            locals ,
            data,
            currentRoute: `/post/${slug}`
        });
    }
    
    catch(error){  
              console.log(error)
        }
          
   });

   /**
 * POST /
 * Post - searchTerm
*/

router.post("/search" , async (req, res) => {
     try{
        const locals = {
            title : "Search",
            description: "simple blog created using Nodejs, Express and Mongodb."
         }

         let searchTerm = req.body.searchTerm;
         const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g , "")
        const data = await post.find({
            $or: [
                { title : {$regex : new RegExp(searchNoSpecialChar, 'i')}},
                { body: { $regex : new RegExp(searchNoSpecialChar , 'i')}}
            ]
        });
        res.render("search",{
            data,
            locals,
            currentRoute : '/'
        });
    }
    catch(error){
      console.log(error)
    
    }});

/**
 * GET /
 * About
*/
router.get('/about', (req, res) => {
    res.render('about', {
      currentRoute: '/about'
    });
  });
/**
 * GET /
 *contact
*/  
    

  router.get('/contact', (req, res) => {
    res.render('contact', {
      currentRoute: '/contact'
    });
  });
  



module.exports = router


// function insertPostData() {
    //     post.insertMany([
    //     {
    //         title: "Building a Blog",
    //         body: "this is the body text"
    //     },
    
    //     {
    //         title: "Building a Blog",
    //         body: "this is the body text"
    //     },
    
    //     {
    //         title: "Building a Blog",
    //         body: "this is the body text"
    //     },
    
    //     {
    //         title: "Building a Blog",
    //         body: "this is the body text"
    //     },
    
    //     {
    //         title: "Building a Blog",
    //         body: "this is the body text"
    //     },
    // ])
    // }
    // insertPostData();

    // router.get("" , async (req, res) =>{
    //     const locals = {
    //        title : "nodejs blog",
    //        description: "simple blog created using Nodejs, Express and Mongodb."
    //     }
       
    //    try{
    //        const data = await  post.find();
    //        res.render('index', {locals ,data});
    //    }catch(error){
    //        console.log(error)
    //    }
          
    //    });
       