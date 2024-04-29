

CREATE TABLE admin (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    username VARCHAR(128) NOT NULL UNIQUE,
    email VARCHAR(128) NOT NULL UNIQUE,
    phone VARCHAR(128) NOT NULL,
    password VARCHAR(128) NOT NULL,
    gender VARCHAR(128) NOT NULL,
    dob DATE NOT NULL,
    nid VARCHAR(256) NOT NULL,
    presentaddress VARCHAR(256) NOT NULL,
    parmanentaddress VARCHAR(256) NOT NULL
);


--
-- Dumping data for table `admin`
--

INSERT INTO admin (name, username, email, phone, password, gender, dob, nid, presentaddress, parmanentaddress) 
VALUES ('Samuel E George', 'samuel', 'samuel@gmail.com', '7873928873', 'password123', 'Male', '1990-01-01', '1234567890123', '123 Main St', '456 Elm St');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE product (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    productname VARCHAR(256) NOT NULL,
    price INT NOT NULL,
    quantity INT NOT NULL,
    catagory VARCHAR(64) NOT NULL,
    image1 VARCHAR(256),
    details VARCHAR(8192) NOT NULL
);




INSERT INTO product (productname, price, quantity, catagory, image1, details) 
VALUES ('Sony HD 4K Smart LED TV', 35000, 4, 'Electronics', 'https://www.suryaelectronics.in/CommonImageHandler/ImageHandler.ashx?imagepath=~/img/Product/Main/SONYHomeEntertainmentTelevision157.jpg&width=1080', '');

INSERT INTO product (productname, price, quantity, catagory, image1, details) 
VALUES ('Marie Gold Biscuits', 12, 190, 'Food', 'https://www.bigbasket.com/media/uploads/p/l/264572-2_5-britannia-marie-gold-biscuits.jpg', '');

INSERT INTO product (productname, price, quantity, catagory, image1, details) 
VALUES ('Amazfit Bip Smart Watch', 4800, 5, 'Electronics', 'https://in.amazfit.com/cdn/shop/products/2b88b81321c7510919fdfdbb9c69360e_2048x.jpg?v=1691659249', 'Watch');

INSERT INTO product (productname, price, quantity, catagory, image1, details) 
VALUES ('iPhone 13', 1200, 16, 'Electronics', 'https://media.croma.com/image/upload/v1664009491/Croma%20Assets/Communication/Mobiles/Images/243460_0_n90peu.png', '');

INSERT INTO product (productname, price, quantity, catagory, image1, details) 
VALUES ('iphone 14', 79000, 47, 'Electronics', 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTwHGFf3u2gQQ3qnRoLaEQfAedADIHQfcFvioVHjXhpH4VINK0AFVjtZvEEVbLTdoLG1mo1oD0kFhn3nuwHd01MpbAz4nnUjxs5HrRFyPKstUIBTz4Dtceitj8&usqp=CAE', '256GB');

-- --------------------------------------------------------

--
-- Table structure for table `soldproduct`
--

CREATE TABLE soldproduct (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    productid INT NOT NULL,
    userid INT NOT NULL,
    quantity INT NOT NULL,
    price VARCHAR(128) NOT NULL,
    address VARCHAR(20),
    zipcode VARCHAR(128) NOT NULL,
    Orderdate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (productid) REFERENCES product(id),
    FOREIGN KEY (userid) REFERENCES user(id)
);





-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    username VARCHAR(128) NOT NULL UNIQUE,
    email VARCHAR(128) NOT NULL UNIQUE,
    password VARCHAR(128) NOT NULL,
    phone VARCHAR(16) NOT NULL,
    address VARCHAR(256) NOT NULL,
    wallet_bal INT
);


--
-- Dumping data for table `user`
--

INSERT INTO user (name, username, email, password, phone, address, wallet_bal) 
VALUES ('Samuel E George', 'samuel', 'samuel@gmail.com', 'sha1$6786d27c$1$ab2b210a0871658cba4f618224b1258ef4dcfe7d', '917470120073', 'jhalwa', 15140);

INSERT INTO user (name, username, email, password, phone, address, wallet_bal) 
VALUES ('Shashank Shashidhar', 'sensei', 'shashank@gmail.com', 'sha1$4fc34040$1$3e4c59ed172f1c01268a188d86c71605b2f32b1e', '917975250289', 'jhalwa', 19964);

INSERT INTO user (name, username, email, password, phone, address, wallet_bal) 
VALUES ('saketh', 'saketh', 'saketh@gmail.com', 'sha1$6f4de423$1$e9de4986cce82f82954eb1ceaa18eb324a25e07e', '911234567890', 'jhalwa', NULL);

