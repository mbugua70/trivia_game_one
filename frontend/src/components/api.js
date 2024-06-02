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
    console.log(data);
    throw {
      message: data.error,
    };
  }
  return data;
}

// getting all question

export async function getQuestions() {
  const res = await fetch("http://localhost:4040/api/questions");

  if (!res.ok) {
    throw {
      message: "Failed to fetch questions",
      // statusText: res.statusText,
      // status: res.status
    };
  }

  console.log(res);
  const data = await res.json();
  return data;
}

// getting colors

export async function getColors() {
  const res = await fetch("http://localhost:4040/api/colors");

  if (!res.ok) {
    throw {
      message: "Failed to fetch colors",
      // statusText: res.statusText,
      // status: res.status
    };
  }

  console.log(res);
  const data = await res.json();
  return data;
}

export const fetchData = async () => {
  const [colors, questions] = await Promise.all([getColors(), getQuestions()]);
  return { colors, questions };
};