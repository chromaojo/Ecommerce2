const express = require('express');
const route = express.Router();
const mail = require('../config/mail');
const path = require("path");
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const { UserLoggin, AvoidIndex, AdminRoleBased } = require('../auth/auth');
const { allProd, oneProd, createProd, allSaleProd, allRentProd, allLeaseProd, allShortProd, allComProd, allResProd } = require('../module/product');
const { allMyComplain, allComplain, createComplain } = require('../module/complaint');
const { allMyRept, allRept, oneRept, deleteRept } = require('../module/report');
const { allSaved, oneSaved, createSaved, deleteSaved } = require('../module/saved');
const { allInvest, oneInvest, createInvest } = require('../module/investment');
const random = Math.floor(Math.random() * 99999);
const rando = Math.floor(Math.random() * 99999);
const rand = rando + "REA" + random;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { features } = require('process');





route.use(
    session({
        secret: `Hidden_Key`,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    })
);
route.use(express.json())



// To get all the users for the admin
route.get('/users', UserLoggin, (req, res) => {
    const userCookie = req.cookies.user ? JSON.parse(req.cookies.user) : null;

    const userData = userCookie
    const userId = req.params.userId;
    

    const sql = `
      SELECT * FROM realEstate.re_users;
    `;

    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.log('Error retrieving shipments:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.clearCookie('userAll');
        req.app.set('userAll', results)
        // res.json(results);
        const userAll = req.app.get('userAll');
        console.log("All Admin user detail is", userAll)
        res.render('user', { userData, userAll })
    });
});



// To get each user detail 
route.get('/users/:user_id', UserLoggin, (req, res) => {
    const userData = req.cookies.user ? JSON.parse(req.cookies.user) : null;
    const user_id = req.params.user_id;

    // Retrieve user data from the database based on userId
    const sql = `
      SELECT * FROM realEstate.re_users WHERE user_id = ?;
    `;

    db.query(sql, [user_id], (err, results) => {
        if (err) {
            console.log('Error retrieving user data:', err);
            return res.status(500).send('Internal Server Error');
        }
        // Check if user exists
        if (results.length === 0) {
            return res.status(404).send('User not found');
        }
        res.clearCookie('userOne');
        
        res.cookie('userOne', JSON.stringify({ ...results }));
        // res.json(results);
        
        const userO = req.cookies.userOne ? JSON.parse(req.cookies.userOne) : null;
        const userOne = userO
        console.log(' UserOne details is', userOne)
        res.render('user-edit', { userData, userOne })
    });
});

// To edit each users role for the admin
route.post('/users/:userId/edit', UserLoggin, (req, res) => {
    const userId = req.params.userId;
    const newRole = req.body.role; // Assuming the role is sent in the request body

    // Update user role in the database
    const sql = `
      UPDATE realEstate.re_users
      SET role = ?
      WHERE user_id = ?;
    `;

    db.query(sql, [newRole, userId], (err, results) => {
        if (err) {
            console.log('Error updating user role:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.clearCookie('userOne');
        res.redirect('/admin/users'); // Redirect to the list of users or any appropriate route
    });
});


// Added features 
// Dashboard route
// See All Products 

route.get('/dashboard', allProd, (req, res) => {

});

// To get shortlet product 
route.get('/dashbord/shortlet', allShortProd, (req, res) => {


});

// To get residential product detail 
route.get('/dashbord/res', allResProd, (req, res) => {


});
// To get commercial product detail 
route.get('/dashbord/comm', allComProd, (req, res) => {


});

// To Read For sale product detail 
route.get('/dashbord/sale', allSaleProd, (req, res) => {

});

// To Read For lease product detail 
route.get('/dashbord/lease', allLeaseProd, (req, res) => {

});

// To Read For rent product detail 
route.get('/dashbord/rent', allRentProd, (req, res) => {

});

// To Read One product detail 
route.get('/product-zZkKqQP/:id', oneProd, (req, res) => {


});


// To gat Create product
route.get('/create/Prod', (req, res) => {

    const userCookie = req.cookies.user ? JSON.parse(req.cookies.user) : null;

    const userData = userCookie
    res.render('Prod-create', { userData })
});

// To gat Create product
route.post('/create/pXrRoPp', createProd, (req, res) => {
    
   
});




// To Read All Investments 
route.get('/investments', allInvest, (req, res) => {

});

// To Read One Investment detail 
route.get('/invest/:id', oneInvest, (req, res) => {

    res.send('Route is okay')
});

// To To Get CReate Investment page
route.get('/investe', UserLoggin, (req, res) => {
    const userData  = req.cookies.user ? JSON.parse(req.cookies.user) : null;
 
    
    res.render('invest-create', { userData })
});

// To Post Investment 
route.post('/xXpPLliLZz', createInvest, (req, res) => {
    
   
});


// User profile section
route.get('/profile', UserLoggin, (req, res) => {
    const userData = req.app.get('userData');
    const userCookie = userData
    console.log('Here is my Dashboard Data', userCookie);
    if (!userCookie) {
        res.redirect('/login');
    } else {
        const user = db.query('SELECT * FROM realEstate.re_users WHERE email = ?', [userData.email], async (error, result) => {

            // console.log('This is the dashboard Details : ', userData);
            if (error) {
                console.log(" Login Error :", error);
                return res.redirect('/user/logout');
            }
            if (result) {
                res.render('profile', { userData, });
            }

        })
    }
});


// To Get all the saved product details
route.get('/save/:id', createSaved, (req, res) => {

    res.redirect('/user/saved')
});


// To Get all the saved product details
route.get('/delet/:id', deleteSaved, (req, res) => {

    res.redirect('/user/saved')
});

// To Get all my Report details
route.get('/my-report', allMyRept, (req, res) => {

});

// To Get all my Report details
route.get('/reeport/:report_id', oneRept, (req, res) => {

});

// To Get all my Report details
route.get('/delRep/:report_id', deleteRept, (req, res) => {
res.redirect('/user/my-report')
});


// To Get all my Report details
route.get('/all-report', allRept, (req, res) => {

});

// To Get all my saved product details
route.get('/saved', allSaved, (req, res) => {


});

// To get the editing Page  
route.use('/edit', require('../routes/edit'));


// To Get all my saved product details
route.get('/complaints', allMyComplain, (req, res) => {
});

// To Get all my saved product details
route.post('/complaints/xXPpRyds', createComplain, (req, res) => {
    

});




// Logout route
route.get('/logout', (req, res) => {

    req.session.destroy((err) => {
        delete userData
        res.clearCookie('user');
        if (err) {
            console.error(err);
            res.status(500).send('Error logging out');
        } else {
            res.redirect('/login');
        }
    });
});



module.exports = route;



