const c_users = [];

// joins the user to the specific chatroom
function join_User(id) {
  const p_user = { id };

  c_users.push(p_user);
  console.log(c_users, "users");

  return p_user;
}

console.log("user out", c_users);

// Gets a particular user id to return the current user
function get_Current_User(id) {
  return c_users.find((p_user) => p_user.id === id);
}

// called when the user leaves the chat and its user object deleted from array
function user_Disconnect() {
  return c_users
}

module.exports = {
  join_User,
  get_Current_User,
  user_Disconnect,
};
