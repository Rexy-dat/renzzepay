
document.getElementById("sendBtn")?.addEventListener("click", () => {
  const targetNumber = document.getElementById("targetNumber").value;
  const bug = document.getElementById("bug-type").value;
  fetch("/api/crash", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ targetNumber })
  })
  .then(res => res.json())
  .then(data => alert(data.message))
  .catch(err => alert("Crash failed!"));
});
