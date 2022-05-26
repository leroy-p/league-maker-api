import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { forwardRef, Inject } from '@nestjs/common'

import { Match, MatchUpdateScoreInput } from '../../graphql/schema'
import { MatchService } from '../../services'

@Resolver('Match')
export class MatchResolver {
  constructor(
    @Inject(forwardRef(() => MatchService)) private readonly MatchService: MatchService
  ) {}

  @Query()
  matchGetResults(): Promise<Match[][]> {
    return this.MatchService.getResults()
  }

  @Mutation()
  matchUpdateScore(@Args('input') input: MatchUpdateScoreInput): Promise<Boolean> {
    return this.MatchService.updateScore(input)
  }
}
