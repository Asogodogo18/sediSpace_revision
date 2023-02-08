import React, { useState } from "react";
const [name, setName] = useState("Doe");
const [surName, setSurName] = useState("John");
const [username, setUsername] = useState("@JohnDoe");
const sectionInput = [
  {
    label: "Nom de famille",
    value: name,
    onChange: (text) => setName(text),
  },
  {
    label: "Prénom",
    value: surName,
    onChange: (text) => setSurName(text),
  },
  {
    label: "Nom d’Utilisateur",
    value: username,
    onChange: (text) => setUsername(text),
  },
];

export default sectionInput;
