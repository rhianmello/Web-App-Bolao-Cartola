import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://sonyehnzr.supabase.co";
const SUPABASE_ANON_KEY = "SUA_CHAVE_REAL";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// PROTEÇÃO
const { data: { user } } = await supabase.auth.getUser();

if (!user) {
  window.location.href = "index.html";
} else {
  document.getElementById("userEmail").textContent =
    `Logado como: ${user.email}`;
}

// LOGOUT
document.getElementById("logout").addEventListener("click", async () => {
  await supabase.auth.signOut();
  window.location.href = "index.html";
});
