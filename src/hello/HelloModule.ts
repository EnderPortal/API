import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HelloController } from "./HelloController";

@Module({
  imports: [],
  controllers: [HelloController],
  providers: [],
})
export class HelloModule {}
