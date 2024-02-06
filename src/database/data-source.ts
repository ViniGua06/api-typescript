import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

import { CreateUsersTable1706911055985 } from "./migration/1706911055985-CreateUsersTable";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "	babar.db.elephantsql.com",
  port: 5432,
  username: "mcamunnx",
  password: "AsLli0_1AiEHz5P5C20OHBHnDPOCOX8W",
  database: "mcamunnx",
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [CreateUsersTable1706911055985],
  subscribers: [],
});
