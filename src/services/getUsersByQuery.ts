import supabase from "./supabase";

async function getUsersByQuery(query: string) {
  console.log(query);
  const { data: users, error } = await supabase
    .from("user")
    .select()
    .ilike("name", `%${query}%`);

  if (error) {
    throw new Error(error.message);
  }
  return users;
}
export default getUsersByQuery;
