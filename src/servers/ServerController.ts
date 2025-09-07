import { Controller, Get, UseGuards } from "@nestjs/common";
import { APIKeyGuard } from "src/authentification/api-key/APIKeyGuard";

@Controller("server")
export class ServerController{

    //TODO : créer le service :)

    /**
     * GET /ranks
     * 
     * retrieves grades, rite protect with KEY api
     * @returns the list of grades present
     */
    @UseGuards(APIKeyGuard)
    @Get("ranks")
    getAllRank(){
        return "DATA : ranks";
    }
}