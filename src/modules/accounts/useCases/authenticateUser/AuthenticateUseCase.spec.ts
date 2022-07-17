import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { PasswordComplexInMemory } from "@modules/accounts/repositories/in-memory/PasswordComplexInMemory";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { AuthenticateUserUseCase } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let passwordComplexRepository: PasswordComplexInMemory;
let iMailProvider: MailProviderInMemory;

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let dateProvider: DayJsDateProvider;

describe("Authenticate User", () => {
  beforeEach(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayJsDateProvider();
    iMailProvider = new MailProviderInMemory();

    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider
    );
    passwordComplexRepository = new PasswordComplexInMemory();

    await passwordComplexRepository.create({
      qtt_characters: 0,
      qtt_lowercase_characters: 0,
      qtt_numeral_characters: 0,
      qtt_special_characters: 0,
      qtt_uppercase_characters: 0,
    });

    createUserUseCase = new CreateUserUseCase(
      usersRepositoryInMemory,
      passwordComplexRepository,
      iMailProvider,
      usersTokensRepositoryInMemory,
      dateProvider
    );
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "00123",
      email: "teste@testeme.com",
      password: "1234",
      name: "User Test",
    };

    await createUserUseCase.execute(user);

    const activatedUser = await usersRepositoryInMemory.findByEmail(user.email);
    activatedUser.is_active = true;
    await usersRepositoryInMemory.create(activatedUser);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("shold not be able to authenticate an noneexistent user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "1234",
      })
    ).rejects.toEqual(new AppError("Email or Password incorrect", 401));
  });

  it("shold not be able to authenticate with incorret password", async () => {
    const user: ICreateUserDTO = {
      driver_license: "00123",
      email: "teste@testeme.com",
      password: "1234",
      name: "User Test",
    };

    await createUserUseCase.execute(user);
    const activatedUser = await usersRepositoryInMemory.findByEmail(user.email);
    activatedUser.is_active = true;
    await usersRepositoryInMemory.create(activatedUser);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: "12345",
      })
    ).rejects.toEqual(new AppError("Email or Password incorrect", 401));
  });

  it("shold not be able to authenticate with account disabled", async () => {
    const user: ICreateUserDTO = {
      driver_license: "00123",
      email: "teste@testeme.com",
      password: "1234",
      name: "User Test",
    };
    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: user.password,
      })
    ).rejects.toEqual(
      new AppError(
        "Your account has not yet been activated, please check your email inbox.",
        401
      )
    );
  });
});
