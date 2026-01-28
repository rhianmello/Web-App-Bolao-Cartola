const supabaseUrl = "https://sonyehijeanzoccstnzr.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvbnllaGlqZWFuem9jY3N0bnpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1NTc4NTQsImV4cCI6MjA4NTEzMzg1NH0.sr4s9wikoDlvodcLw-RGGqHozrezwcSjfHlThv316aE";

const supabase = window.supabase.createClient(
  supabaseUrl,
  supabaseKey
);

// LOGIN
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return;
  }

  alert("Login realizado!");
  // window.location.href = "dashboard.html";
}

// CADASTRO
async function cadastrar() {
  const email = document.getElementById("email_cadastro").value;
  const password = document.getElementById("password_cadastro").value;

  const teamName = document.getElementById("team_name").value;
  const cpf = document.getElementById("cpf").value;
  const whatsapp = document.getElementById("whatsapp").value;

  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return;
  }

  await supabase.from("participants").insert({
    id: data.user.id,
    team_name: teamName,
    cpf,
    whatsapp
  });

  alert("Conta criada! Faça login.");
  window.location.href = "index.html";
}

// RESET SENHA
async function resetarSenha() {
  const email = document.getElementById("email").value;

  if (!email) {
    alert("Digite seu email primeiro");
    return;
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    alert(error.message);
  } else {
    alert("Email de redefinição enviado!");
  }
}
