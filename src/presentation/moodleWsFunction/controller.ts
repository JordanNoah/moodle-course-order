import { Request, Response } from "express";
import {MoodleWsFunctionRepository} from "../../domain/repositories/moodleWsFunction.repository";
import {RegisterMoodleWsFunctionDto} from "../../domain/dtos/registerMoodleWsFunction.dto";
import {UpdateMoodleWsFunctionDto} from "../../domain/dtos/updateMoodleWsFunction.dto";

export class MoodleWsFunctionController {
    constructor(
        private readonly moodleWsFunctionRepository:MoodleWsFunctionRepository
    ) {}

    createMoodleWsFunction = (req: Request, res:Response) => {
        const [error, registerMoodleWsFunctionDto] = RegisterMoodleWsFunctionDto.create(req.body)
        if (error) return res.status(400).json({error})
        this.moodleWsFunctionRepository.register(registerMoodleWsFunctionDto!).then((moodleWsFunction) => {
            res.json(moodleWsFunction)
        }).catch((error) => {
            res.status(500).json(error)
        })
    }

    update = (req: Request, res:Response) => {
        const [error,updateMoodleWsFunctionDto] = UpdateMoodleWsFunctionDto.create(req.body)
        if (error) return res.status(400).json({error})
        this.moodleWsFunctionRepository.update(updateMoodleWsFunctionDto!).then((moodleWsFunction) => {
            res.json(moodleWsFunction)
        }).catch((error) => {
            res.status(500).json(error)
        })
    }

    getById = (req: Request, res:Response) => {
        this.moodleWsFunctionRepository.getById(Number(req.params.id)).then((moodleWsFunction) => {
            res.json(moodleWsFunction)
        }).catch((error) => {
            res.status(500).json(error)
        })
    }

    getByAbbreviation = (req: Request, res:Response) => {
        this.moodleWsFunctionRepository.getByAbbreviation(req.params.abbr).then((moodleWsFunctions) => {
            res.json(moodleWsFunctions)
        }).catch((error) => {
            res.status(500).json(error)
        })
    }

    getAll = (req: Request, res:Response) => {
        this.moodleWsFunctionRepository.getAll().then((moodleWsFunctions) => {
            res.json(moodleWsFunctions)
        }).catch((error) => {
            res.status(500).json(error)
        })
    }

    deleteById = (req: Request, res:Response) => {
        this.moodleWsFunctionRepository.deleteById(Number(req.params.id)).then((moodleWsFunction) => {
            res.json(moodleWsFunction)
        }).catch((error) => {
          res.status(500).json(error)
        })
    }

    deleteByAbbreviation = (req: Request, res:Response) => {
        this.moodleWsFunctionRepository.deleteByAbbreviation(req.params.abbr).then((moodleWsFunction) => {
            res.json(moodleWsFunction)
        }).catch((error) => {
            res.status(500).json(error)
        })
    }
}