import { AppDataSource } from "../database/data-source";
import IUser from "../models/user.model";

import * as crypto from "crypto";

const userRepository = AppDataSource.getRepository("user");

export default class UserRepository {
  getAllUsers = () => {
    return userRepository.find({
      order: {
        id: "ASC",
      },
    });
  };

  createUser = async (user: IUser) => {
    try {
      const hash = crypto
        .createHash("sha256")
        .update(user.password)
        .digest("hex");

      userRepository.insert({
        name: user.name,
        email: user.email,
        password: hash,
        role: user.role,
      });

      return 1;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  checkIfEmailIsValid = (email: string): Promise<number> => {
    try {
      return userRepository.count({
        where: {
          email: email,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  updateUser = (user: IUser) => {
    try {
      const hash = crypto
        .createHash("sha256")
        .update(user.password)
        .digest("hex");

      userRepository.update(user.id, {
        name: user.name,
        email: user.email,
        password: hash,
      });

      return 1;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  getUserId = async (email: string) => {
    try {
      const user = await userRepository.find({ where: { email: email } });
      if (user && user.length > 0 && user[0].id) {
        return user[0].id as number;
      } else {
        console.log(`Nenhum usuário encontrado para o e-mail: ${email}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  loginUserByEmailAndPassword = async (email: string, password: string) => {
    try {
      const hash = crypto.createHash("sha256").update(password).digest("hex");

      const login = await userRepository.find({
        where: {
          email: email,
          password: hash,
        },
      });

      return login.length;
    } catch (error) {
      console.log(error);
    }
  };

  deletUserById = (id: number) => {
    try {
      userRepository.delete({
        where: {
          id: id,
        },
      });

      return 1;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };
}
