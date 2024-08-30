const express = require('express');
const route = express.Router();
const path = require("path");
const db = require('../config/db');



// To create Table for user and Account 
route.get('/createUser', (req, res) => {


    const sqlUsers = `
        CREATE TABLE IF NOT EXISTS ecommerce.ec_users(
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id VARCHAR(255) UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin',  'client') DEFAULT 'client'
        );
        `;

    const sqlAccounts = `
        CREATE TABLE IF NOT EXISTS ecommerce.ec_accounts (
        account_id VARCHAR(255) UNIQUE PRIMARY KEY,
        account_balance INT DEFAULT 0,
        total_spent INT DEFAULT 0,
        phone_number VARCHAR(255),
        whatsapp VARCHAR(255),
        instagram VARCHAR(255),
        facebook VARCHAR(255),
        linkedin VARCHAR(255),
        about TEXT,
        role ENUM('admin', 'client') DEFAULT 'client',
        profilePix VARCHAR(255),
        surname VARCHAR(255),
        othername VARCHAR(255),
        interest TEXT,
        username VARCHAR(255) UNIQUE,
        address VARCHAR(255),
        email VARCHAR(255) NOT NULL UNIQUE,
        user_id VARCHAR(255) UNIQUE,
        FOREIGN KEY (user_id) REFERENCES ec_users(user_id)
        );
        `;
    db.query(sqlUsers, (errRoles) => {
        if (errRoles) {
            console.log('Error creating roles table:', errRoles);
            return res.status(500).send('Internal Server Error');
        }
        console.log('Users Created Successfully');

        db.query(sqlAccounts, (errAccounts) => {
            if (errAccounts) {
                console.log('Error creating accounts table:', errAccounts);
                return res.status(500).send('Internal Server Error');
            }
            console.log('Accounts Created Successfully');


        });
       
    });
});

route.get('/createProd', (req, res) => {


    const sqlProd = `
        CREATE TABLE IF NOT EXISTS ecommerce.ec_products (
        id INT PRIMARY KEY AUTO_INCREMENT,
        prod_id INT UNIQUE,
        title VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        quantity DECIMAL(10, 2) NOT NULL,
        sold DECIMAL(10, 2) DEFAULT 0,
        picture VARCHAR(155),
        description TEXT,
        category_id TEXT,
        status ENUM('active', 'inactive') DEFAULT 'active',
        category TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
        `;

    const sqlCart = `
        CREATE TABLE IF NOT EXISTS ecommerce.ec_cart (
        id INT UNIQUE PRIMARY KEY AUTO_INCREMENT,
        prod_id INT UNIQUE,
        title VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2),
        quantity DECIMAL(10, 2),
        my_quantity DECIMAL(10, 2),
        pro_link VARCHAR(65) NOT NULL,
        date VARCHAR(65),
        user_id VARCHAR(255) NOT NULL, 
        picture VARCHAR(255),
        FOREIGN KEY (prod_id) REFERENCES ec_products(prod_id)
        );
        `;



    db.query(sqlProd, (errRoles) => {
        if (errRoles) {
            console.log('Error creating roles table:', errRoles);
            return res.status(500).send('Internal Server Error');
        }
        console.log('products Created Successfully');

    });
    db.query(sqlCart, (errAccounts) => {
        if (errAccounts) {
            console.log('Error creating accounts table:', errAccounts);
            return res.status(500).send('Internal Server Error');
        }
        console.log('cart Table Created Successfully');

    });
    res.send('cart & products Table Created Successfully');
});

route.get('/createReport', (req, res) => {


    const sqlReport = `
    CREATE TABLE IF NOT EXISTS ecommerce.ec_report (
      id INT AUTO_INCREMENT PRIMARY KEY,
      report_id VARCHAR(255) UNIQUE,
      title VARCHAR(255) NOT NULL,
      details TEXT,
      name VARCHAR(255) NOT NULL,
      progress ENUM('pending', 'finished') DEFAULT 'pending',
      user_id VARCHAR(255),
      date VARCHAR(255)
    );
  `;



    db.query(sqlReport, (errRoles) => {
        if (errRoles) {
            console.log('Error creating roles table:', errRoles);
            return res.status(500).send('Internal Server Error');
        }
        console.log('Report Created Successfully');

    });
  
    res.send('Report Table Created Successfully');
});

route.get('/createComplain', (req, res) => {


    const sqlComplaint = `
    CREATE TABLE IF NOT EXISTS ecommerce.ec_complaint (
      id INT AUTO_INCREMENT PRIMARY KEY,
      report_id VARCHAR(255) UNIQUE,
      name VARCHAR(255) NOT NULL,
      aacount_id VARCHAR(255) NOT NULL,
      number VARCHAR(255),
      title VARCHAR(255),
      complain TEXT,
      status ENUM('pending', 'solve') DEFAULT 'pending',
      user_id VARCHAR(255) NOT NULL,
      date VARCHAR(255),
      time VARCHAR(255)
    );
  `;

    db.query(sqlComplaint, (errRoles) => {
        if (errRoles) {
            console.log('Error creating roles table:', errRoles);
            return res.status(500).send('Internal Server Error');
        }
        console.log('Users Created Successfully');

    });

    res.send('Complaint Table Created Successfully');
});

route.get('/createTrans', (req, res) => {

    const sqlTransaction = `
    CREATE TABLE IF NOT EXISTS ecommerce.ec_transaction (
        transaction_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id VARCHAR(255),
        payment_method VARCHAR(255),
        transaction_date DATETIME,
        amount DECIMAL(12, 2),
        currency VARCHAR(10),
        transaction_type ENUM('debit', 'credit'),
        status ENUM('pending', 'completed', 'failed'),
        description VARCHAR(255),
        reference_number VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES ec_users(user_id)
    );
  `;
  
  const sqlDelivery = `
  CREATE TABLE IF NOT EXISTS ecommerce.ec_investment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    delivery_id VARCHAR(255) UNIQUE,
    title VARCHAR(255) NOT NULL,
    details TEXT,
    amount DECIMAL(10, 2) NOT NULL,
    phone_num VARCHAR(255) NOT NULL,
    status ENUM('ongoing', 'delivered') DEFAULT 'ongoing',
    date VARCHAR(255),
    name VARCHAR(255)
  );
`;

   
    db.query(sqlTransaction, (errRoles) => {
        if (errRoles) {
            console.log('Error creating roles table:', errRoles);
            return res.status(500).send('Internal Server Error');
        }
        console.log(' Transaction Created Successfully');

    });
    db.query(sqlDelivery, (errRoles) => {
        if (errRoles) {
            console.log('Error creating roles table:', errRoles);
            return res.status(500).send('Internal Server Error');
        }
        console.log('Investment Created Successfully');

    });

    res.send('Investment Transaction Table Created Successfully');
});




module.exports = route;