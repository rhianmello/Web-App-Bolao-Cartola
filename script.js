// 🔐 SUPABASE
import { createClient } from '@supabase/supabase-js'
const SUPABASE_URL = 'https://sonyehijeanzoccstnzr.supabase.co';
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvbnllaGlqZWFuem9jY3N0bnpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1NTc4NTQsImV4cCI6MjA4NTEzMzg1NH0.sr4s9wikoDlvodcLw-RGGqHozrezwcSjfHlThv316aE";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


// 🔐 Proteção da página
const { data: { user } } = await supabase.auth.getUser();

if (!user) {
  window.location.href = "index.html";
} else {
  document.getElementById("userEmail").textContent =
    `Logado como: ${user.email}`;
}

// 🚪 Logout
document.getElementById("logout").addEventListener("click", async () => {
  await supabase.auth.signOut();
  window.location.href = "index.html";
});
