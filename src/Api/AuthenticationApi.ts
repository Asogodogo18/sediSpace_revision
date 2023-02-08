import { API_URL } from "./../constants/api-constants";

let Auth = {};
const Login = async (payload: { email: string; password: string }) => {
  const queryPayload = new FormData();
  //console.log("query out: ", payload);

  queryPayload.append("email", payload.email);
  queryPayload.append("password", payload.password);

  let response = await fetch(`${API_URL}/user/login`, {
    method: "POST",
    body: queryPayload,
  });

  return response.json();
};

const SignUp = async (payload: {
  name: string;
  surname: string;
  email: string;
  username: string;
  password: string;
}) => {
  const queryPayload = new FormData();
  //console.log("query out: ", payload);

  queryPayload.append("first_name", payload.name);
  queryPayload.append("last_name", payload.surname);
  queryPayload.append("username", payload.username);
  queryPayload.append("email", payload.email);
  queryPayload.append("password", payload.password);

  let response = await fetch(`${API_URL}/user/create`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: queryPayload,
  });
  return response.json();
};

export default Auth = { Login, SignUp };
