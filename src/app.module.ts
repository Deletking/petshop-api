/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BackofficeModule } from 'src/modules/backoffice/backoffice.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://Deletking:dq8c0yuEEnzE9nI4@cluster0.xdjbk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'),
    BackofficeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
