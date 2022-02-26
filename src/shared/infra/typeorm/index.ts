import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (host = "database_ignite"): Promise<Connection> => {
  const defaultOpitions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOpitions, {
      host,
    })
  );
};
