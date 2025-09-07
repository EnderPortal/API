import { Controller, Get, UseGuards } from "@nestjs/common";
import { APIKeyGuard } from "src/authentification/api-key/APIKeyGuard";
import { RankService } from "./ranks/RankService";

@Controller("server")
export class ServerController{

    constructor(private rankService : RankService){}

    /**
     * GET /ranks
     * 
     * retrieves grades, rite protect with KEY api
     * @returns the list of grades present
     */
    @UseGuards(APIKeyGuard)
    @Get("ranks")
    getAllRank(){
        return this.rankService.findAll();
    }
}