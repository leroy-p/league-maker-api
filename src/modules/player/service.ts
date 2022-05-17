import { forwardRef, Inject, Injectable } from '@nestjs/common'

import {
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

  async create(createInput: PlayerCreateInput) {
    const Player = await this.ps.playerEntity.create({
      data: {
        ...createInput,
      },
    })

    return this.ps.playerEntity.findUnique({ where: { id: Player.id } })
  }

  async update(updateInput: PlayerUpdateInput) {
    const { uuid, ...updateInputRest } = updateInput

    const Player = await this.ps.playerEntity.findUnique({ where: { uuid }, rejectOnNotFound: true })

    await this.ps.playerEntity.update({
      where: { id: Player.id },
      data: {
        ...updateInputRest,
      },
    })

    return this.ps.playerEntity.findUnique({ where: { id: Player.id } })
  }

  async delete(deleteInput: PlayerDeleteInput): Promise<boolean> {
    const { uuid } = deleteInput

    await this.ps.playerEntity.delete({ where: { uuid } })

    return true
  }
}
