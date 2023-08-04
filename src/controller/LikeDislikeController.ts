import { BaseError } from "../errors/BaseError";
import { Request , Response } from "express";
import {  LikeDislikeDTO } from "../dtos/LikeDislikeDTO";
import { LikiDislikeBusiness } from "../business/LikeDislikeBusiness";

export class LikeDislikeController {
    constructor(
        private likiDislikeBusiness : LikiDislikeBusiness,
        private likeDislikeDTO : LikeDislikeDTO
    ){}

public editLikeDislike = async(req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const like = req.body.like;
        const token = req.headers.authorization;

        const input = this.likeDislikeDTO.editPostLikes(id, like, token);
        await this.likiDislikeBusiness.editLikeDislikeId(input);

        res.status(200).send("Like dado com sucesso");
    } catch (error) {
        console.log(error)

        if (error instanceof BaseError) {
            res.status(error.statusCode).send(error.message)
        } else {
            res.status(500).send("Erro inesperado")
        }
    }
}}