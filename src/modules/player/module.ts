import { forwardRef, Module } from '@nestjs/common'

import { PrismaModule } from '../../modules'
import { PlayerService } from '../../services'

import { PlayerResolver } from './resolver'

@Module({
  imports: [forwardRef(() => PrismaModule)],
  providers: [PlayerResolver, PlayerService],
  exports: [PlayerService],
})
export class PlayerModule {}
