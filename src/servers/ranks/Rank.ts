import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rank{

    /**
     * Automatically generated unique identifier
     */
    @PrimaryGeneratedColumn()
    id: number;
    
    /**
     * Role name (it's unique)
     */
    @Column({unique: true})
    name: string;
    
    /**
     * Role prefix, display in minecraft chat
     */
    @Column()
    prefix: string;

    //TODO : liste de permissions ?
}