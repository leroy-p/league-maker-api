import shell from 'shelljs'
import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common'

import { PrismaService, PlayerService, MatchService } from '../../services'
import { env } from '../../env'
import { defaultPlayers } from './data/players'

@Injectable()
export class MockService {
  private logger: Logger
  
  constructor(
    @Inject(forwardRef(() => PrismaService)) private readonly ps: PrismaService,
    @Inject(forwardRef(() => PlayerService)) private readonly playerService: PlayerService,
    @Inject(forwardRef(() => MatchService)) private readonly matchService: MatchService
  ) {}

  async createDefault(): Promise<boolean> {    
    await Promise.all(defaultPlayers.map((createInput) => this.playerService.create({ ...createInput })))

    return await this.matchService.draw()
  }
}
