// User

export async function getUser() {
  const res = await fetch("/api/user");
  return await res.json();
}


// Other

export async function getColors() {
  const res = await fetch("/api/available-colors");
  const data = await res.json();
  return data.colors;
}

export async function getIcons() {
  const res = await fetch("/api/available-icons");
  const data = await res.json();
  return data.icons;
}


// Accounts

export async function getAccounts() {
  const res = await fetch("/api/accounts");
  return await res.json();
}

/**
   * @param {string} name
   * @param {any} color
   */
export async function postNewAccount(name, color) {
  const body = JSON.stringify({ name: name, color: color, lastSavedTime: 0, createdTime: 0, isActive: false });
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  const config = {
    method: "POST",
    body: body,
    headers: headers,
  };

  const response = await fetch("/api/accounts", config);
  return await response.json();
}

/**
 * * @param {integer} id
   * @param {string} name
   * @param {any} color
   */
export async function putExistingAccount(id, name, color) {
  const body = JSON.stringify({ name: name, color: color, lastSavedTime: 0, createdTime: 0, isActive: true });
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  const config = {
    method: "PUT",
    body: body,
    headers: headers,
  };

  const response = await fetch("/api/account/" + id, config);
  return await response.json();
}


// Categories

export async function getCategories() {
  const res = await fetch("/api/categories");
  return await res.json();
}