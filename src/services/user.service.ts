"use server";

import { RequestApi, User } from "@/interfaces";
import api from "@/lib/api";
import { revalidatePath } from "next/cache";

export const getUsers = async () => {
  try {
    const response = await api.get("users");
    return response.data as User[];
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getUserBySlug = async (slug: string) => {
  try {
    const response = await api.get(`users/${slug}`);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const createUser = async (payload: any) => {
  try {
    const response = await api.post("users", payload);
    revalidatePath("/dashboard/users");
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const login = async (payload: any) => {
  try {
    const response = await api.post("users/login", payload);
    return response.data as RequestApi;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const updateUser = async (id: string, payload: any) => {
  try {
    const response = await api.patch(`users/${id}`, payload);
    revalidatePath("/dashboard/users");
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const inactiveUser = async (id: string) => {
  try {
    const response = await api.patch(`users/inactive/${id}`);
    revalidatePath("/dashboard/users");
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const activeUser = async (id: string) => {
  try {
    const response = await api.patch(`users/active/${id}`);
    revalidatePath("/dashboard/users");
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
