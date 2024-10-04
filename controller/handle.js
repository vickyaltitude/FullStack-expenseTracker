const ds = require('../model/data');
const path = require('path')

exports.homePage = (req,res)=>{

    ds.execute('SELECT * FROM `node-complete`.`expense-tracker`;').then(resp =>{

        res.sendFile(path.join(__dirname,'../view','exptrack.html'))
      
    }).catch(err => console.log(err))
    
};

exports.expDetails = (req,res)=>{

    ds.execute('SELECT * FROM `node-complete`.`expense-tracker`;').then(resp =>{


        res.json(resp[0]);
      
    }).catch(err => console.log(err))
    
};

exports.adsUser = (req,res)=>{
    const dataa = req.body
    ds.execute('INSERT INTO `node-complete`.`expense-tracker` (amount,description,category) VALUES(?,?,?);',[dataa.amount,dataa.description,dataa.category]).then(resp =>{
       res.redirect('/')
     
   }).catch(err => console.log(err))
}

exports.editExp = (req,res,next)=>{
  
    const id = req.params.id;
    ds.execute('SELECT * FROM `node-complete`.`expense-tracker` WHERE id = ?',[id]).then(dat =>{
            let receivedUser = dat[0]
            if(receivedUser){
                res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Expense Tracker</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="p-5">
    <div class="container">
        <h2 class="mb-4">Expense Tracker</h2>
        <form id="expenseForm" action="/edit-user/${id}" method="post">
            <div class="mb-3">
                <label for="amount" class="form-label">Choose Expense Amount</label>
                <input type="number" class="form-control" id="amount" value=${receivedUser[0].amount} name="amount" placeholder="Enter amount" required>
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Enter description</label>
                <input type="text" class="form-control" id="description" value=${receivedUser[0].description} name='description' placeholder="Enter description" required>
            </div>
            <div class="mb-3">
                <label for="selectType" class="form-label">Choose a category</label>
                <select id="selectType" class="form-select" name = 'category' required>
                    <option ${receivedUser[0].category == "Movies" ? 'selected' : ''}>Movies</option>
                    <option ${receivedUser[0].category == "Vacation" ? 'selected' : ''}>Vacation</option>
                    <option ${receivedUser[0].category == "Hotel" ? 'selected' : ''}>Hotel</option>
                    <option ${receivedUser[0].category == "Purchasing" ? 'selected' : ''}>Purchasing</option>
                    <option ${receivedUser[0].category == "Others" ? 'selected' : ''}>Others</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Edit Expense</button>
        </form>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    <script src="/exptrack.js"></script>
</body>
</html>
`)
            }
    }).catch(err => {
        console.log(err)
    })
     
};

exports.editUser = (req,res,next)=>{

    const id = req.params.id;
    const editedData = req.body;
    ds.execute('UPDATE `node-complete`.`expense-tracker` SET amount = ?, description = ?,category = ? where id = ?',[editedData.amount,editedData.description,editedData.category,id]).then(resp => {
      res.redirect('/')
  
    }).catch(err => console.log(err))
  
  };

  exports.deleteExp = (req,res,next)=>{
    
    const delId = req.params.id;
    ds.execute('DELETE FROM `node-complete`.`expense-tracker` WHERE id = ?',[delId])
    res.redirect('/')
   
};

