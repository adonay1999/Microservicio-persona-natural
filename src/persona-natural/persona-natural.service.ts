import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma, personas_naturales } from '@prisma/client';

@Injectable()
export class PersonaNaturalService {
  constructor(
    private readonly model: PrismaService,
  ) {}

  async create(
    personaNatural: Prisma.personas_naturalesCreateInput,
  ): Promise<personas_naturales> {
    return await this.model.personas_naturales.create({
      data: personaNatural,
    });
  }

  async findAll(): Promise<personas_naturales[]> {
    return await this.model.personas_naturales.findMany({
      select: {
        id_persona_natural: true,
        dui: true,
        nombres: true,
        apellidos: true,
        genero: true,
        detalle_direccion: true,
        fecha_nacimiento: true,
        id_municipio: true,
        fecha_vencidmiento_dui: true,
        creado_en: true,
      },
    });
  }

  async findOne(id: number): Promise<personas_naturales> {
    const personas_naturales = await this.model.personas_naturales.findUnique({
      where: {
        id_persona_natural: id,
      },
      include: {
        municipio: {
          select: {
            id_municipio: true,
            nombre: true,
            departamentos: {
              select: {
                id_departamento: true,
                nombre: true,
              },
            },
          },
        },
      },
    });

    return personas_naturales;
  }
}
