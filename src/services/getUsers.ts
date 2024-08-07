import { User } from "../types/User";
import supabase from "./supabase";

export const getUsers = async () => {
  let { data: users, error } = await supabase.from("user").select("*");
  if (error) {
    throw new Error("Ошибка. Пользователи не загрузились");
  }
  return users as User[];
};
