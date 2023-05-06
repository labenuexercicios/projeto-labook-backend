export interface PostDB {
  id: string;
  content: string;
  likes: number;
  deslikes: number;
  created_at: string;
  updated_at: string;
  creator_id: string;
}
export interface UserDB {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: string;
}

export interface PostModel {
  id: string;
  content: string;
  likes: number;
  deslikes: number;
  createdAt: string;
  updatedAt: string;
  creatorId: string;
}
export interface UserModel {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}
export interface LikeDeslikeDB {
  user_id: string;
  post_id: string;
  like: number;
}
export interface LikeDeslikeModel {
  userId: string;
  postId: string;
  like: number;
}
export interface TokenPayload {
  id: string;
  name: string;
}
