export async function loginUser(creds) {
  const res = await fetch("http://localhost:4040/api/players/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
  });
  const data = await res.json();
  if (!res.ok) {
    throw {
      message: data.error,
    };
  }
  return data;
}
