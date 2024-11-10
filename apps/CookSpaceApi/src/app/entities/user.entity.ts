import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User as UserGql } from '@apps/CookSpaceApi/src/graphql';

@Entity()
export class User extends UserGql {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 40 })
  email: string;

  @Column({ type: 'varchar' })
  password: string;
}
