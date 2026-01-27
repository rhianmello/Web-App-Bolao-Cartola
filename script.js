//🔐 Conectar no Supabase
const supabaseUrl = "https://SUA_URL.supabase.co";
const supabaseKey = "SUA_CHAVE_PUBLICA";

const supabase = window.supabase.createClient(
  supabaseUrl,
  supabaseKey
);

//🔐 FUNÇÃO DE CADASTRO (CRIA SENHA)
async function cadastrar() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
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

  // salva dados extras na tabela participants
  await supabase.from("participants").insert({
    id: data.user.id,
    team_name: teamName,
    cpf: cpf,
    whatsapp: whatsapp,
    cartola_team_id: 0
  });

  alert("Cadastro criado! Agora é só entrar.");
}


//🔑 LOGIN
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert("Erro no login");
    return;
  }

  document.getElementById("login").style.display = "none";
  document.getElementById("dashboard").style.display = "block";

  carregarTabela();
}

//📊 LISTAR PARTICIPANTES + STATUS

async function carregarTabela() {
  const { data } = await supabase
    .from("payments")
    .select("status, participants(team_name)");

  let html = "";

  data.forEach(p => {
    html += `
      <tr>
        <td>${p.participants.team_name}</td>
        <td class="${p.status === 'PAGO' ? 'pago' : 'aguardando'}">
          ${p.status}
        </td>
      </tr>
    `;
  });

  document.getElementById("tabela").innerHTML = html;
}

//💸 PIX (VERSÃO SIMPLES)
function gerarPix() {
  alert("Aqui vai abrir o QR Code PIX (Mercado Pago)");
}

