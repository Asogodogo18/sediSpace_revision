import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";

const General = [
  {
    title: "Géneral",
    data: [
      {
        icon: <MaterialIcons name="account-circle" size={24} color="black" />,
        label: "Informations Profil",
        type: "main",
        onPress: () => {},
        id: 1,
      },
      {
        icon: <MaterialIcons name="fingerprint" size={24} color="black" />,
        label: "Sécurité et confidentialité",
        type: "main",
        onPress: () => {},
        id: 2,
      },
    ],
  },
  {
    title: "Fonctionalités",
    data: [
      {
        icon: <Ionicons name="ios-notifications" size={24} color="black" />,
        label: "Notifications",
        type: "switch",
        onPress: () => {},
        id: 3,
      },
      {
        icon: <MaterialIcons name="payment" size={24} color="black" />,
        label: "Verification de Compte",
        type: "main",
        onPress: () => {},
        id: 4,
      },
    ],
  },
  {
    title: "Langue et Pays",
    data: [
      {
        icon: <Ionicons name="information-circle" size={24} color="black" />,
        label: "Langue d'affichage",
        type: "main",
        onPress: () => {},
        id: 5,
      },
      {
        icon: <Feather name="link-2" size={24} color="black" />,
        label: "Pays",
        type: "main",
        onPress: () => {},
        id: 6,
      },
    ],
  },
];

export { General };
