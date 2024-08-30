const express = require('express');
const path = require('path');
const app = express();
const port = 9088;
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const { UserLoggin, CustomerRole, AdminRoleBased } = require('./server/auth/auth');




app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
app.use(cookieParser());


app.use('/db', require('./server/config/table'));

app.use('', require('./server/routes/pages'));

if (CustomerRole) {
    app.use('/user', require('./server/routes/customer'));
} else if (AdminRoleBased) {
    
    app.use('/admin', require('./server/routes/admin'));

} else {

}






app.listen(port, () => {
    console.log(`App Running on ${port}`);
})