import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express";
import { join } from 'path';
import methodOverride from 'method-override';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(methodOverride('_method'));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
