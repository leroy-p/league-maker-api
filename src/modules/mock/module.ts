import { forwardRef, Module } from '@nestjs/common'

import { PrismaModule, PlayerModule, MatchModule } from '../../modules'
import { MockService } from '../../services'

import { MockResolver } from './resolver'

@Module({
  imports: [forwardRef(() => PrismaModule), forwardRef(() => PlayerModule), forwardRef(() => MatchModule)],
  providers: [MockResolver, MockService],
  exports: [MockService],
})
export class MockModule {}
