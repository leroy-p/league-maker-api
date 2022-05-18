import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { PlayerEntity } from '@prisma/client'

import {
  PlayerFindOneInput,
  PlayerFindManyInput,
  PlayerCreateInput,
  PlayerUpdateInput,
  PlayerDeleteInput,
} from '../../graphql/schema'
import { PrismaService } from '../../services'

@Injectable()
export class PlayerService {
  constructor(
    @Inject(forwardRef(() => PrismaService)) private readonly ps: PrismaService
  ) {}

  async findAll(): Promise<PlayerEntity[]> {
    return this.ps.playerEntity.findMany({ include: { matches1: true, matches2: true } })
  }

  async create(createInput: PlayerCreateInput): Promise<PlayerEntity> {
    const Player = await this.ps.playerEntity.create({
      data: {
        ...createInput,
      },
    })

    return this.ps.playerEntity.findUnique({ where: { id: Player.id }, include: { matches1: true, matches2: true } })
  }

  async update(updateInput: PlayerUpdateInput): Promise<PlayerEntity> {
    const { uuid, ...updateInputRest } = updateInput

    const Player = await this.ps.playerEntity.findUnique({ where: { uuid }, rejectOnNotFound: true })

    await this.ps.playerEntity.update({
      where: { id: Player.id },
      data: {
        ...updateInputRest,
      },
    })

    return this.ps.playerEntity.findUnique({ where: { id: Player.id }, include: { matches1: true, matches2: true } })
  }

  async delete(deleteInput: PlayerDeleteInput): Promise<boolean> {
    const { uuid } = deleteInput

    await this.ps.playerEntity.delete({ where: { uuid } })

    return true
  }
}
