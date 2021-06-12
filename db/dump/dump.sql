use apiDatabase;

CREATE TABLE Users (
  id int(11) NOT NULL AUTO_INCREMENT,
  username varchar(255) UNIQUE NOT NULL,
  password varchar(255),
  PRIMARY KEY(id)
);

CREATE TABLE Countries (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255),
  PRIMARY KEY(id)
);

CREATE TABLE Cities (
  id int(11) NOT NULL AUTO_INCREMENT,
  countryId int(11) NOT NULL,
  name varchar(255),
  PRIMARY KEY(id),
  FOREIGN KEY (countryId) REFERENCES Countries(id)
);

CREATE TABLE Addresses (
  id int(11) NOT NULL AUTO_INCREMENT,
  cityId int(11) NOT NULL,
  street varchar(255),
  PRIMARY KEY(id),
  FOREIGN KEY (cityId) REFERENCES Cities(id)
);

CREATE TABLE Profiles (
  id int(11) NOT NULL AUTO_INCREMENT,
  userId int(11) NOT NULL,
  addressId int(11) NOT NULL,
  name varchar(255),
  PRIMARY KEY(id),
  FOREIGN KEY (userId) REFERENCES Users(id),
  FOREIGN KEY (addressId) REFERENCES Addresses(id)
);

INSERT INTO Countries(id, name)
VALUES 
(1, "URUGUAY"),
(2, "FRANCE"),
(3, "SPAIN");

INSERT INTO Cities (id, countryId, name)
VALUES 
(1, 1, "MONTEVIDEO"),
(2, 1, "MALDONADO"),
(3, 2, "PARIS"),
(4, 2, "NORMANDY"),
(5, 3, "MADRID"),
(6, 3, "BARCELONA");
