import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Rank } from "./Rank";
import { Repository } from "typeorm";

@Injectable()
export class RankService{

    constructor(
        @InjectRepository(Rank) private rankRepo : Repository<Rank>,
    ){}

    /**
     * Recover a grade via its ID
     * @param id rank id
     * @returns Rank or null
     */
    async findById(id : number) : Promise<Rank | null>{
        return this.rankRepo.findOne({where : {id}})
    }

    async findAll() : Promise<Rank[] | null>{
        return this.rankRepo.find();
    }
}