import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    /**
     * Automatically generated unique identifier
     */
    @PrimaryGeneratedColumn()
    id: number;
    
    /**
     * Player's nickname, it is unique
     */
    @Column({unique: true})
    username: string;

    /**
     * Password : hashed with bcrypt
     */
    @Column()
    password: string;

}