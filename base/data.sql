-- utilisateur
INSERT INTO utilisateur(idUtilisateur,nom,mail,mdp) VALUES
('utilisateur1','admin','admin@gmail.com','0000'),
('utilisateur2','Stephane','stephane@gmail.com','0000'),
('utilisateur3','Anthonio','anthonio@gmail.com','1111'),
('utilisateur4','Ricardo','ricardo@gmail.com','2222');

-- Produit
INSERT INTO Produit (idProduit, nom, prixDeRevient) VALUES 
    ('PROD001', 'Tsatsiou', 25.00),
    ('PROD002', 'Saucisse fumée', 80.00),
    ('PROD003', 'boulette chinoise', 150.00),
    ('PROD004', 'poulet fumée', 200.00),
    ('PROD005', 'cochon laquée', 120.00),
    ('PROD006', 'beignet de crevette', 120.00),
    ('PROD007', 'emballage', 120.00);

-- Billet
INSERT INTO Billet (idBillet, prix) VALUES 
    ('BIL001', 20000.00),
    ('BIL002', 40000.00);

-- Pack
INSERT INTO Pack (idPack, nom, idBillet, image) VALUES 
    ('PACK001', 'Pack Standard', 'BIL001', 'image1.jpg'),
    ('PACK002', 'Pack Premium', 'BIL002', 'image2.jpg'),
    ('PACK003', 'Pack VIP', 'BIL001', 'image3.jpg'),
    ('PACK004', 'Pack Familial', 'BIL002', 'image4.jpg'),
    ('PACK005', 'Pack Entreprise', 'BIL001', 'image5.jpg');

-- Formule
INSERT INTO Formule (idFormule, dateFormule, idPack, idProduit, quantite) VALUES 
    ('FORM001', '2024-03-05', 'PACK001', 'PROD001', 2),
    ('FORM002', '2024-03-06', 'PACK002', 'PROD002', 1),
    ('FORM003', '2024-03-07', 'PACK003', 'PROD003', 3),
    ('FORM004', '2024-03-08', 'PACK004', 'PROD004', 1),
    ('FORM005', '2024-03-09', 'PACK005', 'PROD005', 5);

-- Données pour la table Localisation
INSERT INTO Localisation (idLocalisation, designation) VALUES 
    ('localisation1', 'Localisation 1'),
    ('localisation2', 'Localisation 2'),
    ('localisation3', 'Localisation 3'),
    ('localisation4', 'Localisation 4');

-- Données pour la table Axe
INSERT INTO Axe (idAxe, designation) VALUES 
    ('Axe1', 'Axe 1'),
    ('Axe2', 'Axe 2'),
    ('Axe3', 'Axe 3'),
    ('Axe4', 'Axe 4');

-- Données pour la table AxeLocalisation
INSERT INTO AxeLocalisation (idAxeLocalisation, idAxe, idLocalisation) VALUES 
    ('AxeLocalisation1', 'Axe1', 'localisation1'),
    ('AxeLocalisation2', 'Axe2', 'localisation2'),
    ('AxeLocalisation3', 'Axe3', 'localisation3'),
    ('AxeLocalisation4', 'Axe4', 'localisation4');

-- VenteBillet
INSERT INTO VenteBillet (idVenteDeBillet, idUtilisateur, dateVente, nomClient, contact, idLocalisation) VALUES 
    ('VENTE001', 'utilisateur1' , '2024-03-05', 'John Doe', '0342057233' , 'localisation1'),
    ('VENTE002', 'utilisateur2', '2024-03-06', 'Jane Smith', '0342057233', 'localisation2'),
    ('VENTE003', 'utilisateur3' ,'2024-03-07', 'Alice Johnson', '0342057233', 'localisation3'),
    ('VENTE004', 'utilisateur4' ,'2024-03-08', 'Bob Brown', '0342057233', 'localisation4'),
    ('VENTE005', 'utilisateur1' , '2024-03-09', 'Emily Davis', '0342057233', 'localisation1');

-- DetailVenteBillet
INSERT INTO DetailVenteBillet (idVenteDeBillet, idPack, quantite) VALUES 
    ('VENTE001', 'PACK001', 2),
    ('VENTE001', 'PACK002', 1),
    ('VENTE002', 'PACK003', 3),
    ('VENTE003', 'PACK004', 1),
    ('VENTE003', 'PACK002', 2);

-- PaiementBillet
INSERT INTO PaiementBillet (datePaiement, idVenteDeBillet, montant) VALUES 
    ('2023-01-15', 'VENTE001', 150.00),
    ('2023-01-20', 'VENTE002', 300.00),
    ('2023-02-05', 'VENTE003', 200.00),
    ('2023-02-10', 'VENTE004', 400.00),
    ('2023-02-15', 'VENTE005', 250.00);