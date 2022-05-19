import { forwardRef, Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'

import { GraphQLOptions } from './graphql/options'
import {
  PrismaModule,
  PlayerModule,
  MatchModule,
  MockModule,
} from './modules'

@Module({
  imports: [
    forwardRef(() => GraphQLModule.forRoot(GraphQLOptions)),
    forwardRef(() => PrismaModule),
    forwardRef(() => PlayerModule),
    forwardRef(() => MatchModule),
    forwardRef(() => MockModule),
  ],
  providers: [],
})
export class AppModule {}
