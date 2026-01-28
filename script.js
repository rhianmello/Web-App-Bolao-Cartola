if (window.__SUPABASE_INIT__) {
  throw new Error("Script carregado duas vezes");
}
window.__SUPABASE_INIT__ = true;

// 🔑 SUPABASE (DECLARADO UMA ÚNICA VEZ)
const supabase = window.supabase.createClient(
  "https://sonyehijeanzoccstnzr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvbnllaGlqZWFuem9jY3N0bnpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1NTc4NTQsImV4cCI6MjA4NTEzMzg1NH0.sr4s9wikoDlvodcLw-RGGqHozrezwcSjfHlThv316aE"
);

// ELEMENTOS
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");
const loading = document.getElementById("loading");

// BOTÕES (só conecta se existir)
const btnLogin = document.getElementById("btnLogin");
const btnRegister = document.getElementById("btnRegister");
const btnReset = document.getElementById("btnReset");

if (btnLogin) btnLogin.addEventListener("click", login);
if (btnRegister) btnRegister.addEventListener("click", register);
if (btnReset) btnReset.addEventListener("click", resetPassword);

function setLoading(active) {
  loading.textContent = active ? "⏳ Processando..." : "";
}

function showError(text) {
  message.style.color = "red";
  message.textContent = text;
}

function showSuccess(text) {
  message.style.color = "lime";
  message.textContent = text;
}

// LOGIN
async function login() {
  setLoading(true);
  message.textContent = "";

  const { error } = await supabase.auth.signInWithPassword({
    email: emailInput.value,
    password: passwordInput.value
  });

  setLoading(false);

  if (error) {
    showError("E-mail ou senha inválidos");
  } else {
    showSuccess("Login realizado com sucesso!");
  }
}

// CADASTRO
async function register() {
  setLoading(true);
  message.textContent = "";

  const { error } = await supabase.auth.signUp({
    email: emailInput.value,
    password: passwordInput.value
  });

  setLoading(false);

  if (error) {
    showError(error.message);
  } else {
    showSuccess("Conta criada! Verifique seu e-mail.");
  }
}

// RESET DE SENHA
async function resetPassword() {
  if (!emailInput.value) {
    showError("Informe seu e-mail");
    return;
  }

  setLoading(true);

  const { error } = await supabase.auth.resetPasswordForEmail(
    emailInput.value
  );

  setLoading(false);

  if (error) {
    showError("Erro ao enviar e-mail");
  } else {
    showSuccess("E-mail de redefinição enviado!");
  }
}
