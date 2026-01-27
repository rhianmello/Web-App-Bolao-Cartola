//🔐 Conectar no Supabase
const supabaseUrl = "https://SUA_URL.supabase.co";
const supabaseKey = "SUA_CHAVE_PUBLICA";

const supabase = window.supabase.createClient(
  supabaseUrl,
  supabaseKey
);

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

