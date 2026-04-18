// GET ALL USERS
export function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || {};
}

// SAVE NEW USER
export function saveUser(name, cls) {
  const users = getUsers();

  if (!users[name]) {
    users[name] = {
      class: cls,
      scores: []
    };
  }

  localStorage.setItem("users", JSON.stringify(users));
}

// SAVE SCORE
export function saveScore(name, score) {
  const users = getUsers();

  if (users[name]) {
    users[name].scores.push(score);
  }

  localStorage.setItem("users", JSON.stringify(users));
}
