import { forwardRef, Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'

import { GraphQLOptions } from './graphql/options'
import {
  PrismaModule,
  PlayerModule,
  MatchModule,
} from './modules'

@Module({
  imports: [
    forwardRef(() => GraphQLModule.forRoot(GraphQLOptions)),
    forwardRef(() => PrismaModule),
    forwardRef(() => PlayerModule),
    forwardRef(() => MatchModule),
  ],
  providers: [],
})
export class AppModule {}
