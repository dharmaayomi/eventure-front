"use client";

import { axiosInstance } from "@/lib/axios";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

let isSignOut = false;

const useAxios = () => {
  const router = useRouter();

  useEffect(() => {
    const requestIntercept = axiosInstance.interceptors.request.use(
      async (config) => {
        const session = await getSession();
        const accessToken = session?.user.accessToken;
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    const responseIntercept = axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        if (
          (!isSignOut &&
            err?.response.data.message === "Unauthorized, no token provided") ||
          err?.response.data.message === "Token expired" ||
          err?.response.data.message === "Unauthorized, invalid token"
        ) {
          isSignOut = true;
          signOut({ redirect: false });
          router.push("/login");
        }

        return Promise.reject(err);
      },
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestIntercept);
      axiosInstance.interceptors.response.eject(responseIntercept);
    };
  }, []);

  return { axiosInstance };
};

export default useAxios;
