import { Request, Response } from "express";

import { StatusCodes } from "http-status-codes";

import UserRepository from "../repositories/user.repository";
import IUser from "../models/user.model";

import JWT from "../repositories/jwt.repository";

const token = new JWT();

const repository = new UserRepository();

export default class UserController {
  getAllUsers = async (req: Request, res: Response) => {
    try {
      res.status(StatusCodes.OK).json(await repository.getAllUsers());
    } catch (error) {
      console.log(error);
      res.status(StatusCodes.BAD_REQUEST).json({ message: error });
    }
  };

  createUser = async (req: Request, res: Response) => {
    try {
      const props: IUser = req.body;

      if ((await repository.checkIfEmailIsValid(props.email)) === 0) {
        if (
          (await repository.createUser({
            name: props.name,
            email: props.email,
            password: props.password,
            role: props.role as "admin" | "regular",
          })) == 1
        ) {
          const id = await repository.getUserId(props.email);

          console.log(id);

          const tkn = token.createToken(id);

          if (tkn) {
            return res
              .status(StatusCodes.CREATED)
              .json({ message: "Usuário criado com sucesso!", token: tkn });
          }

          return res
            .status(StatusCodes.CONFLICT)
            .json({ message: "Algum erro ocorreu!" });
        }
        return res
          .status(StatusCodes.CONFLICT)
          .json({ message: "Algum erro ocorreu!" });
      }

      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: `Email  ${props.email} já foi cadastrado!` });
    } catch (error) {
      console.log(error);
      res.status(StatusCodes.BAD_REQUEST).json({ message: error });
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const props: IUser = req.body;
      const id = req.params.id;

      const update = repository.updateUser({
        id: parseInt(id),
        name: props.name,
        email: props.email,
        password: props.password,
      });

      if (update == 1) {
        return res.status(StatusCodes.OK).json({
          message: `Usuário ${props.name} com id ${id} foi atualizado com sucesso!`,
        });
      }

      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Problema ao atualizar o usuário!" });
    } catch (error) {
      console.log(error);
      res.status(StatusCodes.BAD_REQUEST).json({ message: error });
    }
  };

  loginUSer = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const login = await repository.loginUserByEmailAndPassword(
        email,
        password
      );

      if (login == 1) {
        const id = await repository.getUserId(email);
        const tkn = token.createToken(id);
        return res
          .status(StatusCodes.OK)
          .json({ message: "Logado com sucesso!", token: tkn });
      }

      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Usuário não encontrado" });
    } catch (error) {
      console.log(error);
      res.status(StatusCodes.CONFLICT).json({ message: error });
    }
  };

  deleteUser = (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const deleted = repository.deletUserById(parseInt(id));

      if (deleted == 1) {
        return res
          .status(StatusCodes.OK)
          .json({ message: "Usuário deleteado!" });
      }

      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: "Algum erro ocorreu!" });
    } catch (error) {
      console.log(error);
      res.status(StatusCodes.CONFLICT).json({ message: error });
    }
  };
}
