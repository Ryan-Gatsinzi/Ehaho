-- Database: `ehaho`

-- Table structure for table `system_users for keeping credentials of users`
CREATE TABLE `users` (
  `id` bigint(50) NOT NULL, -- Primary Key for table
  `phone` varchar(12) NOT NULL, -- Unique phone number for username. It should be recorded
  `email` varchar(50) DEFAULT NULL, -- Unique Email as username. It can be null
  `password` varchar(50) NOT NULL, -- Password for user
  `active` enum('Yes','No') NOT NULL, -- If user can access acount or not depending on many various reasons
  `approved` enum('No','Yes') NOT NULL, -- If account of user is approved for some accounts that wait for admin's approval
  `created_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who recorded record. NULL when it's user itself
  `updated_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who updated record. NULL when it's not yet updated
  `deleted_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who deleted record. NULL when it's not deleted
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(), -- Timestamp of record creation. Never Null
  `updated_at` timestamp DEFAULT NULL, -- Timestamp record updated. Null if not yet updated
  `deleted_at` timestamp DEFAULT NULL, -- Timestamp record deleted. Null if not yet deleted
);

-- Table structure for table `users_profile for keeping other information of system users`
CREATE TABLE `users_profile` (
  `id` bigint(50) NOT NULL, -- Primary Key for profiles
  `user_id` bigint(50) NOT NULL, -- Foreign Key for user from users table
  `first_name` varchar(50) NOT NULL, -- First name of user
  `last_name` varchar(50) NOT NULL, -- Last name of user
  `gender` varchar(50) NOT NULL, -- Gender of user
  `user_picture` varchar(50) NOT NULL, -- image profile of user
  `national_id` varchar(50) DEFAULT NULL, -- Unique National Identification of user ??????????
  `country` varchar(20) NOT NULL, -- User country of user
  `province` int(11) DEFAULT NULL, -- Foreign Key for user province resident if country is Rwanda
  `district` int(11) DEFAULT NULL, -- Foreign Key for user district resident if country is Rwanda
  `sector` int(11) DEFAULT NULL, -- Foreign Key for user sector resident if country is Rwanda
  `cell` int(11) DEFAULT NULL, -- Foreign Key for user cell resident if country is Rwanda
  `village` int(11) DEFAULT NULL, -- Foreign Key for user village resident if country is Rwanda
  `street_number` varchar(20) DEFAULT NULL, -- Street number of user residential if country is Rwanda
  `common_place` varchar(50) DEFAULT NULL, -- common known place neibourhood like Near Stadium Amahoro
  `address_1` varchar(255) DEFAULT NULL,  -- Street Address, PO BOX, etc if is foreign countries. 
  `address_2` varchar(255) DEFAULT NULL,  -- Appartment number, Suit number etc if is foreign countries.
  `state` varchar(255) DEFAULT NULL,  -- State name if is foreign countries.
  `city` varchar(255) DEFAULT NULL,  -- city name if is foreign countries.
  `zip_code` varchar(255) DEFAULT NULL, -- Zip code if is foreign countries.
  `register_platform` enum('Web','USSD','Android','iOS') NOT NULL, -- Platfoarm user used to register account
  `created_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who recorded record. NULL when it's user itself
  `updated_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who updated record. NULL when it's not yet updated
  `deleted_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who deleted record. NULL when it's not deleted
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(), -- Timestamp of record creation. Never Null
  `updated_at` timestamp DEFAULT NULL, -- Timestamp record updated. Null if not yet updated
  `deleted_at` timestamp DEFAULT NULL, -- Timestamp record deleted. Null if not yet deleted
);

-- Table structure for table `business_sectors for keeping main business sectors on ehaho. (Agrodealing, Processing, Farming, Delivering, ...)`
CREATE TABLE `business_sectors` (
  `id` int(11) NOT NULL, -- Primary Key of business sectors
  `sector_name` varchar(50) NOT NULL, -- sector name
  `active` enum('Yes','No') NOT NULL,
  `created_by` bigint(50) NOT NULL, -- Foreign Key from users/profiles for The one who recorded record.
  `updated_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who updated record. NULL when it's not yet updated
  `deleted_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who deleted record. NULL when it's not deleted
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(), -- Timestamp of record creation. Never Null
  `updated_at` timestamp DEFAULT NULL, -- Timestamp record updated. Null if not yet updated
  `deleted_at` timestamp DEFAULT NULL, -- Timestamp record deleted. Null if not yet deleted
);

-- Table structure for table `user_sectors for keeping user with all business sectors assigned to him/her`
CREATE TABLE `user_sectors` (
  `id` bigint(50) NOT NULL, -- Primary Key primary key of user and sector association
  `user_id` bigint(50) NOT NULL, -- Foreign Key for user in association
  `sector_id` int(11) NOT NULL, -- Foreign Key for sector from business sectors
  `active` enum('Yes','No') NOT NULL, -- if user is active in this sector on inactivated by admin or himself / herself
  `created_by` bigint(50) NOT NULL, -- Foreign Key from users/profiles for The one who recorded record.
  `updated_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who updated record. NULL when it's not yet updated
  `deleted_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who deleted record. NULL when it's not deleted
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(), -- Timestamp of record creation. Never Null
  `updated_at` timestamp DEFAULT NULL, -- Timestamp record updated. Null if not yet updated
  `deleted_at` timestamp DEFAULT NULL, -- Timestamp record deleted. Null if not yet deleted
);

-- Table structure for table `user_businesses` fior keeping businesses assigned to user
CREATE TABLE `user_businesses` (
  `id` bigint(50) NOT NULL, -- Primary Key for business
  `user_sector_id` int(11) NOT NULL, -- Foreign Key from user_sectors to get user and sector
  `business_name` varchar(50) NOT NULL, -- Name of business that appears on market place
  `business_phone` varchar(12) NOT NULL, -- Primary phone of business that appears on market place 
  `business_email` varchar(50) DEFAULT NULL, -- Primary email of business that appears on market place 
  `business_logo` varchar(50) DEFAULT NULL, -- logo of business that appears on market place 
  `banner_image` varchar(50) DEFAULT NULL, -- banner image of business that appears on market place 
  `country` varchar(20) NOT NULL, -- country business based in
  `province` int(11) DEFAULT NULL, -- Foreign Key for business province based in if country is Rwanda
  `district` int(11) DEFAULT NULL, -- Foreign Key for business district based in if country is Rwanda
  `sector` int(11) DEFAULT NULL, -- Foreign Key for business sector based in if country is Rwanda
  `cell` int(11) DEFAULT NULL, -- Foreign Key for business cell based in if country is Rwanda
  `village` int(11) DEFAULT NULL, -- Foreign Key for business village based in if country is Rwanda
  `street_number` varchar(20) DEFAULT NULL, -- Street number of business if country is Rwanda
  `common_place` varchar(50) DEFAULT NULL, -- common known place neibourhood like Near Stadium Amahoro
  `address_1` varchar(255) DEFAULT NULL,  -- Street Address PO BOX, etc if is foreign countries. 
  `address_2` varchar(255) DEFAULT NULL,  -- Appartment number, Suit number etc if is foreign countries.
  `state` varchar(255) DEFAULT NULL,  -- State name if is foreign countries.
  `city` varchar(255) DEFAULT NULL,  -- city name if is foreign countries.
  `zip_code` varchar(255) DEFAULT NULL, -- Zip code if is foreign countries.
  `page_published` enum('Yes','No') NOT NULL, -- Market place businness page publishment
  `active` enum('Yes','No') NOT NULL, -- Active or inactive of business
  `created_by` bigint(50) NOT NULL, -- Foreign Key from users/profiles for The one who recorded record.
  `updated_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who updated record. NULL when it's not yet updated
  `deleted_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who deleted record. NULL when it's not deleted
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(), -- Timestamp of record creation. Never Null
  `updated_at` timestamp DEFAULT NULL, -- Timestamp record updated. Null if not yet updated
  `deleted_at` timestamp DEFAULT NULL, -- Timestamp record deleted. Null if not yet deleted
);

-- Table structure for table `products_categories` for categories of products (Farm Inputs, Processed Products, Fresh Produce)
CREATE TABLE `products_categories` (
  `id` int(11) NOT NULL, -- Primary Key for products_main_categories
  `category_name` varchar(50) NOT NULL, -- products main category name
  `created_by` bigint(50) NOT NULL, -- Foreign Key from users/profiles for The one who recorded record.
  `updated_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who updated record. NULL when it's not yet updated
  `deleted_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who deleted record. NULL when it's not deleted
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(), -- Timestamp of record creation. Never Null
  `updated_at` timestamp DEFAULT NULL, -- Timestamp record updated. Null if not yet updated
  `deleted_at` timestamp DEFAULT NULL, -- Timestamp record deleted. Null if not yet deleted
);

-- Table structure for table `products_sub_categories` for subcategories of products (Vegetable, Cereals,Fruits, Fertilizer, Pesticides, Seeds, Poultry Farming,Cattle keeping, Piggery, Bee Keeping, Fishery...)
CREATE TABLE `products_sub_categories` (
  `id` int(11) NOT NULL, -- Primary Key for sub category
  `category_id` int(11) NOT NULL, -- Foreign Key from products_categories to know which main category belongs in
  `sub_category_name` varchar(50) NOT NULL, -- sub category name
  `created_by` bigint(50) NOT NULL, -- Foreign Key from users/profiles for The one who recorded record.
  `updated_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who updated record. NULL when it's not yet updated
  `deleted_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who deleted record. NULL when it's not deleted
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(), -- Timestamp of record creation. Never Null
  `updated_at` timestamp DEFAULT NULL, -- Timestamp record updated. Null if not yet updated
  `deleted_at` timestamp DEFAULT NULL, -- Timestamp record deleted. Null if not yet deleted
);

-- Table structure for table `products_groups` for groups of fresh produce products groups (Rice, Beans, Potatoes, ...)
CREATE TABLE `products_groups` (
  `id` int(11) NOT NULL, -- Primary Key for groups
  `group_name` varchar(50) NOT NULL, -- sub category name
  `created_by` bigint(50) NOT NULL, -- Foreign Key from users for The one who recorded record.
  `updated_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who updated record. NULL when it's not yet updated
  `deleted_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who deleted record. NULL when it's not deleted
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(), -- Timestamp of record creation. Never Null
  `updated_at` timestamp DEFAULT NULL, -- Timestamp record updated. Null if not yet updated
  `deleted_at` timestamp DEFAULT NULL, -- Timestamp record deleted. Null if not yet deleted
);

-- Table structure for table `uom` for keeping Unit of Measurement (Mass [Weight], Liquid [Capacity], Times...)
CREATE TABLE `uom` (
  `id` int(11) NOT NULL, -- Primary Key of Unit of Measurement
  `unit_name` varchar(50) NOT NULL, -- Name of UOM
  `created_by` bigint(50) NOT NULL, -- Foreign Key from users/profiles for The one who recorded record.
  `updated_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who updated record. NULL when it's not yet updated
  `deleted_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who deleted record. NULL when it's not deleted
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(), -- Timestamp of record creation. Never Null
  `updated_at` timestamp DEFAULT NULL, -- Timestamp record updated. Null if not yet updated
  `deleted_at` timestamp DEFAULT NULL, -- Timestamp record deleted. Null if not yet deleted
);

-- Table structure for table `units_packages` for keeping packages in unit of measure (Mass [Kgs, Pack, Sack, Toni,..], Liquid [Litter,Jellycan,Tank,...])
CREATE TABLE `units_packages` (
  `id` int(11) NOT NULL, -- Primary Key for packages of unit
  `unit_id` int(11) NOT NULL, -- Foreign Key from uom to know which unit package belongs to
  `package_name` varchar(50) NOT NULL, -- Name of package
  `smallest_unit_conversion` int(11) NOT NULL, -- How many smallest unit times packages has. If it's 1 means is the smallest unit
  `created_by` bigint(50) NOT NULL, -- Foreign Key from users/profiles for The one who recorded record.
  `updated_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who updated record. NULL when it's not yet updated
  `deleted_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who deleted record. NULL when it's not deleted
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(), -- Timestamp of record creation. Never Null
  `updated_at` timestamp DEFAULT NULL, -- Timestamp record updated. Null if not yet updated
  `deleted_at` timestamp DEFAULT NULL, -- Timestamp record deleted. Null if not yet deleted
);

-- Table structure for table `products` for keeping defaults products on ehaho (Ibirayi bya Kinigi , NPK 370, Inyange Juice...)
CREATE TABLE `products` (
  `id` bigint(50) NOT NULL, -- Primary Key for products
  `sub_category_id` int(11) NOT NULL, -- Foreign Key from subcategories products belongs in.
  `group_id` bigint(11) DEFAULT NULL, -- Foreign Key from products group table
  `product_name` varchar(50) NOT NULL, -- Name of product that appear on market place
  `default_description` varchar(255) NOT NULL, -- Default descriptions of product for guiding vendor
  `unit_id` int(11) NOT NULL, -- Foreign Key from uom for describing which Unit of measure of this product
  `published` enum('Yes','No') NOT NULL, -- if product is published or not depends on admin of ehaho
  `created_by` bigint(50) NOT NULL, -- Foreign Key from users/profiles for The one who recorded record.
  `updated_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who updated record. NULL when it's not yet updated
  `deleted_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who deleted record. NULL when it's not deleted
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(), -- Timestamp of record creation. Never Null
  `updated_at` timestamp DEFAULT NULL, -- Timestamp record updated. Null if not yet updated
  `deleted_at` timestamp DEFAULT NULL, -- Timestamp record deleted. Null if not yet deleted
);

-- Table structure for table `products_images` for defaults images of products of ehaho
CREATE TABLE `products_gallery` (
  `id` bigint(50) NOT NULL, -- Primary Key for images
  `product_id` bigint(50) NOT NULL, -- Foreign Key from products to know image of which default product
  `image_name` varchar(50) NOT NULL, -- name of image. Ex: 12.jpg
  `image_type` enum('Featured','Gallery') NOT NULL, -- Type image. Either Featured which appears first or Gallery which shown in gallery of product
  `created_by` bigint(50) NOT NULL, -- Foreign Key from users/profiles for The one who recorded image.
  `updated_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who updated record. NULL when it's not yet updated
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(), -- Timestamp of record creation. Never Null
  `updated_at` timestamp DEFAULT NULL, -- Timestamp record updated. Null if not yet updated
);

-- Table structure for table `business_products` for keeping products assigned to each business
CREATE TABLE `business_products` (
  `id` bigint(50) NOT NULL, -- Primary Key for business products
  `business_id` bigint(11) NOT NULL, -- Foreign Key from user_businesses to know business own product
  `product_id` bigint(50) NOT NULL, -- Foreign Key from products to know which product associated to business
  `product_price` int(11) NOT NULL, -- business price for this product
  `default_unit_package` int(11) NOT NULL, -- Foreign Key default package user use to sell product.
  `product_description` varchar(255) NOT NULL, -- BUsiness Own description of this product 
  `opening_stock` int(11) NOT NULL, -- Opening stock of product 
  `minimum_order_quantity` int(11) NOT NULL, -- Minimum quantity buyer can purchase for product. It varies with default_unit_package
  `minimum_order_indicator` int(11) NOT NULL, -- Minimum quantity system will notify vendor that product is running out of stock
  `product_published` enum('Yes','No') NOT NULL, -- if the product is published on market place 
  `created_by` bigint(50) NOT NULL, -- Foreign Key from users/profiles for The one who recorded record.
  `updated_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who updated record. NULL when it's not yet updated
  `deleted_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who deleted record. NULL when it's not deleted
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(), -- Timestamp of record creation. Never Null
  `updated_at` timestamp DEFAULT NULL, -- Timestamp record updated. Null if not yet updated
  `deleted_at` timestamp DEFAULT NULL, -- Timestamp record deleted. Null if not yet deleted
);

-- Table structure for table `products_discounts` for keeping products discount
CREATE TABLE `products_discounts` (
  `id` bigint(50) NOT NULL, -- Primary Key for products discounts
  `business_product_id` bigint(11) NOT NULL, -- Foreign Key from business_products to know which product have discount
  `product_discount` int(11) NOT NULL, -- Product discount. if 0 means no discount for the product
  `discount_setting` enum('Scheduled','Manual') DEFAULT NULL, -- The setting type of discount if business operate it manually or they put time of discount and stop itself
  `discount_from` date DEFAULT NULL, -- The starting time of discount if it's automatic
  `discount_to` date DEFAULT NULL, -- The end time of discount if it's automatic
  `active` enum('No','Yes') NOT NULL, -- Status of discount.
  `created_by` bigint(50) NOT NULL, -- Foreign Key from users/profiles for The one who recorded record.
  `updated_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who updated record. NULL when it's not yet updated
  `deleted_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who deleted record. NULL when it's not deleted
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(), -- Timestamp of record creation. Never Null
  `updated_at` timestamp DEFAULT NULL, -- Timestamp record updated. Null if not yet updated
  `deleted_at` timestamp DEFAULT NULL, -- Timestamp record deleted. Null if not yet deleted
);

-- Table structure for table `business_products_images` for keeping owner products images 
CREATE TABLE `business_products_gallery` (
  `id` bigint(50) NOT NULL, -- Primary Key for business_products_gallery
  `business_product_id` bigint(50) NOT NULL, -- Foreign Key from business_products to know image of which product
  `image_name` varchar(50) NOT NULL, -- Name of image. Ex: 12.jpg
  `image_type` enum('Featured','Gallery') NOT NULL, -- Type image. Either Featured which appears first or Gallery which shown in gallery of product
  `owner_type` enum('Ehaho','Business') NOT NULL, -- To know if owned by business in case of delete we can delete it from server for space
  `created_by` bigint(50) NOT NULL, -- Foreign Key from users/profiles for The one who recorded image.
  `updated_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who updated record. NULL when it's not yet updated
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(), -- Timestamp of record creation. Never Null
  `updated_at` timestamp DEFAULT NULL, -- Timestamp record updated. Null if not yet updated
);

-- Table structure for table `products_stock` for keeping inventory of business (Agrodealing and processing)????????????????? it's structure and function
CREATE TABLE `products_stock` (
  `id` bigint(50) NOT NULL, -- Primary Key
  `business_product_id` bigint(50) NOT NULL, -- Foreign Key from business products
  `stock_quantity` int(11) NOT NULL, -- Current stock value
  `created_by` bigint(50) NOT NULL, -- Foreign Key from users/profiles for The one who recorded record.
  `updated_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who updated record. NULL when it's not yet updated
  `deleted_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who deleted record. NULL when it's not deleted
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(), -- Timestamp of record creation. Never Null
  `updated_at` timestamp DEFAULT NULL, -- Timestamp record updated. Null if not yet updated
  `deleted_at` timestamp DEFAULT NULL, -- Timestamp record deleted. Null if not yet deleted
);

-- Table structure for table `tags` for keeping tags of products
CREATE TABLE `tags` (
  `id` int(11) NOT NULL, -- Primary Key for tags
  `tag_name` varchar(50) NOT NULL, -- name of tag
  `active` enum('Yes','No') NOT NULL, -- to know if tag is active or inactive
  `created_by` bigint(50) NOT NULL, -- Foreign Key from users/profiles for The one who recorded record.
  `updated_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who updated record. NULL when it's not yet updated
  `deleted_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who deleted record. NULL when it's not deleted
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(), -- Timestamp of record creation. Never Null
  `updated_at` timestamp DEFAULT NULL, -- Timestamp record updated. Null if not yet updated
  `deleted_at` timestamp DEFAULT NULL, -- Timestamp record deleted. Null if not yet deleted
);

-- Table structure for table `products_tags` for associating tag and products
CREATE TABLE `products_tags` (
  `id` bigint(50) NOT NULL, -- Primary Key for products_tags
  `business_product_id` bigint(50) NOT NULL, -- Foreign Key from business products to assign tag to products.
  `tag_id` bigint(50) NOT NULL, -- Foreign Key from tags to know which tag we are assigning
  `created_by` bigint(50) NOT NULL, -- Foreign Key from users/profiles for The one who recorded record.
  `updated_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who updated record. NULL when it's not yet updated
  `deleted_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who deleted record. NULL when it's not deleted
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(), -- Timestamp of record creation. Never Null
  `updated_at` timestamp DEFAULT NULL, -- Timestamp record updated. Null if not yet updated
  `deleted_at` timestamp DEFAULT NULL, -- Timestamp record deleted. Null if not yet deleted
);

-- Table structure for table `shipping_addresses` for keeping all addresses assigned to user most used in delivery
CREATE TABLE `shipping_addresses` (
  `id` bigint(50) NOT NULL, -- Primary Key for shipping_addresses
  `user_id` bigint(50) NOT NULL, -- Foreign Key from users/profile to know owner of address
  `email` varchar(50) DEFAULT NULL, -- Email address 
  `phone` varchar(12) NOT NULL, -- Phone Address / Contact person from this addresss
  `country` varchar(20) NOT NULL, -- address country
  `province` int(11) DEFAULT NULL, -- Foreign Key for address province if country is Rwanda
  `district` int(11) DEFAULT NULL, -- Foreign Key for address district if country is Rwanda
  `sector` int(11) DEFAULT NULL, -- Foreign Key for address sector if country is Rwanda
  `cell` int(11) DEFAULT NULL, -- Foreign Key for address cell if country is Rwanda
  `village` int(11) DEFAULT NULL, -- Foreign Key for address village if country is Rwanda
  `street_number` varchar(50) DEFAULT NULL, -- Street number of address if country is Rwanda
  `common_place` varchar(255) DEFAULT NULL, -- common known place neibourhood like Near Stadium Amahoro
  `address_1` varchar(255) DEFAULT NULL,  -- Street Address PO BOX, etc if is foreign countries. 
  `address_2` varchar(255) DEFAULT NULL,  -- Appartment number, Suit number etc if is foreign countries.
  `state` varchar(255) DEFAULT NULL,  -- State name if is foreign countries.
  `city` varchar(255) DEFAULT NULL,  -- city name if is foreign countries.
  `zip_code` varchar(255) DEFAULT NULL, -- Zip code if is foreign countries.
  `default_address` enum('No','Yes') NOT NULL, -- If this address is default for user. ????? Or it should be column of profile table and remove those addresses attributes
  `created_by` bigint(50) NOT NULL, -- Foreign Key from users/profiles for The one who recorded record.
  `updated_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who updated record. NULL when it's not yet updated
  `deleted_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who deleted record. NULL when it's not deleted
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(), -- Timestamp of record creation. Never Null
  `updated_at` timestamp DEFAULT NULL, -- Timestamp record updated. Null if not yet updated
  `deleted_at` timestamp DEFAULT NULL, -- Timestamp record deleted. Null if not yet deleted
);

-- Table structure for table `orders` for keeping online orders and offline sales
CREATE TABLE `orders` (
  `id` bigint(50) NOT NULL, -- Primary Key for orders
  `order_invoice` varchar(50) NOT NULL, -- an invoice of all products sold on this order
  `buyer_id` bigint(50) NOT NULL, -- Foreign Key from users to know who ordered or bought the products
  `order_paid_amount` int(11) NOT NULL, -- How much paid for this order for calculating the loan amount
  `order_status` varchar(20) NOT NULL, -- The status of order if it's either pending or successful
  `payment_status` varchar(20) NOT NULL, -- status of payment, if it's pending, failed, cancelled, successful or refunded.
  `payment_method` varchar(20) NOT NULL, -- Method used to pay. Mobile Money, Bank Transfer, VISA or Mastercard
  `address_id` bigint(50) DEFAULT NULL, -- Foreign Key from shipping_addresses to know which address the order is going to. It can be null when sale is offline
  `sale_channel` enum('Offline','Online') NOT NULL, -- If sale done online on ehaho or offile on physical market
  `sale_platform` enum('Web','USSD','Android','iOS') NOT NULL, -- platform used to place an order.
  `sale_date` date NOT NULL, -- date sale made different or same as date recorded
  `created_by` bigint(50) NOT NULL, -- Foreign Key from users/profiles for The one who recorded record.
  `updated_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who updated record. NULL when it's not yet updated
  `deleted_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who deleted record. NULL when it's not deleted
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(), -- Timestamp of record creation. Never Null
  `updated_at` timestamp DEFAULT NULL, -- Timestamp record updated. Null if not yet updated
  `deleted_at` timestamp DEFAULT NULL, -- Timestamp record deleted. Null if not yet deleted
);

-- Table structure for table `products_orders` for keeping online and offline sales products information
CREATE TABLE `products_orders` (
  `id` bigint(50) NOT NULL, -- Primary Key for products_orders
  `order_id` bigint(50) NOT NULL, -- Foreign Key from orders to know which order product info belong to
  `business_product_id` bigint(50) NOT NULL, -- Foreign Key from business_products to know which business owns the product
  `delivery_id` bigint(50) DEFAULT NULL, -- Foreign Key from user_businesses to know which delivery business is delivering this product. NULL is it's own delivery
  `delivery_code` varchar(20) NULL, -- The code that's shown to vendor for verification if it's right delivery when they get to vendor
  `buyer_code` varchar(20) NULL, -- The code that's shown to delivery for verification if it's right buyer when they are getting to product they bought
  `order_quantity` int(11) NOT NULL, -- quantity of products orders
  `order_unit_package` int(11) NOT NULL, -- Foreign Key from units_packages to know which package buyer bought in
  `order_unit_price` int(11) NOT NULL, -- product Unit price buyer bought 
  `delivery_amount` int(11) NOT NULL, -- delivery amount for delivering this product 
  `product_discount` int(11) NOT NULL, -- product discount when buyer bought the product. If zero means no discount
  `payment_status` varchar(20) NOT NULL, -- status of payment, if it's pending, failed, cancelled, successful or refunded.
  `order_status` varchar(20) NOT NULL, -- The status of order if it's pending, Approved, Preparing, Intransit or delivered
  `order_intransit_updates` varchar(255) DEFAULT NULL, -- Updates of Intransit order where delivery man is.
  `delivery_estimated_time` date NULL, -- Estimated time by delivery company to deliver product
  `created_by` bigint(50) NOT NULL, -- Foreign Key from users/profiles for The one who recorded record.
  `updated_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who updated record. NULL when it's not yet updated
  `deleted_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who deleted record. NULL when it's not deleted
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(), -- Timestamp of record creation. Never Null
  `updated_at` timestamp DEFAULT NULL, -- Timestamp record updated. Null if not yet updated
  `deleted_at` timestamp DEFAULT NULL, -- Timestamp record deleted. Null if not yet deleted
);

-- Table structure for table `purchases` for keeping purchases made offline in business
CREATE TABLE `purchases` (
  `id` bigint(50) NOT NULL, -- Primary Key for purchases
  `receipt_number` varchar(50) NOT NULL, -- a receipt of all products bought on this purchase
  `business_id` varchar(50) NOT NULL, -- Foreign Key from users_business to keep which business purchased
  `supplier_id` varchar(50) NOT NULL, -- Foreign Key from users to keep who sold
  `purchase_paid_amount` int(11) NOT NULL, -- How much paid for this purchase for calculating the loan amount
  `payment_status` varchar(20) NOT NULL,-- status of payment, if it's pending, failed, cancelled, successful or refunded.
  `payment_method` varchar(20) NOT NULL, -- Method used to pay. Mobile Money, Bank Transfer, VISA or Mastercard
  `purchase_channel` enum('Offline','Online') NOT NULL, --
  `purchase_platform` enum('Web','USSD','Android','iOS') DEFAULT NULL, -- Platform used to record purchase
  `purchase_date` date NOT NULL, -- Time purchase done different or same as time recorded
  `created_by` bigint(50) NOT NULL, -- Foreign Key from users/profiles for The one who recorded record.
  `updated_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who updated record. NULL when it's not yet updated
  `deleted_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who deleted record. NULL when it's not deleted
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(), -- Timestamp of record creation. Never Null
  `updated_at` timestamp DEFAULT NULL, -- Timestamp record updated. Null if not yet updated
  `deleted_at` timestamp DEFAULT NULL, -- Timestamp record deleted. Null if not yet deleted
);

-- Table structure for table `purchases_products` for keeping purchases products made offline in business
CREATE TABLE `purchases_products` (
  `id` bigint(50) NOT NULL, -- Primary Key for purchases_products
  `purchase_id` varchar(50) NOT NULL, -- Foreign key from purchases to know which purchase product belong to
  `business_product_id` bigint(50) NOT NULL, -- Foreign Key from business_products to know which business purchase the product
  `purchase_quantity` int(11) NOT NULL, -- Quantity of products purchased
  `purchase_unit_package` int(11) NOT NULL, -- Foreign Key from units_packages to know which package business purchased in
  `purchase_unit_price` int(11) NOT NULL, -- Unit price of product purchased
  `product_discount` int(11) NOT NULL, -- Discount on product purchased if any. If not this column is 0
  `created_by` bigint(50) NOT NULL, -- Foreign Key from users/profiles for The one who recorded record.
  `updated_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who updated record. NULL when it's not yet updated
  `deleted_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who deleted record. NULL when it's not deleted
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(), -- Timestamp of record creation. Never Null
  `updated_at` timestamp DEFAULT NULL, -- Timestamp record updated. Null if not yet updated
  `deleted_at` timestamp DEFAULT NULL, -- Timestamp record deleted. Null if not yet deleted
);

-- Table structure for table `damages` for keeping all damaged products in business
CREATE TABLE `damages` (
  `id` bigint(50) NOT NULL, -- Primary Key for damages
  `business_product_id` bigint(50) NOT NULL, -- Foreign Key from business_products to know which product damaged.
  `damage_quantity` int(11) NOT NULL, -- Quantity damaged
  `damage_unit_package` int(11) NOT NULL, -- Foreign Key from units_packages to know package damaged product measured in.
  `damage_date` date NOT NULL, -- Date of damage which may be same or different from recerded date
  `created_by` bigint(50) NOT NULL, -- Foreign Key from users/profiles for The one who recorded record.
  `updated_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who updated record. NULL when it's not yet updated
  `deleted_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who deleted record. NULL when it's not deleted
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(), -- Timestamp of record creation. Never Null
  `updated_at` timestamp DEFAULT NULL, -- Timestamp record updated. Null if not yet updated
  `deleted_at` timestamp DEFAULT NULL, -- Timestamp record deleted. Null if not yet deleted
);

-- Table structure for table `business_associated_users` for assigning users to business or cooperative ?????????????????? assigned to biz or user and how cooperative comes in??
CREATE TABLE `business_associated_users` (
  `id` bigint(50) NOT NULL, -- Primary Key for business_associated_users
  `partner_id` bigint(50) NOT NULL, -- Foreign Key from user_businesses to know which business user assigned to
  `user_id` bigint(50) NOT NULL, -- Foreign Key from users to know know the assigned user
  `association_approval`  enum('Yes','No') NOT NULL, -- Foreign Key For some reasons there will be time user will approve association. For now this is Yes by default
  `created_by` bigint(50) NOT NULL, -- Foreign Key from users/profiles for The one who recorded record.
  `updated_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who updated record. NULL when it's not yet updated
  `deleted_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who deleted record. NULL when it's not deleted
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(), -- Timestamp of record creation. Never Null
  `updated_at` timestamp DEFAULT NULL, -- Timestamp record updated. Null if not yet updated
  `deleted_at` timestamp DEFAULT NULL, -- Timestamp record deleted. Null if not yet deleted
);

-- Table structure for table `business_user_groups` for keeping groups among all users assigned to business or group
CREATE TABLE `business_user_groups` (
  `id` bigint(50) NOT NULL, -- Primary Key for business_user_groups
  `business_id` bigint(50) NOT NULL, -- Foreign Key from user_businesses owns this group
  `group_name` varchar(50) NOT NULL, -- Name of group created
  `parent_group_id` bigint(50) NOT NULL, -- Parent group if this is subgroup. If it's first group, parent group is 0
  `created_by` bigint(50) NOT NULL, -- Foreign Key from users/profiles for The one who recorded record.
  `updated_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who updated record. NULL when it's not yet updated
  `deleted_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who deleted record. NULL when it's not deleted
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(), -- Timestamp of record creation. Never Null
  `updated_at` timestamp DEFAULT NULL, -- Timestamp record updated. Null if not yet updated
  `deleted_at` timestamp DEFAULT NULL, -- Timestamp record deleted. Null if not yet deleted
);

-- Table structure for table `business_user_group_members` for keeping members assigned to group
CREATE TABLE `business_user_group_members` (
  `id` bigint(50) NOT NULL, -- Primary Key for business_user_group_members
  `group_id` bigint(50) NOT NULL, -- Foreign Key from business_user_groups to know which group this member belongs to
  `user_id` bigint(50) NOT NULL, -- Foreign Key from users to know the member of this group
  `created_by` bigint(50) NOT NULL, -- Foreign Key from users/profiles for The one who recorded record.
  `active` enum('Yes','No') NOT NULL, -- If user is active in group
  `updated_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who updated record. NULL when it's not yet updated
  `deleted_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who deleted record. NULL when it's not deleted
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(), -- Timestamp of record creation. Never Null
  `updated_at` timestamp DEFAULT NULL, -- Timestamp record updated. Null if not yet updated
  `deleted_at` timestamp DEFAULT NULL, -- Timestamp record deleted. Null if not yet deleted
);

-- Table structure for table `markets` for keeping farm markets and its info
CREATE TABLE `markets` (
  `id` bigint(50) NOT NULL, -- Primary Key for markets
  `market_name` varchar(50) NOT NULL, -- Name of market. Ex: Kimironko Market
  `market_province` int(11) NOT NULL, -- Foreign Key province Location of market
  `market_district` int(11) NOT NULL, -- Foreign Key district Location of market
  `market_sector` int(11) NOT NULL, -- Foreign Key sector Location of market
  `market_cell` int(11) NOT NULL, -- Foreign Key cell Location of market
  `market_village` int(11) NOT NULL, -- Foreign Key village Location of market
  `active` enum('Yes','No') NOT NULL, -- If market is active for buyers to see the prices on market
  `created_by` bigint(50) NOT NULL, -- Foreign Key from users/profiles for The one who recorded record.
  `updated_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who updated record. NULL when it's not yet updated
  `deleted_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who deleted record. NULL when it's not deleted
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(), -- Timestamp of record creation. Never Null
  `updated_at` timestamp DEFAULT NULL, -- Timestamp record updated. Null if not yet updated
  `deleted_at` timestamp DEFAULT NULL, -- Timestamp record deleted. Null if not yet deleted
);

-- Table structure for table `market_price` for keeping prices on that markets that will be shown to the market place
CREATE TABLE `market_price` (
  `id` bigint(50) NOT NULL, -- Primary Key for market_price
  `market_id` bigint(50) NOT NULL, -- Foreign Key from markets to know the price from which market
  `product_id` bigint(50) NOT NULL, -- Foreign Key from products to know which product has the price
  `product_group_id` bigint(50) NOT NULL, -- Foreign Key from variety to know which product variety ?????? Varity issue
  `wholesale_price` int(11) NOT NULL, -- Price the whole saler are selling on. 
  `retail_price` int(11) NOT NULL, -- Price retailer are selling on.
  `created_by` bigint(50) NOT NULL, -- Foreign Key from users/profiles for The one who recorded record.
  `updated_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who updated record. NULL when it's not yet updated
  `deleted_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who deleted record. NULL when it's not deleted
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(), -- Timestamp of record creation. Never Null
  `updated_at` timestamp DEFAULT NULL, -- Timestamp record updated. Null if not yet updated
  `deleted_at` timestamp DEFAULT NULL, -- Timestamp record deleted. Null if not yet deleted
);

-- -- Table structure for table `farming_activities_calendar` for keeping all activities created
-- CREATE TABLE `farming_activities_calendar` (
--   `id` bigint(50) NOT NULL, -- Primary Key for farming_activities_calendar
--   `activity_name` varchar(50) NOT NULL, -- Name of farming activity like Kubagara,...
--   `activity_details` varchar(255) NOT NULL, -- Description of this activity
--   `activity_from` date NOT NULL, -- When the activity will start
--   `activity_to` date NOT NULL, -- When the activity will end
--   `created_by` bigint(50) NOT NULL, -- Foreign Key from users/profiles for The one who recorded record.
--   `updated_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who updated record. NULL when it's not yet updated
--   `deleted_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who deleted record. NULL when it's not deleted
--   `created_at` timestamp NOT NULL DEFAULT current_timestamp(), -- Timestamp of record creation. Never Null
--   `updated_at` timestamp DEFAULT NULL, -- Timestamp record updated. Null if not yet updated
--   `deleted_at` timestamp DEFAULT NULL, -- Timestamp record deleted. Null if not yet deleted
-- );

-- -- Table structure for table `activities_target_members` ???????????????????????? How it will implemented
-- CREATE TABLE `activities_target_members` (
--   `id` bigint(50) NOT NULL, -- Primary Key
--   `activity_target` enum('cooperative','individual') NOT NULL,
--   `activity_id` bigint(50) NOT NULL, -- Foreign Key
--   `cooperative_id` bigint(50) DEFAULT NULL, -- Foreign Key
--   `user_id` bigint(50) DEFAULT NULL, -- Foreign Key
--   `created_by` bigint(50) NOT NULL, -- Foreign Key from users/profiles for The one who recorded record.
--   `updated_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who updated record. NULL when it's not yet updated
--   `deleted_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who deleted record. NULL when it's not deleted
--   `created_at` timestamp NOT NULL DEFAULT current_timestamp(), -- Timestamp of record creation. Never Null
--   `updated_at` timestamp DEFAULT NULL, -- Timestamp record updated. Null if not yet updated
--   `deleted_at` timestamp DEFAULT NULL, -- Timestamp record deleted. Null if not yet deleted
-- );

-- Table structure for table `delivery_routes` for keeping all routes for deliverying. (Districts)
CREATE TABLE `delivery_routes` (
  `id` int(11) NOT NULL, -- Primary Key for delivery_routes
  `from` int(11) NOT NULL, -- Foreign Key from districts to know route point one
  `to` int(11) NOT NULL, -- Foreign Key from districts to know route point two
  `active` enum('Yes','No') NOT NULL, -- To determine if the route is active or not
  `created_by` bigint(50) NOT NULL, -- Foreign Key from users/profiles for The one who recorded record.
  `updated_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who updated record. NULL when it's not yet updated
  `deleted_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who deleted record. NULL when it's not deleted
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(), -- Timestamp of record creation. Never Null
  `updated_at` timestamp DEFAULT NULL, -- Timestamp record updated. Null if not yet updated
  `deleted_at` timestamp DEFAULT NULL, -- Timestamp record deleted. Null if not yet deleted
)

-- Table structure for table `delivery_business_routes` for keeping all routes business work in
CREATE TABLE `delivery_business_routes` ( -- Merge estimated days,hours,... in one attribute)????
  `id` bigint(50) NOT NULL, -- Primary Key for delivery_business_routes
  `route_id` int(11) NOT NULL, -- Foreign Key from delivery_routes to know which route business is assigning to
  `business_id` bigint(50) NOT NULL, -- Foreign Key from user_businesses to know which business assigns to
  `estimated_days` int(5) NOT NULL, -- Business estimated time in this route
  `estimated_hours` int(5) NOT NULL, -- Business estimated time in this route
  `estimated_minutes` int(5) NOT NULL, -- Business estimated time in this route
  `active` enum('Yes','No') NOT NULL, -- Whether this route is active on inactive by business
  `created_by` bigint(50) NOT NULL, -- Foreign Key from users/profiles for The one who recorded record.
  `updated_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who updated record. NULL when it's not yet updated
  `deleted_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who deleted record. NULL when it's not deleted
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(), -- Timestamp of record creation. Never Null
  `updated_at` timestamp DEFAULT NULL, -- Timestamp record updated. Null if not yet updated
  `deleted_at` timestamp DEFAULT NULL, -- Timestamp record deleted. Null if not yet deleted
)

-- Table structure for table `delivery_package_prices` for keeping packages price for each route business works in
CREATE TABLE `delivery_package_prices` (
  `id` int(11) NOT NULL, -- Primary Key for delivery_package_prices
  `business_route_id` int(11) NOT NULL, -- business route id to know which business and route has this package
  `minimum_quantity` int(11) NOT NULL, -- Minimum quantity for this package price
  `maximum_quantity` int(11) NOT NULL, -- Maximum quantity for this package price
  `delivery_fees` int(11) NOT NULL, -- Delivery payment for this package in this route
  `active` enum('Yes','No') NOT NULL, -- If this package in this route is active
  `created_by` bigint(50) NOT NULL, -- Foreign Key from users/profiles for The one who recorded record.
  `updated_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who updated record. NULL when it's not yet updated
  `deleted_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who deleted record. NULL when it's not deleted
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(), -- Timestamp of record creation. Never Null
  `updated_at` timestamp DEFAULT NULL, -- Timestamp record updated. Null if not yet updated
  `deleted_at` timestamp DEFAULT NULL, -- Timestamp record deleted. Null if not yet deleted
)

-- Table structure for table `business_trucks` for keeping trucks of business or individual and it's current locations
CREATE TABLE `business_trucks` (
  `id` int(11) NOT NULL, -- Primary key for business_trucks
  `gps_serial_number` varchar(50) DEFAULT NULL,
  `business_id` int(11) NOT NULL, -- Foreign Key from user_businesses to know the owner of truck
  `truck_plate_no` varchar(20) NOT NULL, -- To keep plate number of truck
  `truck_type` varchar(50) NOT NULL, -- To keep type of truck
  `truck_model` varchar(50) NOT NULL, -- to keep model of truck
  `truck_max_weight` int(11) NOT NULL, -- To keep maximum weight the truck can carry.
  `truck_current_province` int(11) NOT NULL, -- Foreign Key for current location truck is.
  `truck_current_district` int(11) NOT NULL, -- Foreign Key for current location truck is.
  `truck_current_sector` int(11) NOT NULL, -- Foreign Key for current location truck is.
  `truck_current_cell` int(11) NOT NULL, -- Foreign Key for current location truck is.
  `truck_current_village` int(11) NOT NULL, -- Foreign Key for current location truck is.
  `truck_available` enum('Yes','No') NOT NULL, -- Whether truck is available or not at the moment
  `created_by` bigint(50) NOT NULL, -- Foreign Key from users/profiles for The one who recorded record.
  `updated_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who updated record. NULL when it's not yet updated
  `deleted_by` bigint(50) DEFAULT NULL, -- Foreign Key from users/profiles for The one who deleted record. NULL when it's not deleted
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(), -- Timestamp of record creation. Never Null
  `updated_at` timestamp DEFAULT NULL, -- Timestamp record updated. Null if not yet updated
  `deleted_at` timestamp DEFAULT NULL, -- Timestamp record deleted. Null if not yet deleted
)


