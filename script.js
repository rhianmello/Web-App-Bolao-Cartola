// 🔐 SUPABASE
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  const SUPABASE_URL = "https://sonyehijeanzoccstnzr.supabase.co",
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvbnllaGlqZWFuem9jY3N0bnpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1NTc4NTQsImV4cCI6MjA4NTEzMzg1NH0.sr4s9wikoDlvodcLw-RGGqHozrezwcSjfHlThv316aE"
)
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


const form = document.getElementById("authForm");
const resetBtn = document.getElementById("reset");


form.addEventListener("submit", async (e) => {
e.preventDefault();


const email = document.getElementById("email").value;
const password = document.getElementById("password").value;


// 1. tenta login
const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
email,
password,
});


if (!loginError) {
window.location.href = "dashboard.html";
return;
}


// 2. tenta cadastro
const { error: signUpError } = await supabase.auth.signUp({
email,
password,
});


if (signUpError) {
alert("Erro ao autenticar");
} else {
alert("Se for seu primeiro acesso, verifique o e-mail para confirmar.");
}
});


resetBtn.addEventListener("click", async () => {
const email = document.getElementById("email").value;
if (!email) return alert("Digite o e-mail");


await supabase.auth.resetPasswordForEmail(email, {
redirectTo: window.location.origin + "/reset.html",
});


alert("Se existir, enviamos o e-mail de redefinição.");
});
</script>


// ELEMENTOS
const emailEl = document.getElementById("email");
const passwordEl = document.getElementById("password");
const messageEl = document.getElementById("message");
const loadingEl = document.getElementById("loading");

// HELPERS
function setLoading(text = "") {
  loadingEl.textContent = text;
}

function showError(text) {
  messageEl.style.color = "red";
  messageEl.textContent = text;
}

function showSuccess(text) {
  messageEl.style.color = "lime";
  messageEl.textContent = text;
}

// LOGIN
async function login() {
  setLoading("⏳ Entrando...");
  messageEl.textContent = "";

  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY
    },
    body: JSON.stringify({
      email: emailEl.value,
      password: passwordEl.value
    })
  });

  const data = await res.json();
  setLoading("");

  if (!res.ok) {
    showError("E-mail ou senha inválidos");
  } else {
    showSuccess("Login realizado com sucesso!");
    console.log("SESSION:", data);
  }
}

// CADASTRO
async function register() {
  setLoading("⏳ Criando conta...");
  messageEl.textContent = "";

  const res = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY
    },
    body: JSON.stringify({
      email: emailEl.value,
      password: passwordEl.value
    })
  });

  const data = await res.json();
  setLoading("");

  if (!res.ok) {
    showError(data.error_description || "Erro ao cadastrar");
  } else {
    showSuccess("Conta criada! Verifique seu e-mail.");
  }
}

// RESET SENHA
async function resetPassword() {
  if (!emailEl.value) {
    showError("Informe seu e-mail");
    return;
  }

  setLoading("📩 Enviando e-mail...");

  const res = await fetch(`${SUPABASE_URL}/auth/v1/recover`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY
    },
    body: JSON.stringify({ email: emailEl.value })
  });

  setLoading("");

  if (!res.ok) {
    showError("Erro ao enviar e-mail");
  } else {
    showSuccess("E-mail de redefinição enviado!");
  }
}
