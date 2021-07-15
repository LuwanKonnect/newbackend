import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { version } from '../package.json';
import * as fs from 'fs';

export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('API')
    .setVersion(version)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  fs.writeFileSync('./swagger-spec.json', JSON.stringify(document));
  if (process.env.NODE_ENV === 'development') {
    console.log('ha');
  //   fs.writeFileSync('./swagger-spec.json', JSON.stringify(document));
  }
  SwaggerModule.setup('api', app, document);
}
