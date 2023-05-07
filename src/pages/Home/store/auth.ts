import { defineStore } from "pinia";
import { auth } from "@/firebase/config";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getUser, register } from "@/pages/Home/api";
import type {
  SignInInput,
  BaseSignUpInput,
  SignUpInputGoogleAuth,
} from "@/pages/Home/api";
import * as firebase from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import type { APIResponse } from "@/common/interfaces";
import router from "@/router";
import { LOCALSTORAGE_KEYS } from "@/common/constants";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}
interface AuthState {
  user: User | null;
}

export const useAuthStore = defineStore({
  id: "auth",
  state: () =>
    ({
      user: null,
    } as AuthState),
  getters: {
    currentUser: (state) => state.user,
  },
  actions: {
    setLoggedIn() {
      localStorage.setItem(LOCALSTORAGE_KEYS.isAuthenticated, "true");
    },
    setLoggedOut() {
      this.user = null;
      localStorage.removeItem(LOCALSTORAGE_KEYS.isAuthenticated);
    },
    handleFirebaseError(e: firebase.FirebaseError) {
      let error;
      if (e.code === "auth/user-not-found") {
        error = "The user does not exist";
      } else if (e.code === "auth/popup-closed-by-user") {
        error = null;
      } else {
        error = e.message;
      }
      return error;
    },
    async login(body: SignInInput) {
      try {
        await signInWithEmailAndPassword(auth, body.email, body.password);
        const response = await getUser();

        if (!response.error) {
          this.user = response.data as User;
          this.setLoggedIn();
        }
        return response;
      } catch (e: any) {
        let error = e;
        if (e instanceof firebase.FirebaseError) {
          error = this.handleFirebaseError(e);
        }
        return { data: {}, error };
      }
    },
    async signUp(body: BaseSignUpInput) {
      return await register(body);
    },
    async googleAuth() {
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const [first_name, last_name] = result.user.displayName?.split(
          " "
        ) as string[];
        const token = await result.user.getIdToken();
        const body = {
          first_name,
          last_name,
          token,
          email: result.user.email,
          role: "USER",
        };
        const response: APIResponse = await this.signUp(
          body as SignUpInputGoogleAuth
        );
        if (!response.error) {
          this.setLoggedIn();
        }
        return response;
      } catch (e) {
        let error = e;
        if (e instanceof firebase.FirebaseError) {
          error = this.handleFirebaseError(e);
        }
        return { data: {}, error };
      }
    },
    async logout() {
      try {
        await signOut(auth);
        this.setLoggedOut();
        await router.push("/");
      } catch (e) {
        let error = e;
        if (e instanceof firebase.FirebaseError) {
          error = this.handleFirebaseError(e);
        }
        console.log(error);
      }
    },
  },
});
