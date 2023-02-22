import { type } from "os";
import { PostModel } from "../interfaces/types";

export interface SignupInputDTO {
  name: unknown;
  email: unknown;
  password: unknown;
}

export interface SignupOutputDTO {
  token: string;
}

export interface LoginInputDTO {
  email: unknown;
  password: unknown;
}

export interface LoginOutputDTO {
  token: string
}

export interface SignupOutputDTO {
  token: string;
}

export interface GetPostsInputDTO {
  token: string | undefined;
}

export type GetPostsOutputDTO = PostModel[];

export interface CreatePostInputDTO {
  token: string | undefined;
  content: unknown
}

export interface EditPostInputDTO {
  idToEdit: string;
  token: string | undefined;
  content: unknown;
}

export interface DeletePostInputDTO {
  idToDelete: string;
  token: string | undefined;
}

export interface LikeOrDislikePostInputDTO {
  idToLikeOrDislike: string;
  token: string | undefined;
  like: unknown;
}
