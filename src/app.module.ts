import { forwardRef, Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'

import { GraphQLOptions } from './graphql/options'
import {
  PrismaModule,
  PlayerModule,
} from './modules'

@Module({
  imports: [
    forwardRef(() => GraphQLModule.forRoot(GraphQLOptions)),
    forwardRef(() => PrismaModule),
    forwardRef(() => PlayerModule),
  ],
  providers: [],
})
export class AppModule {}
