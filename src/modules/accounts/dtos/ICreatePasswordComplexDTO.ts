interface IPasswordComplexDTO {
  id?: string;
  qtt_characters: number;
  qtt_uppercase_characters: number;
  qtt_lowercase_characters: number;
  qtt_numeral_characters: number;
  qtt_special_characters: number;
}

export { IPasswordComplexDTO };
