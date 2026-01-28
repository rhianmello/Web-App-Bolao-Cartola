// =====================
// CONFIG SUPABASE
// =====================
const supabaseUrl = "https://sonyehijeanzoccstnzr.supabase.co";
const supabaseKey = "sb_publishable_mkQzw6F4tTW_4WfU6wQ-6Q_6-u1p4bE";

const supabase = window.supabase.createClient(
  supabaseUrl,
  supabaseKey
);

// ELEMENTOS
const message = document.getElementById("message");
const loading = document.getElementById("loading");

function setLoading(status) {
  loading.innerHTML = status ? "⏳ Processando..." : "";
}

function showError(text) {
  message.style.color = "#f87171";
  message.innerText = text;
}

function showSuccess(text) {
  message.style.color = "#4ade80";
  message.innerText = text;
}

// 🔐 LOGIN
async function login() {
  setLoading(true);
  message.innerText = "";

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  setLoading(false);

  if (error) {
    showError("❌ E-mail ou senha incorretos");
  } else {
    showSuccess("✅ Login realizado com sucesso!");
  }
}

// 📝 CADASTRO
async function register() {
  setLoading(true);
  message.innerText = "";

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signUp({
    email,
    password
  });

  setLoading(false);

  if (error) {
    showError("❌ " + error.message);
  } else {
    showSuccess("📩 Cadastro feito! Verifique seu e-mail.");
  }
}

// 🔁 RESET SENHA
async function resetPassword() {
  const email = document.getElementById("email").value;

  if (!email) {
    showError("Informe seu e-mail para redefinir a senha.");
    return;
  }

  setLoading(true);

  const { error } = await supabase.auth.resetPasswordForEmail(email);

  setLoading(false);

  if (error) {
    showError("Erro ao enviar e-mail de redefinição.");
  } else {
    showSuccess("📩 Enviamos um link para seu e-mail.");
  }
}
