import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma, personas_naturales } from '@prisma/client';

@Injectable()
export class PersonaNaturalService {
  constructor(private readonly model: PrismaService) {}

  async create(
    personaNatural: Prisma.personas_naturalesCreateInput,
  ): Promise<personas_naturales> {
    return await this.model.personas_naturales.create({
      data: personaNatural,
    });
  }

  async findAll(filters): Promise<personas_naturales[]> {
    return await this.model.personas_naturales.findMany({
      where: {
        genero: filters.genero,
        municipio: {
          nombre: {
            contains: filters.municipio,
          },
          departamentos: {
            nombre: filters.departamento,
          },
        },
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

  async findByDui(dui: string) {
    return await this.model.personas_naturales.findUnique({
      where: {
        dui: dui,
      },
      include: {
        detalles_sufragio: true,
        municipio: {
          include: {
            departamentos: true,
          },
        },
      },
    });
  }

  async findByFilters(filters: any) {
    return await this.model.personas_naturales.findMany({
      where: {
        OR: [
          {
            genero: filters.genero,
          },
          {
            id_municipio: filters.id_municipio,
          },
        ],
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
  }
}
