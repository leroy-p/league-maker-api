import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { forwardRef, Inject } from '@nestjs/common'

import {
  Player,
  PlayerCreateInput,
  PlayerDeleteInput,
  PlayerFindManyInput,
  PlayerFindOneInput,
  PlayerUpdateInput,
} from '../../graphql/schema'
import { PrismaService, PlayerService } from '../../services'

@Resolver('Player')
export class PlayerResolver {
  constructor(
    @Inject(forwardRef(() => PlayerService)) private readonly PlayerService: PlayerService,
    @Inject(forwardRef(() => PrismaService)) private readonly ps: PrismaService
  ) {}

  @Query()
  playerFindOne(@Args('findOneInput') findOneInput: PlayerFindOneInput): Promise<Player | undefined> {
    const { where } = findOneInput

    return this.ps.playerEntity.findFirst({ where })
  }

  @Query()
  playerFindMany(@Args('findManyInput') findManyInput: PlayerFindManyInput): Promise<Player[]> {
    const { where } = findManyInput

    return this.ps.playerEntity.findMany({ where })
  }

  @Mutation()
  playerCreateOne(@Args('createInput') createInput: PlayerCreateInput): Promise<Player> {
    return this.PlayerService.create(createInput)
  }

  @Mutation()
  playerUpdateOne(@Args('updateInput') input: PlayerUpdateInput): Promise<Player> {
    return this.PlayerService.update(input)
  }

  @Mutation()
  playerDeleteOne(@Args('deleteInput') input: PlayerDeleteInput): Promise<boolean> {
    return this.PlayerService.delete(input)
  }
}
