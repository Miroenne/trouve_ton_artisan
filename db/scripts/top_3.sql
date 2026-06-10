SELECT a.nom, a.note, v.nom_Ville, s.nom_Spécialité FROM Artisans AS a
INNER JOIN Villes v ON v.id_Ville = a.Villes_id_Ville
INNER JOIN Spécialités s ON s.id_Spécialité = a.Spécialités_id_Spécialité
INNER JOIN Top t ON t.top_Value = 'VRAI' WHERE a.Top_id_Top = t.id_Top;