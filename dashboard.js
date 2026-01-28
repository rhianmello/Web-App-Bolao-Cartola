<script type="module">
import { createClient } from "https://esm.sh/@supabase/supabase-js";


const supabase = createClient(
"https://sonyehijeanzoccstnzr.supabase.co",
"SUA_ANON_PUBLIC_KEY_AQUI"
);


const { data: { user } } = await supabase.auth.getUser();
if (!user) window.location.href = "index.html";


const { data, error } = await supabase
.from("users")
.select("email, pagou");


const tbody = document.getElementById("users");
data.forEach(u => {
const tr = document.createElement("tr");
tr.innerHTML = `<td>${u.email}</td><td>${u.pagou ? "✅" : "❌"}</td>`;
tbody.appendChild(tr);
});
</script>


<!-- ================= BANCO (SUPABASE SQL) ================= -->
<!--
create table users (
id uuid references auth.users on delete cascade,
email text,
pagou boolean default false,
primary key (id)
);
-->
