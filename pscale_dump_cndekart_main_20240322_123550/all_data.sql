INSERT INTO `Category`(`id`,`category`,`root`,`parentId`) VALUES
("cljuxymvu0000qd6nkfp4le7q","steel",1,"root"),
("cljvmb4bn0000qdd50ae09q6x","fabric",0,"root"),
("cljvnn0te0004qdd5lu01epc6","pvc",0,"cljvmb4bn0000qdd50ae09q6x"),
("clkc77n210000l708dep9v78y","Hot Rolled",0,"cljuxymvu0000qd6nkfp4le7q"),
("clkc7ol6k0002la09jevx55io","Hollow Tubes",0,"cljuxymvu0000qd6nkfp4le7q"),
("clkc7ovzg0004la098qqk34t7","ISMB",0,"clkc77n210000l708dep9v78y"),
("clkc7ozkb0006la09bvswis8d","ISMC",0,"clkc77n210000l708dep9v78y"),
("clkc7weza000ala09hlgwrvbw","Durgapur",0,"clkc7ovzg0004la098qqk34t7"),
("clkc7z2ob000cla09sgskq3qo","SAIL",0,"clkc7ovzg0004la098qqk34t7"),
("clkc7z7ok000ela09soprheua","SEL",0,"clkc7ovzg0004la098qqk34t7");
INSERT INTO `Manufacturer`(`id`,`name`) VALUES
("cllhlqay10000qdipihe8hbay","Durgapur Steel"),
("clqlu5atl0000qdcshggte4pj","Assansol Steel");
INSERT INTO `Product`(`id`,`title`,`description`,`category`,`unit`,`createdAt`,`updatedAt`,`cgst`,`igst`,`sgst`,`manufacturer`) VALUES
("clkifuwc90000qduj2x3ee8yg","ISMB 400 Changed","We are offering optimum quality ISMB 400 Mild Steel Beam. Used in various fields, our ISMB 400 ranges are admired for their increased efficiency, robust construction, flexibility, durability, and reliability. Further, our offered quality assured ranges are offered at very reasonable rates.","cljuxymvu0000qd6nkfp4le7q","cljnpfhns0002qdrfb4hope4q","2023-07-25 15:15:19.139","2023-08-19 15:15:56.483",5,10,4,NULL);
INSERT INTO `ProductImages`(`id`,`imageUrl`,`productId`,`primary`,`imageId`) VALUES
("clkifv3gx0004qdujce1lh5uq","https://ik.imagekit.io/hbqsxmwrz/SAIL-ISMB_OfFGOSCvh.png","clkifuwc90000qduj2x3ee8yg",0,"64bfe70e06370748f2ecb0a2");
INSERT INTO `ProductPrices`(`id`,`range`,`price`,`createdAt`,`updatedAt`,`product`) VALUES
("clkifv15x0002qdujgj81r2ae","1-10",60,"2023-07-25 15:15:25.990","2023-08-19 15:16:03.317","clkifuwc90000qduj2x3ee8yg");
INSERT INTO `Unit`(`id`,`unit`) VALUES
("cljnpexy00000qdrfrvuei12x","kg"),
("cljnqhvls0000qdn49d8auz1g","sq ft"),
("cljl9kibx0000qdox5g26j4u0","sq m"),
("cljnpfhns0002qdrfb4hope4q","ton");
INSERT INTO `User`(`id`,`name`,`email`,`emailVerified`,`image`,`gst`,`password`,`pan`,`phone`,`address`,`createdAt`,`updatedAt`,`role`) VALUES
("3","Admin","admin@admin.com",NULL,NULL,NULL,"$2a$12$xY/8X4PmVlKVo7j6JoN9L.GCH6IHlmAL9bwPNQvyZLIIKFybpKh8a",NULL,NULL,NULL,"2023-06-21 06:13:38.000","2023-06-21 06:13:38.000","ADMIN"),
("clj4midkt0000qdqgovgckm9a","Anish Chatterjee","atechchatterjeee@gmail.com",NULL,NULL,"22AABCU9603R1ZX","$2b$05$Uus.dTVyUTDh9HlDt4Og1Occimfy8oDz2va1chAF5nyfoohHKC1iK","ABCTY1234D","08910107098","sdfsdfds","2023-06-20 18:33:04.061","2023-06-20 18:33:04.061","USER"),
("clj5azyu90000qdg47kd48ppy","Anish Chattopadhyay","anish.pradipta@gmail.com",NULL,NULL,"22AABCU9603R1ZU","$2b$05$5L9qsiSOGtVyppTDw96f6u.zB/11wO2mw/dqjwAnfHTG.lAIk75Jy","CODPC4427E","08910107098","Pathagar Road, Ghosh Para Panihati","2023-06-21 05:58:35.553","2023-06-21 05:58:35.553","USER");
