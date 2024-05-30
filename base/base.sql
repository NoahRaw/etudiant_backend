-- utilisateur
CREATE SEQUENCE utilisateurSequence;

CREATE TABLE utilisateur(
    idUtilisateur VARCHAR(250) DEFAULT 'utilisateur' || nextval('utilisateurSequence')::TEXT PRIMARY KEY,
    nom VARCHAR(255),
    mail VARCHAR(255),
    mdp VARCHAR(255),
    profil INTEGER
);

-- produit
CREATE SEQUENCE produitSequence;

CREATE TABLE produit (
    idProduit VARCHAR(250) DEFAULT 'produit' || nextval('produitSequence')::TEXT PRIMARY KEY,
    nom VARCHAR(255),
    prixDeRevient NUMERIC
);

-- Billet
CREATE SEQUENCE billetSequence;

CREATE TABLE Billet (
    idBillet VARCHAR(250) DEFAULT 'billet' || nextval('billetSequence')::TEXT PRIMARY KEY,
    prix NUMERIC
);

-- Pack
CREATE SEQUENCE packSequence;

CREATE TABLE Pack (
    idPack VARCHAR(250) DEFAULT 'pack' || nextval('packSequence')::TEXT PRIMARY KEY,
    nom VARCHAR(255),
    idBillet VARCHAR(250),
    image VARCHAR(255),
    FOREIGN KEY (idBillet) REFERENCES Billet(idBillet)
);

-- Formule
CREATE SEQUENCE formuleSequence;

CREATE TABLE Formule (
    idFormule VARCHAR(250) DEFAULT 'formule' || nextval('formuleSequence')::TEXT PRIMARY KEY,
    dateFormule DATE,
    idPack VARCHAR(250),
    idProduit VARCHAR(250),
    quantite INTEGER,
    FOREIGN KEY (idPack) REFERENCES Pack(idPack),
    FOREIGN KEY (idProduit) REFERENCES Produit(idProduit)
);

-- Localisation
CREATE SEQUENCE LocalisationSequence;

CREATE TABLE Localisation (
    idLocalisation VARCHAR(250) DEFAULT 'vente_billet' || nextval('LocalisationSequence')::TEXT PRIMARY KEY,
    designation VARCHAR(255)
);

-- Axe
CREATE SEQUENCE AxeSequence;

CREATE TABLE Axe (
    idAxe VARCHAR(250) DEFAULT 'vente_billet' || nextval('AxeSequence')::TEXT PRIMARY KEY,
    designation VARCHAR(255)
);

-- AxeLocalisation
CREATE SEQUENCE AxeLocalisationSequence;

CREATE TABLE AxeLocalisation (
    idAxeLocalisation VARCHAR(250) DEFAULT 'vente_billet' || nextval('AxeLocalisationSequence')::TEXT PRIMARY KEY,
    idAxe VARCHAR(255),
    idLocalisation VARCHAR(255),
    FOREIGN KEY (idAxe) REFERENCES axe (idAxe),
    FOREIGN KEY (idLocalisation) REFERENCES Localisation (idLocalisation)
);

-- Vente_billet_temp
CREATE SEQUENCE Vente_billet_tempSequence;

CREATE TABLE Vente_billet_temp (
    idVente_billet_temp VARCHAR(250) DEFAULT 'vente_billet' || nextval('Vente_billet_tempSequence')::TEXT PRIMARY KEY,
    code_pack VARCHAR(255),
    date DATE,
    quantite INTEGER,
    code_vendeur VARCHAR(255),
    axe_livraison VARCHAR(255)
);

-- VenteBillet
CREATE SEQUENCE venteBilletSequence;

CREATE TABLE VenteBillet (
    idVenteDeBillet VARCHAR(250) DEFAULT 'vente_billet' || nextval('venteBilletSequence')::TEXT PRIMARY KEY,
    dateVente DATE,
    nomClient VARCHAR(255),
    contact VARCHAR(255),
    idUtilisateur VARCHAR(255),
    idLocalisation VARCHAR(255),
    FOREIGN KEY (idUtilisateur) REFERENCES utilisateur (idUtilisateur),
    FOREIGN KEY (idLocalisation) REFERENCES Localisation (idLocalisation)
);

-- DetailVenteBillet
CREATE SEQUENCE detailVenteBilletSequence;

CREATE TABLE DetailVenteBillet (
    idDetailVenteBillet VARCHAR(250) DEFAULT 'detail_vente_billet' || nextval('detailVenteBilletSequence')::TEXT PRIMARY KEY,
    idVenteDeBillet VARCHAR(250),
    idPack VARCHAR(250),
    quantite INTEGER,
    FOREIGN KEY (idVenteDeBillet) REFERENCES VenteBillet (idVenteDeBillet),
    FOREIGN KEY (idPack) REFERENCES Pack (idPack)
);

-- PaiementBillet
CREATE SEQUENCE paiementBilletSequence;

CREATE TABLE PaiementBillet (
    idPaiementBillet VARCHAR(250) DEFAULT 'paiement_billet' || nextval('paiementBilletSequence')::TEXT PRIMARY KEY,
    datePaiement DATE,
    idVenteDeBillet VARCHAR(250),
    montant NUMERIC,
    FOREIGN KEY (idVenteDeBillet) REFERENCES VenteBillet (idVenteDeBillet)
);