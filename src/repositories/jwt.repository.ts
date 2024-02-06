import jwt from "jsonwebtoken";

export default class JWT {
  createToken = (id: number) => {
    try {
      const token = jwt.sign({ id: id }, "senha_segura", { expiresIn: "10m" });

      return token;
    } catch (error) {
      console.log(error);
    }
  };
}
