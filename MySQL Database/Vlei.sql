CREATE TABLE Organism (
	orgID int NOT NULL AUTO_INCREMENT,
	Species varchar(255) NOT NULL,
	Genus varchar(255) NOT NULL,
	Common_Name varchar(255) NOT NULL,
	Conservation_Status varchar(255),
	Alien boolean,
	PRIMARY KEY (orgID)
);

CREATE TABLE Survey (
	sID int NOT NULL AUTO_INCREMENT,
	Survey_Date date NOT NULL,
	Ammount int NOT NULL
	PRIMARY KEY (sID)
);

CREATE TABLE Polygons (
	polyID int NOT NULL AUTO_INCREMENT,
	Name varchar(255) NOT NULL,
	HC_Score int NOT NULL,
	Surface_Area float(24) NOT NULL,
	PRIMARY KEY (polyID)
);

CREATE TABLE Outreach (
	outID int NOT NULL AUTO_INCREMENT,
	Outreach_Date date NOT NULL,
	Invested float(24) NOT NULL,
	Num_Of_Community int NOT NULL,
	Num_Of_Students int NOT NULL,
	PRIMARY KEY (outID)
);

CREATE TABLE Restoration (
	restID int NOT NULL REFERENCES Outreach(outID),
	Area float(24) NOT NULL,
	Ammount int NOT NULL,
	PRIMARY KEY (restID)
);

CREATE TABLE Plants (
	plantID int NOT NULL REFERENCES Organism(orgID),
	Growth_Form varchar(255) NOT NULL,
	Growing_Method varchar(255) NOT NULL,
	Veg_Type varchar(255) NOT NULL,
	PRIMARY KEY (restID)
);