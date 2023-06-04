import { Request, Response } from "express";
import { LikeDislikeDTO } from "../dtos/LikeDislikeDTO";
import { LikeDislikeBusiness } from "../business/LikeDislikeBusiness";
import { BaseError } from "../errors/BaseError";

export class LikeDislikeController {
    constructor(
        private likiDislikeBusiness: LikeDislikeBusiness,
        private likeDislikeDTO: LikeDislikeDTO
    ) { }

    public editLikeDislike = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const { like } = req.body;
            const token = req.headers.authorization;

            const input = this.likeDislikeDTO.editPostLikes(id, like, token);
            await this.likiDislikeBusiness.editLikeDislikeId(input);

            res.status(200).send("Like dado com sucesso");
        } catch (error) {
            console.log(error);

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message);
            } else {
                res.status(500).send("Erro inesperado");
            }
        }
    };
}