var db=require('./db');
var passwordHash=require('password-hash');

module.exports={
	productInsert: function(data, callback) {
		var sql = "INSERT INTO product (productname, price, quantity, catagory, image1,details) VALUES (?, ?, ?, ?, ?,?)";
		var param = [data.productname, parseInt(data.price), parseInt(data.quantity), data.catagory, data.image1,data.details];
	
		db.insertData(sql, param, function(error, result) {
			if (error) {
				console.error("Error inserting product:", error);
				callback(false); // Indicate failure to the caller
			} else {
				if (result && result.affectedRows > 0) {
					callback(true); // Indicate success to the caller
				} else {
					console.error("Product insertion failed. No rows affected.");
					callback(false); // Indicate failure to the caller
				}
			}
		});
	},
	productdelete: function(data,callback){
		var sql="DELETE FROM `product` WHERE id = ?";
		var param=[data.id];

		db.deleteData(sql,param,function(result){
			if(result==null || result.length==0)
			{
				callback(false);
			}
			else
			{
				callback(true);
			}
		});
	},
	adminInsert: function(data,callback)
	{
		var sql="INSERT INTO `admin`(`name`, `username`, `email`, `password`, `gender`, `dob`, `nid`, `presentaddress`, `parmanentaddress`) VALUES (?,?,?,?,?,?,?,?,?)";
		var param=[data.name,data.username,data.email,passwordHash.generate(data.password),data.gender,data.dob,data.nid,data.presentaddress,data.parmanentaddress];

		db.insertData(sql,param,function(result){
			if(result==null || result.length==0)
			{
				callback(false);
			}
			else
			{
				callback(true);
			}
		});
	},
	productlist: function(callback)
	{
		var sql='SELECT * FROM product';

		db.getAllData(sql,function(result){
			if(result.length==0 || result==null)
			{
				callback(false);
			}
			else
			{
				callback(result);
			}
		});
	},
	productupdate: function(data,callback){
		var sql="UPDATE `product` SET `productname`=?,`price`=?,`quantity`=?,`catagory`=?,`image1`=?,`image2`=?,`image3`=?,`details`=? WHERE `id`=?";
		var param=[data.productname,data.price,data.quantity,data.catagory,data.image1,data.image2,data.image3,data.details,data.id];

		db.updateData(sql,param,function(result){
			if(result==null || result.length==0)
			{
				callback(false);
			}
			else
			{
				callback(true);
			}
		});
	},
	deliveryproduct: function(data,callback){
		var sql="UPDATE soldproduct SET delivery='yes' WHERE id=?";
		var param=[data.id];

		db.updateData(sql,param,function(result){
			if(result==null || result.length==0)
			{
				callback(false);
			}
			else
			{
				callback(true);
			}
		});
	},
	productedit: function(data,callback)
	{
		var sql='SELECT * FROM product WHERE id=?';
		var param = [data.id];

		db.getData(sql,param,function(result){
			if(result.length==0 || result==null)
			{
				callback(false);
			}
			else
			{
				callback(result);	
			}
		});
	},
	
	userlist: function(callback)
	{
		var sql='SELECT id,name,email FROM user';

		db.getAllData(sql,function(result){
			if(result.length==0 || result==null)
			{
				callback(false);
			}
			else
			{
				callback(result);
			}
		});
	},
	soldpendings: function(callback) {
		var sql = 'SELECT sp.*, u.username, p.productname ' +
				  'FROM soldproduct sp ' +
				  'JOIN user u ON sp.userid = u.id ' +
				  'JOIN product p ON sp.productid = p.id ' +
				  'ORDER BY sp.Orderdate DESC';
	
		db.getAllData(sql, function(result) {
			if (result.length == 0 || result == null) {
				callback(false);
			} else {
				callback(result);
			}
		});
	},
	mostSoldProducts: function(callback) {
		var sql = 'SELECT sp.productid, p.productname, SUM(sp.quantity) AS total_sold ' +
				  'FROM soldproduct sp ' +
				  'JOIN product p ON sp.productid = p.id ' +
				  'GROUP BY sp.productid, p.productname ' +
				  'ORDER BY total_sold DESC';
	
		db.getAllData(sql, function(result) {
			if (result.length === 0 || result === null) {
				callback(false);
			} else {
				callback(result);
			}
		});
	},	
	searchuser: function(data,callback) {
		var sql='SELECT * FROM user WHERE name LIKE "'+data.username+'%"';

			db.getAllData(sql,function(result){
			if(result.length==0 || result==null)
			{
				callback(false);
			}
			else
			{
				callback(result);	
			}
		});
	}
};