import { IPasswordComplexRepository } from "../modules/accounts/repositories/IPasswordComplexRespository";

export const passwordComplexFnc = async (
  passwordComplexRepository: IPasswordComplexRepository,
  password: string
) => {
  const passwordComplex = await passwordComplexRepository.getOne();

  if (!passwordComplex) {
    return null;
  }

  const newPasswordComplex = {
    qtt_characters: passwordComplex.qtt_characters
      ? Number(passwordComplex.qtt_characters)
      : 0,
    qtt_uppercase_characters: passwordComplex.qtt_uppercase_characters
      ? Number(passwordComplex.qtt_uppercase_characters)
      : 0,
    qtt_lowercase_characters: passwordComplex.qtt_lowercase_characters
      ? Number(passwordComplex.qtt_lowercase_characters)
      : 0,
    qtt_numeral_characters: passwordComplex.qtt_numeral_characters
      ? Number(passwordComplex.qtt_numeral_characters)
      : 0,
    qtt_special_characters: passwordComplex.qtt_special_characters
      ? Number(passwordComplex.qtt_special_characters)
      : 0,
  };

  const qtt_characters_password = password.length;

  const qtt_special_characters_password =
    // eslint-disable-next-line no-useless-escape
    (password.match(/[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g) || []).length;

  const qtt_uppercase_characters_password =
    password.length - password.replace(/[A-Z]/g, "").length;

  const qtt_lower_characters_password =
    password.length - password.replace(/[a-z]/g, "").length;

  const qtt_numeral_characters_password = password.replace(
    /[^0-9]/g,
    ""
  ).length;

  if (
    qtt_characters_password >= newPasswordComplex.qtt_characters &&
    qtt_special_characters_password >=
      newPasswordComplex.qtt_special_characters &&
    qtt_uppercase_characters_password >=
      newPasswordComplex.qtt_uppercase_characters &&
    qtt_lower_characters_password >=
      newPasswordComplex.qtt_lowercase_characters &&
    qtt_numeral_characters_password >= newPasswordComplex.qtt_numeral_characters
  ) {
    return null;
  }

  return `Senha Inválida! sua senha precisa ter no mínimo o tamanho de ${newPasswordComplex.qtt_characters} caracteres com ${newPasswordComplex.qtt_uppercase_characters} letras maiúsculas, ${newPasswordComplex.qtt_lowercase_characters} letras minúsculas, ${newPasswordComplex.qtt_special_characters} caracteres especiais e  ${newPasswordComplex.qtt_numeral_characters} números `;
};
