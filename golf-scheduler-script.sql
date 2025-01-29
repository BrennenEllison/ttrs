-- Drop Database if it exists
DROP DATABASE IF EXISTS golf_scheduling;

-- Create a new database
CREATE DATABASE golf_scheduling;

-- Use Database
USE golf_scheduling;


CREATE TABLE customer (
id				BIGINT(20) AUTO_INCREMENT NOT NULL,				
first_name		VARCHAR(15) NOT NULL,
last_name		VARCHAR(15) NOT NULL,
phone_number	VARCHAR(10) NOT NULL,
email			VARCHAR(50) NOT NULL UNIQUE,
PRIMARY KEY(id)
);

-- daylight or twilight
CREATE TABLE tee_time_category (
id						INT AUTO_INCREMENT NOT NULL,
category_name			VARCHAR(50) NOT NULL,
unit_price				DECIMAL(10, 2) NOT NULL,
PRIMARY KEY(id)
);

CREATE TABLE course (
id				INT AUTO_INCREMENT NOT NULL,
course_name		VARCHAR(50),
address			VARCHAR(100),
phone			VARCHAR(10),
PRIMARY KEY(id)
);

CREATE TABLE tee_time (
id						INT AUTO_INCREMENT NOT NULL,
start_time				DATETIME NOT NULL,
hole_count				INT NOT NULL,
tee_time_category_id	INT NOT NULL,
booking_status			TINYINT(1),
unit_price				DECIMAL(10, 2),
course_id				INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY(tee_time_category_id) REFERENCES tee_time_category(id),
FOREIGN KEY(course_id) REFERENCES course(id)
);


INSERT INTO course  (course_name, address, phone)	
VALUES 
("Cascadia", "1234 fake ln", "1234567891"),
("Green Hill", "1234 fake ln", "1234567891"),
("Bobs course", "1234 fake ln", "1234567891");


CREATE TABLE addon (
id			INT AUTO_INCREMENT,
name		VARCHAR(100) NOT NULL,
unit_price  DECIMAL(10, 2) NOT NULL,
description VARCHAR(100)	NOT NULL,
PRIMARY KEY(id)
);

CREATE TABLE reservation_addon (
id							INT AUTO_INCREMENT,
quantity						INT NUll,
unit_price					DECIMAL(19, 2) NULL,
reservation_id				BIGINT NOT NULL,
addon_id						INT NOT NULL,
PRIMARY KEY(id),
FOREIGN KEY(addon_id) REFERENCES addon(id)
);

-- reservation table creation
CREATE TABLE reservation (
id								bigint AUTO_INCREMENT NOT NULL,
player_count 					INT	NOT NULL CHECK (player_count BETWEEN 1 AND 4),
total_price 					DECIMAL(19,2),
date_created					DATETIME not null,
last_updated					DATETIME NOT NULL,
status							VARCHAR(128),
customer_id						BIGINT NOT NULL,
tee_time_id 					INT NOT NULL,
PRIMARY KEY(id),
FOREIGN KEY(tee_time_id) REFERENCES tee_time(id),
foreign key(customer_id) REFERENCES customer(id)
);

-- -- Add foreing key constraint to reservation_addon
ALTER TABLE reservation_addon
ADD CONSTRAINT reservation_addon_fk
FOREIGN KEY (reservation_id)
REFERENCES reservation(id);


-- Insert sample data into the tee_time_class table
INSERT INTO tee_time_category (category_name, unit_price)
VALUES ('daylight', 45.00), ('twilight', 35.00); 



-- Insert sample data into the addon table
INSERT INTO addon (name, unit_price, description)
VALUES 	("Golf Cart Rental", 25.00, "Cart Rental"),
		("Golf Balls", 15.00, "Golf Balls Set x20"), 
		("Golf Tees", 5.00, "Golf Tees Set x10");


