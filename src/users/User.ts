import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile/Profile";
import { Rank } from "src/servers/ranks/Rank";

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

    /**
     * Rank id : Rank of the user
     */
    @ManyToOne(() => Rank)
    @JoinColumn()
    rank: Rank;
}