var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    host: 'localhost',
    user: 'kiran',
    password: 'kiran',
    database: 'Vortex',
    port: '5432'
};
var pool = new Pool(config);

var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));


var forms = {
    'Add_Item': {
    content: ` 
        <form id="productForm" action="/insert-db-item" method="post">
            <div>
            <label for="Purchase From">Purchase From:</label>
            <input type="text" name="purchase_from" />
            </div>

            <div>
            <label for="Product Name">Product Name:</label>
            <input type="text" name="product_name" />
            </div>
            
            <div>
            <label for="Product Serial No">Product Serial No:</label>
            <input type="text" name="product_serial_no" />
            </div>
            
            <div>
            <label for="Rate">Rate:</label>
            <input type="text" name="rate" />
            </div>
            
            <div>
            <label for="Description">Description:</label>
            <textarea rows="3" cols="50" name="description">
            Enter description here...
            </textarea>
            </div>

            <div id="theSubmit">
                <input type="submit" value="Submit" onclick="getFormData()">
            </div> 

        </form>`
},
    'Add_Employee': {
        content: `       
        <form id="employeeForm" action="/insert-db-employee" method="post">
            <div>
            <label for="Employee Name">Employee Name:</label>
            <input type="text" name="employee_name" />
            </div>

            <div>
            <label for="Address">Address:</label>
            <input type="text" name="address" />
            </div>
            
            <div>
            <label for="PIN">PIN:</label>
            <input type="text" name="pin" />
            </div>
            
            <div>
            <label for="Email">Email Id:</label>
            <input type="text" name="email_id" />
            </div>
            
            <div>
            <label for="Contact Number">Contact Number:</label>
            <input type="text" name="contact_number" />
            </div>

            <div>
            <label for="Account Number">Account Number:</label>
            <input type="text" name="account_number" />
            </div>

            <div>
            <label for="Branch Name">Branch Name:</label>
            <input type="text" name="branch_name" />
            </div>

            <div>
            <label for="IFSC No">IFSC No:</label>
            <input type="text" name="ifsc_no" />
            </div>

            <div>
            <label for="Description">Description:</label>
            <textarea rows="3" cols="50" name="description">
            Enter description here...
            </textarea>
            </div>

            <div id="theSubmit">
                <input type="submit" value="Submit">
            </div>
        </form>`
    },
    'Add_Dealer': {
        content: `       
        <form id="dealerForm" action="/insert-db-dealer" method="post">
            <div>
            <label for="Dealer Name">Dealer Name:</label>
            <input type="text" name="dealer_name" />
            </div>

            <div>
            <label for="Address">Address:</label>
            <input type="text" name="address" />
            </div>
            
            <div>
            <label for="PIN">PIN:</label>
            <input type="text" name="pin" />
            </div>
            
            <div>
            <label for="Email">Email Id:</label>
            <input type="text" name="email_id" />
            </div>
            
            <div>
            <label for="Contact Number">Contact Number:</label>
            <input type="text" name="contact_number" />
            </div>

            <div>
            <label for="Description">Description:</label>
            <textarea rows="3" cols="50" name="description">
            Enter description here...
            </textarea>
            </div>

            <div id="theSubmit">
                <input type="submit" value="Submit">
            </div>
        </form>`
    },
    'Search_bar':{
        content: `<form id="search-form_3">
                    <input type="text" class="search_3"/>
                    <input type="submit" class="submit_3" value="Search" />
                  </form>`
    }
};

function createTemplate(data)
{
    var content = data.content;
    
    var htmlTemplate = `<html lang="en">
    <head>
        <meta charset="UTF-8">
    <link href="/ui/style.css" type="text/css" rel="stylesheet" />
    </head>
    <body>
          <div id="nav">
            <div id="nav_wrapper">
                <ul>
                    <li><a href="#">Home</a></li><li>
                    <a href="#">Master</a>
                        <ul class="sub1">
                            <li><a href="#">Item</a>
                                 <ul class="sub2">
                                    <li><a href="/Search_bar">Search Item</a></li>
                                    <li><a href="/Add_Item">Add Item</a></li>
                                 </ul>
                            </li>
                            <li><a href="/Employee">Employee</a>
                                <ul class="sub3">
                                    <li><a href="/Search_bar">Search</a></li>
                                    <li><a href="/Add_Employee">Add New</a></li>
                                 </ul>
                            </li>
                            <li><a href="/Dealer">Dealer</a>
                                <ul class="sub4">
                                    <li><a href="/Search_bar">Search</a></li>
                                    <li><a href="/Add_Dealer">Add New</a></li>
                                 </ul>
                            </li>
                        </ul>
                    </li><li>
                    <a href="#">Billing</a>
                        <ul class="sub1">
                            <li><a href="#">Customer Bill</a></li>
                            <li><a href="#">Dealer Bill</a></li>
                            <li><a href="#">Misc Bill</a></li>
                            <li><a href="#">Replacement</a></li>
                            <li><a href="#">Salary</a></li>
                        </ul>
                    </li><li>
                    <a href="#">Report</a>
                        <ul class="sub1">
                            <li><a href="#">Purchase</a></li>
                            <li><a href="#">Sales</a></li>
                            <li><a href="#">Stock</a></li>
                            <li><a href="#">Credit Balance</a></li>
                            <li><a href="#">Debit Balance</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
            
        </div>

        <div class="center">
                    <img id="madi" src="/ui/Olbilling.jpg" class="img-medium"/>
        </div>

        <script type="text/javascript" src="/ui/main.js"></script>

        <div>
            ${content}
        </div>
        
    </body>
</html>`;
    return htmlTemplate;
}




app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

process.on('unhandledRejection', function(e) {
  console.log(e.message, e.stack);
})



app.post('/insert-db-item',function(req,res){
    pool.query('INSERT into items (date, item_name, item_serial_no, purchase_from, narration, rate) VALUES ($1, $2, $3, $4, $5, $6)',[new Date(),req.body.product_name,req.body.product_serial_no,req.body.purchase_from,req.body.description,req.body.rate], function(err, result){
        if (err) {
            res.status(500).send(err.toString());
        }else{
            //res.send(JSON.stringify(result.rows));
            res.send(createTemplate(forms['Add_Item']));
        }
    });
});

app.post('/insert-db-employee',function(req,res){
    pool.query('INSERT into employees (emp_name, address, pin_code, email_id, contact_no, account_no, branch_name, ifsc_no, narration) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',[req.body.employee_name,req.body.address,req.body.pin,req.body.email_id,req.body.contact_number,req.body.account_number,req.body.branch_name,req.body.ifsc_no,req.body.description], function(err, result){
        if (err) {
            res.status(500).send(err.toString());
        }else{
            //res.send(JSON.stringify(result.rows));
            res.send(createTemplate(forms['Add_Employee']));
        }
    });
});

app.post('/insert-db-dealer',function(req,res){
    pool.query('INSERT into dealers (name, address, pin_code, email_id, contact_no, narration) VALUES ($1, $2, $3, $4, $5, $6)',[req.body.dealer_name,req.body.address,req.body.pin,req.body.email_id,req.body.contact_number,req.body.description], function(err, result){
        if (err) {
            res.status(500).send(err.toString());
        }else{
            //res.send(JSON.stringify(result.rows));
            res.send(createTemplate(forms['Add_Dealer']));
        }
    });
});

app.get('/:formName', function(req,res){
     var formName = req.params.formName; 
     console.log(formName);
     res.send(createTemplate(forms[formName]));
 });


app.get('/article-two', function(req,res){
    res.send("Artcile two is requested and will be servered.");
});

app.get('/article-Three', function(req,res){
    res.send("Artcile Three is requested and will be servered.");
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/Olbilling.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Olbilling.jpg'));
});

var counter = 0;
app.get('/counter',function(req,res){
    counter = counter + 1;
    res.send(counter.toString());
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`Vortex billing sytem listing to port ${port}!`);
});
