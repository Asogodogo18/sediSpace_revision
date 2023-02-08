export const convertProfilePrivacy = (payload) => {
  switch (payload) {
    case "Toutes Les Personnes":
      return "everyone";
      break;
    case "Mes Followers":
      return "followers";
      break;
    case "Personne":
      return "followers";
      break;

    default:
      return "everyone";

      break;
  }
};

export const convertContactPrivacy = (payload) => {
  switch (payload) {
    case "Toutes Les Personnes":
      return "everyone";
      break;
    case "Les Gens Que je Suis":
      return "followed";
      break;

    default:
      return "everyone";
      break;
  }
};

export const convertIndexPrivacy = (payload) => {
  switch (payload) {
    case "Oui":
      return "Y";
      break;
    case "Non":
      return "N";
      break;

    default:
      return "Y";

      break;
  }
};
