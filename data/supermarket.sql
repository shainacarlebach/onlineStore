-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 11, 2019 at 12:05 PM
-- Server version: 10.1.34-MariaDB
-- PHP Version: 5.6.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `supermarket`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `product_id` int(11) NOT NULL,
  `customer_name` varchar(20) NOT NULL,
  `amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`product_id`, `customer_name`, `amount`) VALUES
(5098, 'yossi', 2),
(3987, 'Anthony', 1);

-- --------------------------------------------------------

--
-- Table structure for table `categoriestoproducts`
--

CREATE TABLE `categoriestoproducts` (
  `product` int(11) NOT NULL,
  `category` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categoriestoproducts`
--

INSERT INTO `categoriestoproducts` (`product`, `category`) VALUES
(123, 1),
(2222, 1),
(2345, 1),
(3333, 1),
(7654, 1),
(1234, 2),
(3344, 2),
(3987, 2),
(5432, 2),
(5678, 2),
(4455, 3),
(6543, 3),
(7890, 3),
(8888, 3),
(3456, 4),
(4567, 4),
(5098, 4),
(9999, 4),
(789, 5),
(987, 5),
(1111, 5),
(7700, 5),
(8877, 5);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'Eggs&Dairy'),
(2, 'Fruit&Vegetables'),
(3, 'Meat'),
(4, 'Bread&Bakery'),
(5, 'Beverages');

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `value` int(10) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`value`, `name`) VALUES
(100, 'Ashdod'),
(200, 'Jerusalem'),
(300, 'Tel Aviv'),
(400, 'Haifa'),
(500, 'Hod Hasharon'),
(600, 'Lod'),
(700, 'Rechovot'),
(800, 'Ranaana'),
(900, 'Beit Shemesh'),
(1000, 'Modiin');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id_customer` int(11) NOT NULL,
  `id` varchar(10) NOT NULL,
  `name` varchar(20) NOT NULL,
  `surname` varchar(20) NOT NULL,
  `username` varchar(20) NOT NULL,
  `email` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `streetaddress` varchar(20) NOT NULL,
  `city` int(10) NOT NULL,
  `role` varchar(10) CHARACTER SET utf16 COLLATE utf16_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id_customer`, `id`, `name`, `surname`, `username`, `email`, `password`, `streetaddress`, `city`, `role`) VALUES
(2, '327096145', 'Shaina', 'Schiff', 'Shaina', 'schiffs@aisj.co.il', 'SSss1234', '45 Eliyahu Hakim str', 200, 'manager'),
(15, '324567890', 'anthony', 'short', 'Anthony', 'anthony@gmail.com', 'AAaa1234', '13 Ben Gurion Street', 600, 'customer'),
(32, '321456789', 'efi', 'schiff', 'efi', 'efi@gmail.com', 'EEee1234', '45 eliyahu hakim', 1000, 'customer'),
(33, '025678654', 'yossi', 'schiff', 'yossi', 'yossi@gmail.com', 'YYyy1234', '3 dizengehof street', 300, 'customer'),
(34, '333875103', 'chaya', 'schiff', 'chaya', 'chaya@gmail.com', 'CHch1234', '19 haparchim street', 800, 'customer');

-- --------------------------------------------------------

--
-- Table structure for table `manager`
--

CREATE TABLE `manager` (
  `id_manager` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `surname` varchar(20) NOT NULL,
  `username` varchar(20) NOT NULL,
  `email` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id_order` int(11) NOT NULL,
  `customer_name` varchar(11) NOT NULL,
  `city` varchar(20) NOT NULL,
  `street` varchar(20) NOT NULL,
  `delivery_date` date NOT NULL,
  `order_date` date NOT NULL,
  `creditcard` varchar(20) NOT NULL,
  `cvv` varchar(4) NOT NULL,
  `expirationdate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id_order`, `customer_name`, `city`, `street`, `delivery_date`, `order_date`, `creditcard`, `cvv`, `expirationdate`) VALUES
(1, 'Anthony', 'Lod', '13 Ben Gurion Street', '2019-03-11', '2019-03-10', '379016604772516', '606', '2020-05-03'),
(2, 'Anthony', 'Lod', '13 Ben Gurion Street', '2019-03-26', '2019-03-25', '379016604772516', '606', '2020-05-03'),
(3, 'Anthony', 'Lod', '13 Ben Gurion Street', '2019-05-09', '2019-05-08', '379016604772516', '606', '2020-05-09'),
(4, 'Anthony', 'Lod', '13 Ben Gurion Street', '2019-06-16', '2019-06-14', '379016604772516', '606', '2020-05-01'),
(5, 'chaya', 'Ranaana', '19 haparchim street', '0000-00-00', '2019-08-27', '379016604772516', '098', '2020-07-19'),
(6, 'chaya', 'Ranaana', '19 haparchim street', '2019-09-01', '2019-08-27', '379016604772516', '098', '2020-07-19'),
(7, 'Anthony', 'Lod', '13 Ben Gurion Street', '2019-09-11', '2019-09-10', '379016604772516', '606', '2020-04-01');

-- --------------------------------------------------------

--
-- Table structure for table `orders_products`
--

CREATE TABLE `orders_products` (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `customer_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders_products`
--

INSERT INTO `orders_products` (`order_id`, `product_id`, `amount`, `customer_name`) VALUES
(1, 6543, 1, 'Anthony'),
(1, 1111, 1, 'Anthony'),
(1, 6543, 1, 'Anthony'),
(1, 5098, 2, 'Anthony'),
(2, 6543, 1, 'Anthony'),
(2, 5098, 2, 'Anthony'),
(1, 8877, 1, 'Anthony'),
(2, 8877, 1, 'Anthony'),
(3, 8877, 1, 'Anthony'),
(1, 6543, 1, 'Anthony'),
(2, 6543, 1, 'Anthony'),
(3, 6543, 1, 'Anthony'),
(1, 8877, 1, 'Anthony'),
(2, 8877, 1, 'Anthony'),
(3, 8877, 1, 'Anthony'),
(4, 8877, 1, 'Anthony'),
(1, 1111, 1, 'Anthony'),
(2, 1111, 1, 'Anthony'),
(3, 1111, 1, 'Anthony'),
(4, 1111, 1, 'Anthony'),
(5, 3987, 2, 'chaya'),
(5, 3987, 2, 'chaya'),
(6, 3987, 2, 'chaya'),
(1, 3987, 1, 'Anthony'),
(2, 3987, 1, 'Anthony'),
(3, 3987, 1, 'Anthony'),
(4, 3987, 1, 'Anthony'),
(7, 3987, 1, 'Anthony');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `code` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `category_id` int(11) NOT NULL,
  `price` float NOT NULL,
  `details` varchar(250) NOT NULL,
  `image` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`code`, `name`, `category_id`, `price`, `details`, `image`) VALUES
(123, 'cottage cheese', 1, 5.2, 'tnuva cottage cheese', '1568195898929-cottage.PNG'),
(789, 'nestea', 5, 17.9, 'six pack nestea', '1568194521442-nestea.PNG'),
(987, 'coke', 5, 8.9, '2 litres coke', '1563713455489-coke.jpeg'),
(1111, 'wine', 5, 79.9, 'red wine', '1568195959001-wine.PNG'),
(1234, 'apples', 2, 7.9, 'crunchy delicious red starking apples ', 'apples.PNG'),
(2222, 'yogurt', 1, 3.2, 'white 3% low fat yogurt', '1565558683946-yogurt.jpg'),
(2345, 'milk', 1, 9.9, 'Great Value 2% Reduced Fat milk', '2litresmilk.jpeg'),
(3333, 'yolo', 1, 3.2, 'chocolate yogurt', '1565532366501-yolo.PNG'),
(3344, 'peppers', 2, 8.9, 'red bell peppers priced by kilo', 'peppers.PNG'),
(3456, 'bread', 4, 17.9, 'fresh organic brown sliced bread', 'bread.PNG'),
(3987, 'oranges', 2, 5.9, 'delicious oranges price by kilo', 'oranges.PNG'),
(4455, 'shnitzel', 3, 24.9, 'fresh cut shnitzel indivually packed priced by kilo', 'shnitzel.PNG'),
(4567, 'chocolate cake', 4, 17.9, 'delicious fresh chocolate cake', '1565558837095-chocolatecake.jpg'),
(5098, 'croissants', 4, 39.9, 'freshly baked delicious croissants', 'croissants.PNG'),
(5432, 'cucumbers', 2, 7.9, 'crunchy cucumbers priced by kilo', 'cucumbers.PNG'),
(5678, 'peas', 2, 4.9, 'delicious green peas priced by kilo', 'Peas.png'),
(6543, 'entrecote', 3, 129.9, 'fresh and kashered entrecote steak', 'entrecote.PNG'),
(7654, 'eggs', 1, 17.9, 'Great value jumbo white eggs', 'eggs.PNG'),
(7700, 'sprite', 5, 17.9, 'box of sprite', '1565538990125-sprite.PNG'),
(7890, 'chicken', 3, 24.9, 'fresh and kashered whole chicken priced by kilo', 'chicken.PNG'),
(8877, 'water', 5, 10.55, 'packed mineral water 500ml each', 'water.PNG'),
(8888, 'pargiyot', 3, 39.9, 'fresh young chicken', '1565558778314-pargiyot.PNG'),
(9999, 'rolls', 4, 3.2, 'freshly baked rolls', '1564955907828-rolls.jpg'),
(10000, 'nestea', 5, 20.9, 'six pack nestea', '1568112369047-nestea.PNG');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD KEY `product_id` (`product_id`),
  ADD KEY `cart_ibfk_5` (`customer_name`);

--
-- Indexes for table `categoriestoproducts`
--
ALTER TABLE `categoriestoproducts`
  ADD PRIMARY KEY (`product`),
  ADD KEY `category` (`category`),
  ADD KEY `product` (`product`),
  ADD KEY `product_2` (`product`),
  ADD KEY `product_3` (`product`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD UNIQUE KEY `value_3` (`value`),
  ADD KEY `value` (`value`),
  ADD KEY `value_2` (`value`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id_customer`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `city` (`city`);

--
-- Indexes for table `manager`
--
ALTER TABLE `manager`
  ADD PRIMARY KEY (`id_manager`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id_order`),
  ADD UNIQUE KEY `id_order` (`id_order`),
  ADD KEY `customer_name` (`customer_name`);

--
-- Indexes for table `orders_products`
--
ALTER TABLE `orders_products`
  ADD KEY `product_id` (`product_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `customer_name` (`customer_name`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`code`),
  ADD KEY `products_ibfk_1` (`category_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categoriestoproducts`
--
ALTER TABLE `categoriestoproducts`
  MODIFY `product` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10000;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id_customer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `manager`
--
ALTER TABLE `manager`
  MODIFY `id_manager` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id_order` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `code` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10001;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_5` FOREIGN KEY (`customer_name`) REFERENCES `customer` (`username`),
  ADD CONSTRAINT `cart_ibfk_7` FOREIGN KEY (`product_id`) REFERENCES `products` (`code`);

--
-- Constraints for table `categoriestoproducts`
--
ALTER TABLE `categoriestoproducts`
  ADD CONSTRAINT `categoriestoproducts_ibfk_1` FOREIGN KEY (`category`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `categoriestoproducts_ibfk_2` FOREIGN KEY (`product`) REFERENCES `products` (`code`);

--
-- Constraints for table `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`city`) REFERENCES `cities` (`value`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`customer_name`) REFERENCES `customer` (`username`);

--
-- Constraints for table `orders_products`
--
ALTER TABLE `orders_products`
  ADD CONSTRAINT `orders_products_ibfk_3` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id_order`);
COMMIT;