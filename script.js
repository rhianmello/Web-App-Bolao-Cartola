// 🔐 SUPABASE
import { createClient } from '@supabase/supabase-js'

  const SUPABASE_URL = "https://sonyehijeanzoccstnzr.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvbnllaGlqZWFuem9jY3N0bnpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1NTc4NTQsImV4cCI6MjA4NTEzMzg1NH0.sr4s9wikoDlvodcLw-RGGqHozrezwcSjfHlThv316aE";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

if (error) {
  showError("E-mail ou senha inválidos");
} else {
  window.location.href = "dashboard.html";
}

// ELEMENTOS
const form = document.getElementById("authForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");
const loading = document.getElementById("loading");
const btnReset = document.getElementById("btnReset");

function setLoading(active) {
  loading.textContent = active ? "⏳ Processando..." : "";
}

function show(text, ok = false) {
  message.style.color = ok ? "lime" : "red";
  message.textContent = text;
}

// SUBMIT (ENTER FUNCIONA)
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  setLoading(true);
  message.textContent = "";

  const email = emailInput.value;
  const password = passwordInput.value;

  // tenta login
  const { error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (!loginError) {
    setLoading(false);
    show("Login realizado!", true);
    return;
  }

  // se falhar, tenta cadastro
  const { error: registerError } = await supabase.auth.signUp({
    email,
    password
  });

  setLoading(false);

  if (registerError) {
    show("Senha incorreta ou erro no acesso");
  } else {
    show("Se for seu primeiro acesso, verifique seu e-mail.", true);
  }
});

// RESET SENHA
btnReset.addEventListener("click", async () => {
  if (!emailInput.value) {
    show("Informe seu e-mail");
    return;
  }

  setLoading(true);

  const { error } = await supabase.auth.resetPasswordForEmail(emailInput.value);

  setLoading(false);

  if (error) {
    show("Erro ao enviar e-mail");
  } else {
    show("E-mail de redefinição enviado!", true);
  }
});
