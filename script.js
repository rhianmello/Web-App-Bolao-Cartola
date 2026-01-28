// ⛔ MUITO IMPORTANTE: troque pelos dados reais
const supabaseUrl = "https://SUA_URL.supabase.co";
const supabaseKey = "SUA_CHAVE_PUBLICA";

// cria o client DEPOIS do SDK carregar
const supabase = window.supabase.createClient(
  supabaseUrl,
  supabaseKey
);

// =====================
// CONTROLE DE TELAS
// =====================
function mostrarCadastro() {
  document.getElementById("login-box").style.display = "none";
  document.getElementById("cadastro-box").style.display = "block";
}

function mostrarLogin() {
  document.getElementById("cadastro-box").style.display = "none";
  document.getElementById("login-box").style.display = "block";
}

// =====================
// LOGIN
// =====================
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

  document.getElementById("login-box").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
}

// =====================
// CADASTRO
// =====================
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

  alert("Cadastro criado! Agora faça login.");
  mostrarLogin();
}

// =====================
// RESET DE SENHA (EMAIL)
// =====================
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

// =====================
// LOGOUT
// =====================
async function logout() {
  await supabase.auth.signOut();
  location.reload();
}
