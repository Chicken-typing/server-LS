import executeDBScript from "../config/database";
class UserModel {
  async getUser() {
    try {
      const q = " Select * from users ";
      const result = await executeDBScript(q)
        .then((res) => {
          return res;
        })
        .catch(() => {
          return "Invalid user.";
        });
      return result;
    } catch (err) {
      console.log("Error in getting the user: ", err);
    }
  }
}
export default new UserModel();
