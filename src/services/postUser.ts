import { User } from "../types/User";
import supabase from "./supabase";

export const postUser = async (user: User) => {
  let { data: users, error } = await supabase
    .from("user")
    .insert({
      name: user.name,
      surname: user.surname,
      email: user.email,
      skills: user.skills,
    })
    .select();
  if (error) {
    throw new Error("Ошибка. Пользователи не загрузились");
  }
  return users;
};
