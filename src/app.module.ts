import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketRequestModule } from './ticket-request/ticket-request.module';
import { Indicador4Module } from './indicador4/indicador4.module'; 
import { TicketRequest } from './ticket-request/ticket-request';
import { Indicador7Module } from './indicador7/indicador7.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'mysql',
      password: 'mysql',
      database: 'satis_v1',
      entities: [TicketRequest],
      synchronize: true,
    }),
    TicketRequestModule,
    Indicador4Module,
    Indicador7Module,    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
