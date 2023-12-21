export interface Movie {
  partieObligatoire: {
    identifiant: string;
    titre: string;
  };
  type: string;
  anneeSortie: number;
  fiche: string;
}
