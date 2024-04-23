var db=require('./db');

module.exports={
	placeorder: function(data, callback) {
		// Calculate the total price of the order
	
		// Query to check the wallet balance
		var walletCheckQuery = 'SELECT wallet_bal FROM user WHERE id = ?';
		
		db.getData(walletCheckQuery, [data.userid], function(walletResult) {
			if (walletResult && walletResult.length > 0) {
				var walletBal = parseFloat(walletResult[0].wallet_bal);
	
				// Check if the wallet balance is sufficient
				if (walletBal >= data.price) {
					// Calculate the new wallet balance after deduction
					var newWalletBal = walletBal - data.price;
	
					// Proceed with updating the wallet balance and placing the order
					var updateWalletQuery = 'UPDATE user SET wallet_bal = ? WHERE id = ?';
					var updateParam = [newWalletBal, data.userid];
					
					db.updateData(updateWalletQuery, updateParam, function(updateResult) {
						if (updateResult) {
							// Proceed with the order placement
							var sql = 'INSERT INTO soldproduct(productid, userid, quantity, price, address, zipcode, Orderdate) VALUES (?,?,?,?,?,?,?)';
							var currentDate = new Date().toISOString().slice(0, 19).replace('T', ' '); // Get current date in YYYY-MM-DD HH:MM:SS format
							var param = [parseInt(data.productid), data.userid, parseInt(data.quantity), data.price, data.address, data.zipcode, currentDate];
							
							db.insertData(sql, param, function(result) {
								if (result === 0 || result === null) {
									callback(false);
								} else {
									callback(true);
								}
							});
						} else {
							// Error occurred while updating wallet balance
							callback({ error: 'Error updating wallet balance' });
						}
					});
				} else {
					// Wallet balance is insufficient, send a message
					callback({ error: 'Insufficient wallet balance' });
				}
			} else {
				// User not found or error occurred while fetching wallet balance
				callback({ error: 'Error fetching wallet balance' });
			}
		});
	},	
	updatequantity:  function(data,callback) {
		var sql='UPDATE product SET quantity = (quantity - ?) WHERE id=?';
		var param=[data.quantityorder,data.productid];
		console.log(data.quantityorder);
			db.updateData(sql,param,function(result){
			if(result==0 || result==null)
			{
				callback(false);
			}
			else
			{
				callback(true);	
			}
		});
	}
};