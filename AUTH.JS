import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://sonyehnzr.supabase.co";
const SUPABASE_ANON_KEY = "SUA_CHAVE_REAL";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ELEMENTOS
const email = document.getElementById("email");
const password = document.getElementById("password");
const message = document.getElementById("message");
const loading = document.getElementById("loading");

// FORM LOGIN
document.getElementById("loginForm").addEventListener("submit", login);

// BOTÕES
document.getElementById("btnRegister").addEventListener("click", register);
document.getElementById("btnReset").addEventListener("click", resetPassword);

function setLoading(text = "") {
  loading.textContent = text;
}

function error(msg) {
  message.style.color = "red";
  message.textContent = msg;
}

function success(msg) {
  message.style.color = "lime";
  message.textContent = msg;
}

// LOGIN
async function login(e) {
  e.preventDefault();
  setLoading("⏳ Entrando...");
  message.textContent = "";

  const { error: err } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  });

  setLoading("");

  if (err) {
    error("E-mail ou senha inválidos");
  } else {
    window.location.href = "dashboard.html";
  }
}

// CADASTRO
async function register() {
  setLoading("⏳ Criando conta...");
  message.textContent = "";

  const { error: err } = await supabase.auth.signUp({
    email: email.value,
    password: password.value
  });

  setLoading("");

  if (err) {
    if (err.message.includes("already")) {
      error("E-mail já cadastrado");
    } else {
      error(err.message);
    }
  } else {
    success("Conta criada! Verifique seu e-mail.");
  }
}

// RESET
async function resetPassword() {
  if (!email.value) {
    error("Informe seu e-mail");
    return;
  }

  setLoading("📩 Enviando e-mail...");

  const { error: err } = await supabase.auth.resetPasswordForEmail(email.value);

  setLoading("");

  if (err) {
    error("Erro ao enviar e-mail");
  } else {
    success("E-mail de redefinição enviado!");
  }
}
