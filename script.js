// 🔑 SUPABASE (DECLARADO UMA ÚNICA VEZ)
const supabase = window.supabase.createClient(
  "https://sonyehijeanzoccstnzr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvbnllaGlqZWFuem9jY3N0bnpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1NTc4NTQsImV4cCI6MjA4NTEzMzg1NH0.sr4s9wikoDlvodcLw-RGGqHozrezwcSjfHlThv316aE"
);
// ELEMENTOS
const email = document.getElementById("email");
const password = document.getElementById("password");
const message = document.getElementById("message");
const loading = document.getElementById("loading");

// BOTÕES
document.getElementById("btnLogin").onclick = login;
document.getElementById("btnRegister").onclick = register;
document.getElementById("btnReset").onclick = resetPassword;

// FUNÇÕES DE UI
function setLoading(text = "") {
  loading.textContent = text;
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
  message.textContent = "";
  setLoading("⏳ Entrando...");

  const { error } = await supabaseClient.auth.signInWithPassword({
    email: email.value,
    password: password.value
  });

  setLoading("");

  if (error) {
    showError("E-mail ou senha inválidos");
  } else {
    showSuccess("Login realizado com sucesso!");
  }
}

// CADASTRO
async function register() {
  message.textContent = "";
  setLoading("⏳ Criando conta...");

  const { error } = await supabaseClient.auth.signUp({
    email: email.value,
    password: password.value
  });

  setLoading("");

  if (error) {
    showError(error.message);
  } else {
    showSuccess("Conta criada! Verifique seu e-mail.");
  }
}

// RESET DE SENHA
async function resetPassword() {
  if (!email.value) {
    showError("Informe seu e-mail");
    return;
  }

  setLoading("📩 Enviando e-mail...");

  const { error } = await supabaseClient.auth.resetPasswordForEmail(
    email.value
  );

  setLoading("");

  if (error) {
    showError("Erro ao enviar e-mail");
  } else {
    showSuccess("E-mail de redefinição enviado!");
  }
}
