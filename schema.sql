-- Remove any existing database and user.
DROP DATABASE IF EXISTS dealership;
DROP USER IF EXISTS dealership_user@localhost;

-- Create dealership database and user. Ensure Unicode is fully supported.
CREATE DATABASE dealership CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
CREATE USER dealership_user@localhost IDENTIFIED WITH mysql_native_password BY 'Dealership123$';
GRANT ALL PRIVILEGES ON dealership.* TO dealership_user@localhost;

USE dealership;
DROP TABLE IF EXISTS car;

CREATE TABLE car (
    id SERIAL PRIMARY KEY,
    vin TEXT,
    make TEXT,
    model TEXT,
    year INT,
    color TEXT,
    price REAL,
    miles INT,
    link TEXT
);

INSERT INTO car (vin, make, model, year, color, price, miles, link)
VALUES ("WDBNG75J32A225892", "Mercedes Benz", "S Class", 2002, "silver", 4999.99, 130000, "https://carfax-img.vast.com/carfax/v2/-2730016775928077434/1/344x258");

INSERT INTO car (vin, make, model, year, color, price, miles, link)
VALUES ("WD3PF1CC1C5677889", "Mercedes Benz", "Sprinter", 2012, "white", 22994.99, 226000, "https://cars.usnews.com/static/images/Auto/custom/11932/2012_Mercedes-Benz_Sprinter_1.jpg");

INSERT INTO car (vin, make, model, year, color, price, miles, link)
VALUES ("WDBTK75G56T056480", "Mercedes Benz", "CLK Class", 2006, "black", 14494.99, 91200, "https://upload.wikimedia.org/wikipedia/commons/c/c0/CLK_209_%28Cabriolet%29.jpg");

INSERT INTO car (vin, make, model, year, color, price, miles, link)
VALUES ("WAUKEAFM8DA033285", "Audi", "A3", 2013, "white", 13500.99, 82000,  "https://images.hgmsites.net/lrg/2013-audi-a3-hatchback-leaked-images_100383118_l.jpg");

INSERT INTO car (vin, make, model, year, color, price, miles, link)
VALUES ("WUAENAFG5FN000527", "Audi", "R8", 2015, "red", 74899.99, 29750,  "https://static.cargurus.com/images/forsale/2021/11/25/08/13/2015_audi_r8-pic-137525004296842451-1024x768.jpeg?io=true&width=640&height=480&fit=bounds&format=jpg&auto=webp");

INSERT INTO car (vin, make, model, year, color, price, miles, link)
VALUES ("WAUDGBFL3DA082877", "Audi", "S4", 2013, "blue", 20589.99, 76515,  "https://images.customwheeloffset.com/web-compressed/502187-1-2013-s4-audi-base-hr-lowering-springs-dpe-ft-5s-matte-black.jpg");

INSERT INTO car (vin, make, model, year, color, price, miles, link)
VALUES ("3FAFP13P41R199033", "Ford", "Escort", 2001, "red", 4999.99, 165000, "https://file.kelleybluebookimages.com/kbb/base/house/2001/2001-Ford-Escort-FrontSide_FOESCSED004_505x375.jpg?interpolation=high-quality&downsize=303:*");

INSERT INTO car (vin, make, model, year, color, price, miles, link)
VALUES ("1FTFX1CT8BKE03619", "Ford", "F 150", 2011, "black", 18449.99, 165000, "https://www.windingroad.com/assets/autos_db/thumbnails/2011_F150_SKV_5010_HR_jpg_677x1000_q100.jpg");

INSERT INTO car (vin, make, model, year, color, price, miles, link)
VALUES ("3FADP4TK0D0018712", "Ford", "Fiesta", 2013, "red", 7449.99, 98000, "https://images.hgmsites.net/hug/2013-ford-fiesta-st_100384164_h.jpg");

INSERT INTO car (vin, make, model, year, color, price, miles, link)
VALUES ("WP1AB29P88LA47599", "Porsche", "Cayenne", 2008, "white", 13994.99, 149000, "http://24carshop.com/wp-content/uploads/2018/04/AwesomeAmazingGreat-2008-Porsche-Cayenne-GTS-2008-Porsche-Cayenne-GTS-Sand-White-Black-Private-Owner-Clean-2017-20182018-201920172018.jpg");

INSERT INTO car (vin, make, model, year, color, price, miles, link)
VALUES ("WP0BA2A91CS728076", "Porsche", "911", 2012, "grey", 83990.99, 22513, "https://file.kelleybluebookimages.com/kbb/base/house/2012/2012-Porsche-911-FrontSide_PS911CA121_640x480.jpg");

INSERT INTO car (vin, make, model, year, color, price, miles, link)
VALUES ("WP0AD2A90CS766742", "Porsche", "Cayman", 2008, "white", 47900.99, 66510, "https://static.cargurus.com/images/site/2008/02/21/13/42/2008_porsche_cayman_s-pic-34049-1600x1200.jpeg");

INSERT INTO car (vin, make, model, year, color, price, miles, link)
VALUES ("2C3CCAFJ2CH801561", "Chrysler", "300", 2012, "black", 9989.99, 129335, "https://file.kelleybluebookimages.com/kbb/base/house/2012/2012-Chrysler-300-FrontSide_CR300121_640x480.jpg");

INSERT INTO car (vin, make, model, year, color, price, miles, link)
VALUES ("2C4RC1BG8CR212654", "Chrysler", "Town and Country", 2012, "grey", 8995.99, 109800, "https://static.cargurus.com/images/forsale/2021/01/26/16/47/2013_chrysler_town___country-pic-743138902994291374-1024x768.jpeg");

INSERT INTO car (vin, make, model, year, color, price, miles, link)
VALUES ("1GKLVKED8AJ155580", "GMC", "Acadia", 2010  , "black", 6494.99, 152000, "https://file.kelleybluebookimages.com/kbb/base/house/2010/2010-GMC-Acadia-FrontSide_GMACAD101_505x375.jpg");