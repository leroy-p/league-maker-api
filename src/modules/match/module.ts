import { forwardRef, Module } from '@nestjs/common'

import { PrismaModule, PlayerModule } from '../../modules'
import { MatchService } from '../../services'

import { MatchResolver } from './resolver'

@Module({
  imports: [forwardRef(() => PrismaModule), forwardRef(() => PlayerModule)],
  providers: [MatchResolver, MatchService],
  exports: [MatchService],
})
export class MatchModule {}
