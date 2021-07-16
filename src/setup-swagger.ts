import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

import { version } from '../package.json';

export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('API')
    .setVersion(version)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  if (process.env.NODE_ENV === 'development') {
    fs.writeFileSync('./swagger-spec.json', JSON.stringify(document));
  }
  SwaggerModule.setup('api', app, document);
}
