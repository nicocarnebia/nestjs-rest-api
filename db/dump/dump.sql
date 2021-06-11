use apiDatabase;

CREATE TABLE users (
  id int(11) NOT NULL,
  username varchar(255),
  password varchar(255),
  PRIMARY KEY(id)
);

CREATE TABLE countries (
  id int(11) NOT NULL,
  name varchar(255),
  PRIMARY KEY(id)
);

CREATE TABLE cities (
  id int(11) NOT NULL,
  countryId int(11) NOT NULL,
  name varchar(255),
  PRIMARY KEY(id),
  FOREIGN KEY (countryId) REFERENCES countries(id)
);

CREATE TABLE adresses (
  id int(11) NOT NULL,
  cityId int(11) NOT NULL,
  street varchar(255),
  PRIMARY KEY(id),
  FOREIGN KEY (cityId) REFERENCES cities(id)
);

CREATE TABLE profiles (
  id int(11) NOT NULL,
  userId int(11) NOT NULL,
  addressId int(11) NOT NULL,
  name varchar(255),
  PRIMARY KEY(id),
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (addressId) REFERENCES adresses(id)
);

INSERT INTO countries(id, name)
VALUES 
(1, "URUGUAY"),
(2, "FRANCE"),
(3, "SPAIN");

INSERT INTO cities (id, countryId, name)
VALUES 
(1, 1, "MONTEVIDEO"),
(2, 1, "MALDONADO"),
(3, 2, "PARIS"),
(4, 2, "NORMANDY"),
(5, 3, "MADRID"),
(6, 3, "BARCELONA");
