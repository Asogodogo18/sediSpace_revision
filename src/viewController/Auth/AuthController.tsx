import { useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import useAuthModel from "../../viewModel/AuthModel";
import useAuth from "../../Context/AuthContext";
import {
  USER_BIO,
  USER_COUNTRY,
  USER_KEY,
  USER_LANG,
} from "../../constants/general-constants";
import {
  removeData,
  storeDataObject,
  getDataObject,
  storeData,
} from "../../services/storage";
import { useUserContext } from "../../Context";
import { toastError, toastSuccess } from "../../utils/toastHandler";
import {
  convertContactPrivacy,
  convertIndexPrivacy,
  convertProfilePrivacy,
} from "../../utils/privacyValueConverter";
import {
  useUpdateUserAvatarMutation,
  useUpdateUserMutation,
  useUpdateUserPrivacyMutation,
  useUpdateUserCoverMutation,
  useSavePasswordUpdateMutation,
  useRequestPasswordUpdateMutation,
} from "../../Api/UserApi";
import useUserController from "../Users/UserController";

const useAuthController = () => {
  const Navigation = useNavigation();
  const { Login, SignUp } = useAuthModel();
  const { authInfo } = useAuth();
  const { getUserFromId } = useUserController();
  const { onSignInSuccess, onLogOut } = useUserContext();

  const [updateAvatar, avatarUpdataRes] = useUpdateUserAvatarMutation();
  const [updateCover, coverUpdataRes] = useUpdateUserCoverMutation();
  const [requestPassChange] = useRequestPasswordUpdateMutation();
  const [savePassUpdate] = useSavePasswordUpdateMutation();

  const [
    updatePrivacy,
    { isLoading: updating, isError, error: privacyErr, data: privacyRes },
  ] = useUpdateUserPrivacyMutation();
  const [updateProfile, profileUpdateRes] = useUpdateUserMutation();
  // console.log("privacy err: ", privacyErr);
  // console.log("sending privacy: ", updating);
  // console.log("privacy res: ", privacyRes);

  const [name, setName] = useState(authInfo.name);
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState<string>(authInfo.email);
  const [password, setPassword] = useState<string>(authInfo.password);

  const [surname, setSurname] = useState<string>(authInfo.confirmPassword);
  const [username, setUsername] = useState<string>(authInfo.username);
  const [password1, setPassword1] = useState<string>(authInfo.confirmPassword);

  const onChangeName = (text: string) => setName(text);
  const onChangeSurname = (text: string) => setSurname(text);

  const onChangeUsername = (text: string) => setUsername(text);

  const onChangePassword1 = (text: string) => setPassword1(text);
  const onChangeEmail = (text: string) => setEmail(text);

  const onChangePassword = (text: string) => setPassword(text);

  if (error) {
    toastError(error);
    setError("");
  }

  const onClickSignUp = async () => {
    let payload = {
      email,
      password,
      name,
      surname,
      username,
    };
    console.log("payload signup :", payload);

    return await SignUp(payload);
  };
  const onSignUp = async (payload: {
    email: string;
    password: string;
    name: string;
    surname: string;
    username: string;
  }) => {
    console.log("payload signup :", payload);
    try {
      const json = await SignUp(payload);
      console.log("signUp: ", json);
      if (json.code !== 200) {
        console.log("login error: ", json);
        toastError(`${json?.message}: ${json?.err_code}`);
        return;
      }
      toastSuccess("Votre compte a été créé avec succès");
      Navigation.goBack();
    } catch (e) {
      console.log("error sign up:", e);
      toastError(e);
    }
  };

  const updateUserBio = async (payload: string) => {
    if (payload == "") return;
    await storeData(USER_BIO, payload);
  };

  const updateUserLocalization = async (payload: {
    country: string;
    language: string;
  }) => {
    await storeData(USER_COUNTRY, payload.country);
    await storeData(USER_LANG, payload.language);
  };

  const updateUserPrivacy = async (payload: {
    privacy1: string;
    privacy2: string;
    privacy3: string;
  }) => {
    const user = await getDataObject(USER_KEY);
    const formData = new FormData();
    formData.append("id", user.id);
    formData.append("profile_privacy", convertProfilePrivacy(payload.privacy1));
    formData.append("contact_privacy", convertContactPrivacy(payload.privacy2));
    formData.append("index_privacy", convertIndexPrivacy(payload.privacy3));

    return await updatePrivacy(formData).unwrap();
  };

  const updateUserProfile = async (payload: {
    name: string;
    surName: string;
    username: string;
    email: string;
    urlSite: string;
    bio: string;
    sexe: string;
  }) => {
    console.log("update launched");

    const user = await getDataObject(USER_KEY);
    const formData = new FormData();
    formData.append("id", user.id);
    formData.append("first_name", payload.name);
    formData.append("last_name", payload.surName);
    formData.append("email", payload.email);
    formData.append("website", payload.urlSite);
    formData.append("bio", payload.bio);
    formData.append("gender", payload.sexe);
    formData.append("language", user.language);
    formData.append("country", user?.country_id);

    try {
      const response = await updateProfile(formData).unwrap();
      console.log("response user update: ", response);

      if (response.code !== 200) {
        throw new Error(response?.message);
      } else {
        toastSuccess(response?.message);
        return true;
      }
    } catch (error: any) {
      toastError(error.toString());
    }
  };

  const updateUserCover = async (payload) => {
    const user = getDataObject(USER_KEY);
    const formData = new FormData();
    formData.append("id", user.id);
    formData.append("cover", payload);
  };

  const updateUserAvatar = async (payload) => {
    const user = getDataObject(USER_KEY);
    const formData = new FormData();
    formData.append("id", user.id);
    formData.append("avatar", payload);
  };

  const requestPasswordChange = async (email: string) => {
    const formData = new FormData();
    formData.append("email", email);

    //TODO send data to backend and notify user
  };

  const savePasswordChange = async (payload: {
    password: string;
    confirm_password: string;
    code: string;
  }) => {
    const formData = new FormData();
    formData.append("password", payload.password);
    formData.append("confirm_password", payload.confirm_password);
    formData.append("code", payload.code);

    //TODO send data to backend and notify user
  };

  const onClickLogin = async () => {
    let payload = {
      email,
      password,
    };
    if (email === "" || password === "") {
      toastError("Les champs sont vides");
      return;
    }
    console.log("login payload: ", payload);
    setIsLoading(true);
    try {
      const json = await Login(payload);

      console.log("login: ", json);
      if (json.code !== 200) {
        setIsLoading(false);
        throw new Error(`${json.message}: ${json.err_code}`);
      }
      const user = await getUserFromId(json?.id);
      if (user.code !== 200) {
        setIsLoading(false);
        throw new Error(`${user.message}: ${user.err_code}`);
      } else {
        storeDataObject(USER_KEY, user.data);
        storeDataObject("auth", user.auth);
        onSignInSuccess({ user: user.data, auth: user.auth });
      }
    } catch (error) {
      toastError(error?.toString());
    }
    setIsLoading(false);
  };

  const onClickLogout = () => {
    removeData(USER_KEY);
    removeData("auth");
    onLogOut();
  };

  return {
    email,
    password,
    password1,
    name,
    surname,
    username,
    error,
    isLoading,
    onChangeEmail,
    onChangePassword,
    onChangePassword1,
    onChangeName,
    onChangeSurname,
    onChangeUsername,
    onClickLogin,
    onSignUp,
    onClickSignUp,
    onClickLogout,
    updateUserBio,
    updateUserLocalization,
    updateUserPrivacy,
    updateUserProfile,
  };
};

export default useAuthController;
