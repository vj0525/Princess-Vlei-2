CREATE TABLE Organism (
	orgID int NOT NULL AUTO_INCREMENT,
	Species varchar(255) NOT NULL,
	Genus varchar(255) NOT NULL,
	Common_Name varchar(255) NOT NULL,
	Conservation_Status varchar(255),
	Alien boolean,
	Invasive boolean,
	PRIMARY KEY (orgID)
);

CREATE TABLE Fauna_Survey (
	faunaID int NOT NULL,
	Survey_Date date NOT NULL,
	Sex varchar(1) NOT NULL,
	Latitude int NOT NULL,
	Longitude int NOT NULL,
	Activity varchar(255) NOT NULL,
	Life_Stage varchar(255) NOT NULL,
	PRIMARY KEY (faunaID),
    FOREIGN KEY(faunaID) REFERENCES Organism(orgID)
);

CREATE TABLE Flora (
	floraID int NOT NULL UNIQUE REFERENCES Organism(orgID),
	Growth_Form varchar(255) NOT NULL,
	Growing_Method varchar(255) NOT NULL,
	Veg_Type varchar(255) NOT NULL,
	PRIMARY KEY (floraID),
    FOREIGN KEY(floraID) REFERENCES Organism(orgID)
);

CREATE TABLE Flora_Survey (
	floraSID int NOT NULL REFERENCES Flora(floraID),
	Survey_Date date NOT NULL,
	Latitude int NOT NULL,
	Longitude int NOT NULL,
    PRIMARY KEY (floraSID),
    FOREIGN KEY(floraSID) REFERENCES Flora(floraID)
);

CREATE TABLE Education (
	eduID int NOT NULL AUTO_INCREMENT,
	Event_Type int NOT NULL,
	School varchar(255) NOT NULL,
	School_Grade int NOT NULL,
	Num_Of_Learners int NOT NULL,
	Avg_Score int NOT NULL,
	PRIMARY KEY (eduID)
);

#-----------------NOT USED------------------------#

CREATE TABLE Restoration (
	restID int NOT NULL REFERENCES Outreach(outID),
	Area float(24) NOT NULL,
	Ammount int NOT NULL,
	PRIMARY KEY (restID)
);

CREATE TABLE Outreach (
	outID int NOT NULL AUTO_INCREMENT,
	Outreach_Date date NOT NULL,
	Invested float(24) NOT NULL,
	Num_Of_Community int NOT NULL,
	Num_Of_Students int NOT NULL,
	PRIMARY KEY (outID)
);