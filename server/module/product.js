const express = require('express');
const route = express.Router();
const info = require('../config/info')
const path = require("path");
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const { UserLoggin, AvoidIndex, AdminRoleBased } = require('../auth/auth');
const random = Math.floor(Math.random() * 999999);
const rando = Math.floor(Math.random() * 99999);
const rand = rando + "FTL" + random;
const cookieParser = require('cookie-parser');
const session = require('express-session');

 
// MiDDLE WARES 
// Configure multer for file storage in 'Prod' directory
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/products/');
        // cb(null, path.join(__dirname, 'Produts'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        files: 4 // Limiting the number of files to 4
    }
}).array('pixz', 4);






// To View All Produts
const allProd = (req, res)=>{
    
    const userCookie = req.cookies.user ? JSON.parse(req.cookies.user) : null;
    req.app.set('userData', userCookie);
    
    if (userCookie){
        const sql = `
      SELECT * FROM ecommerce.ec_products ORDER BY id DESC;
    `;

        db.query(sql,  (err, results) => {
            if (err) {
                console.log('Login Issues :', err);
                return res.status(500).send('Internal Server Error');
            }
          
            
            if (results) {
                const userProd = results
                const userData = userCookie
                return res.render('index', { userData, userProd, info });
            }

        })
        
        
    } else{
        return res.status(401).redirect('/user/logout');
    }
};

// To View All Commercial Produts
const allComProd = (req, res)=>{
    
    const category = 'commercial'
    const messages = ''
    const userCookie = req.cookies.user ? JSON.parse(req.cookies.user) : null;
    req.app.set('userData', userCookie);
    
    if (userCookie){
        const sql = `
      SELECT * FROM ecommerce.ec_products WHERE category = ? ORDER BY id DESC;
    `;

        db.query(sql, [category], (err, results) => {
            if (err) {
                console.log('Login Issues :', err);
                return res.status(500).send('Internal Server Error');
            }
          
            
            if (results) {
                const userProd = results
                const userData = userCookie
                return res.render('index', { userData, userProd, info, messages });
            }

        })
        
        
    } else{
        return res.status(401).redirect('/user/logout');
    }
};

// To View All Residentioal Produts
const allResProd = (req, res)=>{
    
    const category = 'residential'
    const userCookie = req.cookies.user ? JSON.parse(req.cookies.user) : null;
    req.app.set('userData', userCookie);
    
    if (userCookie){
        const sql = `
      SELECT * FROM ecommerce.ec_products ORDER BY id DESC;
    `;

        db.query(sql, [category] ,(err, results) => {
            if (err) {
                console.log('Login Issues :', err);
                return res.status(500).send('Internal Server Error');
            }
          
            
            if (results) {
                const userProd = results
                const userData = userCookie
                return res.render('index', { userData, userProd, info });
            }

        })
        
        
    } else{
        return res.status(401).redirect('/user/logout');
    }
};

// To View All shortlet Produts
const allShortProd = (req, res)=>{
    const Prod_type = 'shortlet'
    const userCookie = req.cookies.user ? JSON.parse(req.cookies.user) : null;
    req.app.set('userData', userCookie);
    
    if (userCookie){
        const sql = `
      SELECT * FROM ecommerce.ec_products WHERE Prod_type = ? ORDER BY id DESC;
    `;

        db.query(sql, [Prod_type], (err, results) => {
            if (err) {
                console.log('Login Issues :', err);
                return res.status(500).send('Internal Server Error');
            }
          
            
            if (results) {
                const userProd = results
                const userData = userCookie
                return res.render('index', { userData, userProd, info });
            }

        })
        
        
    } else{
        return res.status(401).redirect('/user/logout');
    }
};

// To View All Rented Produts
const allRentProd = (req, res)=>{
    const action = 'rent'
    const userCookie = req.cookies.user ? JSON.parse(req.cookies.user) : null;
    req.app.set('userData', userCookie);
    
    if (userCookie){
        const sql = `
      SELECT * FROM ecommerce.ec_products WHERE action = ? ORDER BY id DESC;
    `;

        db.query(sql, [action], (err, results) => {
            if (err) {
                console.log('Login Issues :', err);
                return res.status(500).send('Internal Server Error');
            }
          
            
            if (results) {
                const userProd = results
                const userData = userCookie
                return res.render('index', { userData, userProd, info });
            }

        })
        
        
    } else{
        return res.status(401).redirect('/user/logout');
    }
};

// To View All Lease Produts
const allLeaseProd = (req, res)=>{
    const action = 'lease'
    const userCookie = req.cookies.user ? JSON.parse(req.cookies.user) : null;
    req.app.set('userData', userCookie);
    
    if (userCookie){
        const sql = `
      SELECT * FROM ecommerce.ec_products WHERE action = ? ORDER BY id DESC;
    `;

        db.query(sql, [action], (err, results) => {
            if (err) {
                console.log('Login Issues :', err);
                return res.status(500).send('Internal Server Error');
            }
          
            
            if (results) {
                const userProd = results
                const userData = userCookie
                return res.render('index', { userData, userProd, info });
            }

        })
        
        
    } else{
        return res.status(401).redirect('/user/logout');
    }
};

// To View All sSale Produts
const allSaleProd = (req, res)=>{
    const action = 'sale'
    const userCookie = req.cookies.user ? JSON.parse(req.cookies.user) : null;
    req.app.set('userData', userCookie);
    
    if (userCookie){
        const sql = `
      SELECT * FROM ecommerce.ec_products WHERE action = ? ORDER BY id DESC;
    `;

        db.query(sql, [action], (err, results) => {
            if (err) {
                console.log('Login Issues :', err);
                return res.status(500).send('Internal Server Error');
            }
          
            
            if (results) {
                const userProd = results
                const userData = userCookie
                return res.render('index', { userData, userProd, info });
            }

        })
        
        
    } else{
        return res.status(401).redirect('/user/logout');
    }
};




// To view only one Product 

const oneProd = (req, res)=>{
    
    const id = req.params.id;
    const userCookie = req.cookies.user ? JSON.parse(req.cookies.user) : null;

    const userData = userCookie
    if (!userCookie) {
        res.redirect('/logout');
    } else {
        const sql = `
      SELECT * FROM ecommerce.ec_products WHERE id =?;
    `;

        db.query(sql, [id], (err, results) => {
            if (err) {
                console.log('Login Issues :', err);
                return res.status(500).send('Internal Server Error');
            }
            console.log('This is the dashboard Details : ', userData);
            
            if (results) {
                const userProd = results[0]
                console.log('Produts are ',userProd)
                res.render('Prod-one', { userData, userProd, info });
            }

        })
    }
};

// To gat Create Product
const getCreate = (req, res) => {

    const userCookie = req.cookies.user ? JSON.parse(req.cookies.user) : null;

    const userData = userCookie
    res.render('prod-create', { userData })
};




// To Post Product form from the frontend 
const createProd = (req, res) => {
    const userCookie = req.cookies.user ? JSON.parse(req.cookies.user) : null;

    const userData = userCookie

    try {
        upload(req, res, function (err) {
            if (err) {
                return res.send('Error uploading files.');
            }
    
 
            const { title , price , description, category ,quantity } = req.body;
           
            let prod_id = rando || random
            const pixz = req.files.map(file => file.filename);
            const status ='active'
            const picture = pixz;

            // Now you can handle the name, age, address, and pictures array
            // For example, save them to a database, send to another API, etc.

            db.query('INSERT INTO ecommerce.ec_products SET ?', { title , price , description, category, quantity, prod_id, picture, status  });
           res.redirect('/user/dashboard')
        });
       
    } catch (error) {
        console.log('Product Form Error :', error)
    }
   
}

 


// To delete a Product content


const deleteProd = (req, res, next) => {

    const userCookie = req.cookies.user ? JSON.parse(req.cookies.user) : null;
    req.app.set('userData', userCookie);

    if (userCookie) {

        try {
            const id = req.params.id;
            // Perform the deletion
            const sql = `DELETE FROM jvmc.re_Product WHERE id = ?;`;
            db.query(sql, [id], (err, result) => {
                if (err) {
                    console.error('Error deleting Product:', err);
                    return res.status(500).send('Internal Server Error');
                }
                // Check if any rows were affected
                if (result.affectedRows === 0) {
                    return res.status(404).send('Product content not found');
                }

            });

            return next();
        } catch (err) {
            console.error('Error handling /delete-task-content/:id route:', err);
            res.status(500).send('Internal Server Error');
        }


    } else {
        res.send('Cannot Delete This Product')
    }
};



module.exports = {oneProd, allProd, deleteProd, createProd, allLeaseProd, allSaleProd, allRentProd, allShortProd, allResProd, allComProd}
