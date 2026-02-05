import { useSupabase } from "../../utils/supabase";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const supabase = useSupabase();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session && to.path !== "/login") {
    return navigateTo("/login");
  }
  if (session && to.path === "/login") {
    return navigateTo("/");
  }
});
