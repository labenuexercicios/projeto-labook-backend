import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { BaseError } from "../errors/BaseError";
import { GetProductsSchema } from "../dtos/Post/getPosts.dto";

export class PostController {
  constructor(private postBusiness: PostBusiness) {}
  public getPosts = async (req: Request, res: Response) => {
    try {
      const input = GetProductsSchema.parse({
        q: req.query.q,
        token: req.headers.authorization,
      });

      const output = await this.postBusiness.getPosts(input);

      res.status(200).send(output);
    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };
  public createPost = async (
    input: CreateProductInputDTO
  ): Promise<CreateProductOutputDTO> => {
    // const { id, name, price } = input
    const { name, price, token } = input;

    const payload = this.tokenManage.getPayload(token);

    if (payload === null) {
      throw new Error("Você não esta logado");
    }

    if (payload.role !== USER_ROLES.ADMIN) {
      throw new BadRequestError("você não é admin");
    }

    // const productDBExists = await this.productDatabase.findProductById(id)

    // if (productDBExists) {
    //   throw new BadRequestError("'id' já existe")
    // }

    const id = this.idGenerator.generate();

    const newProduct = new Product(id, name, price, new Date().toISOString());

    const newProductDB = newProduct.toDBModel();
    await this.productDatabase.insertProduct(newProductDB);

    const output: CreateProductOutputDTO = {
      message: "Producto cadastrado com sucesso",
      product: newProduct.toBusinessModel(),
    };

    return output;
  };
}
