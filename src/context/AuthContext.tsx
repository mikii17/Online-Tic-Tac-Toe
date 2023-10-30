import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

type UserFromUsersDB = {
  uid: string;
  email: string;
  username: string;
};

type AuthContextType = {
  user: UserFromUsersDB | null | undefined;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username: string) => Promise<void>;
  signout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useUser = () => {
  const { user } = useContext(AuthContext);
  return user;
};
export const isUsernameAvailable = async (username: string) => {
  const q = query(collection(db, "users"), where("username", "==", username));
  const user = await getDocs(q);
  return !(user.docs.length > 0);
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserFromUsersDB | null | undefined>(
    undefined
  ); // undefined => loading, null => logged out, User => logged in

  const syncUser = async (uid: string) => {
    setUser(undefined);
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const user = await getDocs(q);
    if (user.docs.length > 0) {
      setUser(user.docs[0].data() as UserFromUsersDB);
    } else {
      // TODO: handle error
    }
  };

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signup = async (email: string, password: string, username: string) => {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      email: user.email,
      username,
    });
  };

  const signout = async () => {
    await auth.signOut();
  };

  const value = {
    user,
    login,
    signup,
    signout,
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        syncUser(user.uid);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
