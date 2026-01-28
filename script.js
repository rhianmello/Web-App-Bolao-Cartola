// 🔑 SUPABASE (DECLARADO UMA ÚNICA VEZ)
const supabase = window.supabase.createClient(
  "https://sonyehijeanzoccstnzr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvbnllaGlqZWFuem9jY3N0bnpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1NTc4NTQsImV4cCI6MjA4NTEzMzg1NH0.sr4s9wikoDlvodcLw-RGGqHozrezwcSjfHlThv316aE"
);

// ELEMENTOS (existem nas duas páginas)
const email = document.getElementById("email");
const password = document.getElementById("password");
const message = document.getElementById("message");
const loading = document.getElementById("loading");

// LOGIN
const btnLogin = document.getElementById("btnLogin");
if (btnLogin) {
  btnLogin.addEventListener("click", async () => {
    loading.textContent = "⏳ Entrando...";
    message.textContent = "";

    const { error } = await supabaseClient.auth.signInWithPassword({
      email: email.value,
      password: password.value
    });

    loading.textContent = "";

    if (error) {
      message.style.color = "red";
      message.textContent = "E-mail ou senha inválidos";
    } else {
      message.style.color = "lime";
      message.textContent = "Login realizado com sucesso!";
    }
  });
}

// CADASTRO
const btnRegister = document.getElementById("btnRegister");
if (btnRegister) {
  btnRegister.addEventListener("click", async () => {
    loading.textContent = "⏳ Criando conta...";
    message.textContent = "";

    const { error } = await supabaseClient.auth.signUp({
      email: email.value,
      password: password.value
    });

    loading.textContent = "";

    if (error) {
      message.style.color = "red";
      message.textContent = error.message;
    } else {
      message.style.color = "lime";
      message.textContent = "Conta criada! Verifique seu e-mail.";
    }
  });
}
