import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("password_complex")
class PasswordComplex {
  @PrimaryColumn()
  id: string;

  @Column()
  qtt_characters: number;

  @Column()
  qtt_uppercase_characters: number;

  @Column()
  qtt_lowercase_characters: number;

  @Column()
  qtt_numeral_characters: number;

  @Column()
  qtt_special_characters: number;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { PasswordComplex };
