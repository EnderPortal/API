import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

/**
 * Contains player's game data
 */
@Entity()
export class Profile{

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({default : 0})
    coins: number;
    
}