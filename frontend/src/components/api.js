export async function loginUser(creds) {
  const res = await fetch("http://localhost:3000/customer_registration", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
  });
  const data = await res.json();
  if (!res.ok) {
    throw {
      message: data.message,
      statusText: res.statusText,
      status: res.status,
    };
  }
  return data;
}

export async function surveyForm(test) {
  const storeOne = localStorage.getItem("Auth");
  const storeTwo = JSON.parse(storeOne);
  const userId = storeTwo.user._id;
  const res = await fetch("http://localhost:3000/customer_report", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-ID": userId,
      // Adjust the content type if necessary
    },
    body: JSON.stringify(test),
  });
  const data = await res.json();
  if (!res.ok) {
    throw {
      message: data.message,
      statusText: res.statusText,
      status: res.status,
    };
  }
  return data;
}

export async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

export async function getUserData() {
  await sleep(1000);
  const storeOne = localStorage.getItem("Auth");
  const storeTwo = JSON.parse(storeOne);
  const userResult = storeTwo.user;
  return userResult;
}