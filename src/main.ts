import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ConfigService } from "@nestjs/config"
import { ValidationPipe } from "@nestjs/common"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  const port = configService.getOrThrow("PORT")
  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .setTitle("Nest.Js Assessment")
    .addBearerAuth()
    .setDescription("Nest.Js Assessment API documentation")
    .setVersion("v1")
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("/", app, document, {
    swaggerOptions: {
      tagsSorter: "alpha",
      operationsSorter: "alpha"
    },
    customSiteTitle: "Nest.Js Assessment API documentation"
  })
  await app.listen(Number(port))
}
bootstrap()
