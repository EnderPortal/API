import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile/Profile";

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
     * Mail, it is unique
     */
    @Column({unique: true})
    mail: string;

    /**
     * Password : hashed with bcrypt
     */
    @Column()
    password: string;

    /**
     * Profile : game data player
     */
    @OneToOne(() => Profile, { cascade: true })
    @JoinColumn()
    profile: Profile;
}