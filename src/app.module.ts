import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UsersModule } from "./users/users.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env.dev", ".env"]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: "mysql",
        host: configService.getOrThrow("DB_HOST"),
        database: configService.getOrThrow("DB_NAME"),
        port: Number(configService.getOrThrow("DB_PORT")),
        username: configService.getOrThrow("DB_USERNAME"),
        password: configService.getOrThrow("DB_PASSWORD"),
        autoLoadEntities: true,
        synchronize: true
      })
    }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
