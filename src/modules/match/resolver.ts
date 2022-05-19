import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { forwardRef, Inject } from '@nestjs/common'

import {
  Match,
  MatchFindManyInput,
  MatchFindOneInput,
  MatchCreateInput,
  MatchUpdateInput,
  MatchDeleteInput,
  MatchUpdateScoreInput,
} from '../../graphql/schema'
import { PrismaService, MatchService } from '../../services'

@Resolver('Match')
export class MatchResolver {
  constructor(
    @Inject(forwardRef(() => MatchService)) private readonly MatchService: MatchService,
    @Inject(forwardRef(() => PrismaService)) private readonly ps: PrismaService
  ) {}

  @Query()
  matchFindOne(@Args('findOneInput') findOneInput: MatchFindOneInput): Promise<Match | undefined> {
    const { where } = findOneInput

    return this.ps.matchEntity.findFirst({ where, include: { player1: true, player2: true } })
  }

  @Query()
  matchFindMany(@Args('findManyInput') findManyInput: MatchFindManyInput): Promise<Match[]> {
    const { where } = findManyInput

    return this.ps.matchEntity.findMany({ where, include: { player1: true, player2: true } })
  }

  @Mutation()
  matchCreateOne(@Args('createInput') createInput: MatchCreateInput): Promise<Match> {
    return this.MatchService.create(createInput)
  }

  @Mutation()
  matchUpdateOne(@Args('updateInput') udpateInput: MatchUpdateInput): Promise<Match> {
    return this.MatchService.update(udpateInput)
  }

  @Mutation()
  matchDeleteOne(@Args('deleteInput') deleteInput: MatchDeleteInput): Promise<boolean> {
    return this.MatchService.delete(deleteInput)
  }

  @Mutation()
  matchDraw(): Promise<boolean> {
    return this.MatchService.draw()
  }

  @Mutation()
  matchUpdateScore(@Args('input') input: MatchUpdateScoreInput): Promise<Match> {
    return this.MatchService.updateScore(input)
  }
}
