import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { forwardRef, Inject } from '@nestjs/common'

import { Player, PlayerFindOneInput } from '../../graphql/schema'
import { PrismaService, PlayerService } from '../../services'

@Resolver('Player')
export class PlayerResolver {
  constructor(
    @Inject(forwardRef(() => PlayerService)) private readonly PlayerService: PlayerService,
    @Inject(forwardRef(() => PrismaService)) private readonly ps: PrismaService
  ) {}

  @Query()
  playerFindOne(@Args('input') input: PlayerFindOneInput): Promise<Player | undefined> {
    const { where } = input

    return this.PlayerService.findOne(input)
  }

  @Query()
  playerGetLeaderboard(): Promise<Player[]> {
    return this.PlayerService.getLeaderboard()
  }
}
