import { dbTest } from "../../adapters/_test_/tools/dbTest";
import { NodeMailerGateway } from "../../adapters/gateways/NodeMailerGateway";
import { SqlUserRepository } from "../../adapters/repositories/SQL/SqlUserRepository";
import { SqlUserMapper } from "../../adapters/repositories/mappers/SqlUserMapper";
import { SendEmail } from "../../core/usecases/User/SendEmail";
import { eventEmitter } from "../../messages/EventEmitter";
import { UserCreated } from "../../messages/user/UserCreated";

const userMapper = new SqlUserMapper();

const userRepository = new SqlUserRepository(dbTest, userMapper);
const emailGateway = new NodeMailerGateway();

const sendEmail = new SendEmail(userRepository, emailGateway);

eventEmitter.on("user_created", async (event: UserCreated) => {
  const { id, email, username } = event.props;

  await sendEmail.execute({
    id,
    email,
    username,
  });
});
