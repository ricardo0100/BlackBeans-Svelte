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
 * @param {string} id
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

/**
 * @param {string} name
 * @param {string} color
 * @param {string} icon
 */
export async function postNewCategory(name, color, icon) {
  const body = JSON.stringify({ name: name, color: color, icon: icon, lastSavedTime: 0, createdTime: 0, isActive: true });
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  const config = {
    method: "POST",
    body: body,
    headers: headers,
  };

  const response = await fetch("/api/categories", config);
  return await response.json();
}

/**
 * @param {string} id
 * @param {any} name
 * @param {any} color
 * @param {any} icon
 */
export async function putExistingCategory(id, name, color, icon) {
  const body = JSON.stringify({ name: name, color: color, icon: icon, lastSavedTime: 0, createdTime: 0, isActive: true });
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  const config = {
    method: "PUT",
    body: body,
    headers: headers,
  };

  const response = await fetch("/api/category/" + id, config);
  return await response.json();
}


// Items

export async function getItems() {
  const res = await fetch("/api/items");
  return await res.json();
}

/**
 * @param {string} name
 * @param {number} value
 * @param {number} accountId
 * @param {number} categoryId
 * @param {boolean} isCredit
 */
export async function postItem(name, value, accountId, categoryId, isCredit) {
  const body = JSON.stringify(
    {
      name: name,
      value: value,
      accountId: accountId,
      categoryId: categoryId,
      lastSavedTime: 0,
      createdTime: 0,
      effectivationTime: 0,
      isActive: true,
      isCredit: isCredit
    });
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  const config = {
    method: "POST",
    body: body,
    headers: headers,
  };

  const response = await fetch("/api/items", config);
  return await response.json();
}

/**
 * @param {number} id
 * @param {string} name
 * @param {number} value
 * @param {number} accountId
 * @param {number} categoryId
 * @param {boolean} isCredit
 */
export async function putItem(id, name, value, accountId, categoryId, isCredit) {
  const body = JSON.stringify(
    {
      name: name,
      value: value,
      accountId: accountId,
      categoryId: categoryId,
      lastSavedTime: 0,
      createdTime: 0,
      effectivationTime: 0,
      isActive: true,
      isCredit: isCredit
    });
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  const config = {
    method: "PUT",
    body: body,
    headers: headers,
  };

  const response = await fetch("/api/item/" + id, config);
  return await response.json();
}

/**
 * @param {number} item_id
 */
export async function deleteItem(item_id) {
  const config = {
    method: "DELETE"
  };

  const response = await fetch("/api/item/" + item_id, config);
  if (response.status == 200) {
    return true;
  }
  return false;
}
