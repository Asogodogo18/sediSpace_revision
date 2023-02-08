enum typeMedia {
  image,
  video,
}

export type MediaType = {
  uri: string;
  type: keyof typeof typeMedia;
};

export type SingleChatProps = {
  chatId: string;
  triggerRefetch?: () => void;
  // onPress?: (chatId: string) => void;
};

enum NotificationType {
  message,
  post,
  story,
  suggest,
  friends,
}

export type SingleNotifPreviewProps = {
  thumbnail: string;
  onPress?: () => void;
  text: string;
  timestamp: string;
  type: keyof typeof NotificationType;
};

export type AuthContextType = {
  signedIn: boolean;
  authInfo: {
    name: string;
    surname: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  updateName: (text: string) => void;
  updateSurname: (text: string) => void;
  updateUsername: (text: string) => void;
  updateEmail: (text: string) => void;
  updatePassword: (text: string) => void;
  updateConfirmPassword: (text: string) => void;
};

export type UserContextType = {
  signedIn: boolean;
  isLoading: boolean;
  user: any;
  auth: {
    authToken: string;
    authTokenExpiry: number;
  };
};
