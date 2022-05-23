import { forwardRef, Inject, Injectable } from '@nestjs/common'

import { PrismaService, MatchService } from '../../services'
import { defaultPlayers } from './data/players'

@Injectable()
export class MockService {  
  constructor(
    @Inject(forwardRef(() => PrismaService)) private readonly ps: PrismaService,
    @Inject(forwardRef(() => MatchService)) private readonly matchService: MatchService
  ) {}

  async createDefault(): Promise<boolean> {    
    await Promise.all(defaultPlayers.map((createInput) => this.ps.playerEntity.create({ data: { ...createInput } })))

    return await this.matchService.draw()
  }
}
