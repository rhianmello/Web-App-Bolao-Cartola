// =====================
// CONFIG SUPABASE
// =====================
const supabaseUrl = "https://sonyehijeanzoccstnzr.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvbnllaGlqZWFuem9jY3N0bnpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1NTc4NTQsImV4cCI6MjA4NTEzMzg1NH0.sr4s9wikoDlvodcLw-RGGqHozrezwcSjfHlThv316aE";

const supabase = window.supabase.createClient(
  supabaseUrl,
  supabaseKey
);

// =====================
// UTILIDADES DE UI
// =====================
function setFeedback(msg, type) {
  const el = document.getElementById("feedback");
  el.className = type;
  el.innerText = msg;
}

function setLoading(loading) {
  const btn = document.getElementById("btnLogin");
  if (loading) {
    btn.classList.add("loading");
    btn.innerText = "Entrando...";
    btn.disabled = true;
  } else {
    btn.classList.remove("loading");
    btn.innerText = "Entrar";
    btn.disabled = false;
  }
}

// =====================
// LOGIN
// =====================
async function login() {
  setFeedback("", "");
  setLoading(true);

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    setFeedback("Preencha email e senha.", "error");
    setLoading(false);
    return;
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    // mensagens amigáveis
    if (error.message.includes("Invalid login credentials")) {
      setFeedback("Email ou senha incorretos.", "error");
    } else {
      setFeedback(error.message, "error");
    }
    setLoading(false);
    return;
  }

  setFeedback("Login realizado com sucesso!", "success");
  setLoading(false);

  // depois: window.location.href = "dashboard.html";
}

// =====================
// RESET DE SENHA
// =====================
async function resetarSenha() {
  setFeedback("", "");

  const email = document.getElementById("email").value;

  if (!email) {
    setFeedback("Digite seu email para redefinir a senha.", "error");
    return;
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    setFeedback(error.message, "error");
  } else {
    setFeedback("Email de redefinição enviado!", "success");
  }
}
