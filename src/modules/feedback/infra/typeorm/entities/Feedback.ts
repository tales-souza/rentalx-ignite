import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("feedback")
class Feedback {
  @PrimaryColumn()
  id: string;

  @Column()
  type: string;

  @Column()
  comment: string;

  @Column()
  screenshot?: string;

  @CreateDateColumn()
  created_at: string;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Feedback };
