import { Mutation, Resolver } from '@nestjs/graphql'
import { forwardRef, Inject } from '@nestjs/common'

import { PrismaService, MockService } from '../../services'

@Resolver('Mock')
export class MockResolver {
  constructor(
    @Inject(forwardRef(() => MockService)) private readonly MockService: MockService,
    @Inject(forwardRef(() => PrismaService)) private readonly ps: PrismaService
  ) {}

  @Mutation()
  mockCreateDefault(): Promise<boolean> {
    return this.MockService.createDefault()
  }
}
