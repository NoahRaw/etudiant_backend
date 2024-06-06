-- v_statNombreBilletUtilisateur
Create view v_statNombreBilletUtilisateur as
Select
    utilisateur.nom,billet.prix,sum(DetailVenteBillet.quantite)
From
    DetailVenteBillet join VenteBillet
        on DetailVenteBillet.idVenteDeBillet=VenteBillet.idVenteDeBillet
    join utilisateur
        on utilisateur.idUtilisateur=VenteBillet.idUtilisateur
    join pack
        on pack.idPack=DetailVenteBillet.idPack
    join billet
        on billet.idBillet=pack.idBillet
group by
    utilisateur.nom,billet.prix;

-- prix total des matieres premieres
Create view v_prix_total_pack as
Select 
    Formule.idPack,sum(Produit.prixDeRevient*Formule.quantite) as prix_total_pack
From
    Formule join Produit 
        on Formule.idProduit=produit.idProduit
group by
    Formule.idPack;

Create view v_prix_total_matiere_premiere as
Select
    sum(DetailVenteBillet.quantite*v_prix_total_pack.prix_total_pack) as prix_total_matiere_premiere
From
    DetailVenteBillet join v_prix_total_pack
        on DetailVenteBillet.idPack=v_prix_total_pack.idPack;
    
-- etat paiment billet
Create view v_prix_total_paiement as
Select
    VenteBillet.idUtilisateur,sum(PaiementBillet.montant) as total_paiment
From
    PaiementBillet join VenteBillet
        on PaiementBillet.idVenteDeBillet=VenteBillet.idVenteDeBillet
group by
    VenteBillet.idUtilisateur;

Create view v_prix_total_a_payer as
Select
    VenteBillet.idUtilisateur,sum(DetailVenteBillet.quantite*billet.prix) as prix_total_a_payer
From
    DetailVenteBillet join VenteBillet
        on DetailVenteBillet.idVenteDeBillet = VenteBillet.idVenteDeBillet
    join Pack
        on Pack.idPack = DetailVenteBillet.idPack
    join billet
        on Pack.idBillet = billet.idBillet
group by
    VenteBillet.idUtilisateur;

-- montant_par_pack
Create view v_montant_par_pack as
Select
    pack.idPack,pack.nom,sum(DetailVenteBillet.quantite*billet.prix) as montant_par_pack
From
    DetailVenteBillet join pack
        on DetailVenteBillet.idPack=pack.idPack
    join billet
        on pack.idBillet=billet.idBillet
group by pack.idPack,pack.nom;

-- montant_par_pack_with_quantite
Create view v_montant_par_pack_with_quantite as
Select
    pack.idPack,pack.nom,sum(DetailVenteBillet.quantite*billet.prix) as montant_par_pack,sum(DetailVenteBillet.quantite) as quantite
From
    DetailVenteBillet join pack
        on DetailVenteBillet.idPack=pack.idPack
    join billet
        on pack.idBillet=billet.idBillet
group by pack.idPack,pack.nom;

-- v_vente_billet_temp
Create view v_vente_billet_temp as
Select
    vente_billet_temp.date,pack.idPack,vente_billet_temp.quantite,utilisateur.idUtilisateur,Localisation.idLocalisation
From
    vente_billet_temp join pack
        on vente_billet_temp.Code_pack=pack.idPack
    join utilisateur
        on utilisateur.idUtilisateur=vente_billet_temp.code_vendeur
    join Localisation
        on vente_billet_temp.axe_livraison=Localisation.idLocalisation;

-- v_vente_billet_temp_v2
Create view v_vente_billet_temp_v2 as
Select
    VenteBillet.idVenteDeBillet,vente_billet_temp.code_pack as idPack,vente_billet_temp.quantite
From
    vente_billet_temp join VenteBillet
        on vente_billet_temp.date=VenteBillet.datevente and vente_billet_temp.code_vendeur=VenteBillet.idUtilisateur and vente_billet_temp.axe_livraison=VenteBillet.idLocalisation;