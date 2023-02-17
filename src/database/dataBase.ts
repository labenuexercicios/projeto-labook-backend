
import { TUsers, TPosts, TLikes_dislikes } from "../types";


export const users : TUsers [] = [
    {
        id: "u011",
        name: "Juliana",
        email: "juli_29@gmail.com", 
        password: "juli_90", 
        role: "admin",
        created_at: "2023-02-03 11:00:00"
    },
    {
        id: "u012",
        name: "Bruno",
        email: "bruno_3@gmail.com", 
        password: "Bruno_*s=82", 
        role: "admin",
        created_at: "2023-02-03 11:00:00"
    },
    {
        id: "u013",
        name: "Layane",
        email: "layaney@gmail.com",
        password:  "layane5695/*m0",
        role: "admin",
        created_at: "2023-02-03 11:00:00"
    },
    {
        id: "u014",
        name: "Anderson",
        email: "thiagoricardo@gmail.com", 
        password: "thiagor-78.0",
        role: "admin",
        created_at: "2023-02-03 11:00:00"
    },
    {
        id: "u015",
        name: "Camila",
        email:  "camila12@gmail.com",
        password: "camila908i0u", 
        role: "admin",
        created_at: "2023-02-03 11:00:00"
    },
    {
        id: "u016",
        name: "leticia",
        email: "leticia89@gmail.com",
        password: "leticia89814", 
        role: "admin",
        created_at: "2023-02-03 11:00:00"
    },
    {
        id: "u017",
        name: "vinicius",
        email: "vinciius898@gmail.com",
        password: "vinicius754", 
        role: "admin",
        created_at: "2023-02-03 11:00:00"
    },
    {
        id: "u018",
        name: "manoel",
        email: "manoel90@gmail.com",
        password: "manoel67987", 
        role: "admin",
        created_at: "2023-02-03 11:00:00"
    },
    {
        id: "u019",
        name: "sabbath",
        email: "sabao@gmail.com", 
        password: "sabaosabbathwer",
        role: "admin",
        created_at: "2023-02-03 11:00:00"
    },
    {
        id: "u020",
        name: "ana", 
        email: "anahg@gmail.com", 
        password: "anahg756",  
        role: "admin",
        created_at: "2023-02-03 11:00:00"
    },
];

export const posts : TPosts [] = [
    {
        id: "c001",
        creator_id: "u001",
        content: "video de bicicleta",
        likes: 89,
        dislikes: 5,
        created_at: "2023-02-03 11:04:25",
        updated_at: "2023-02-03 11:44:32"
    },
    {
        id: "c002",
        creator_id: "u002",
        content: "foto pessoal",
        likes: 310,
        dislikes: 4,
        created_at: "2023-02-03 11:04:25",
        updated_at: "2023-02-03 11:44:32"
    },
    {
        id: "c003",
        creator_id:  "u003",
        content: "video de memes",
        likes: 125, 
        dislikes: 2,
        created_at: "2023-02-03 11:04:25",
        updated_at: "2023-02-03 11:44:32"
    },
    {
        id: "c004",
        creator_id: "u004",
        content: "video de códigos",
        likes: 65,
        dislikes: 5,
        created_at: "2023-02-03 11:04:25",
        updated_at: "2023-02-03 11:44:32"
    },
    {
        id: "c005",
        creator_id: "u005",
        content: "reels de viagens",
        likes: 210,
        dislikes: 3,
        created_at: "2023-02-03 11:04:25",
        updated_at: "2023-02-03 11:44:32"
    },
    {
        id: "c006",
        creator_id: "u006",
        content: "video de receita",
        likes: 75,
        dislikes: 3,
        created_at: "2023-02-03 11:04:25",
        updated_at: "2023-02-03 11:44:32"
    },
    {
        id: "c007",
        creator_id: "u007",
        content: "reels de futebol",
        likes: 99,
        dislikes: 8,
        created_at: "2023-02-03 11:04:25",
        updated_at: "2023-02-03 11:44:32"
    },
    {
        id: "c008",
        creator_id: "u008",
        content: "reels de carro",
        likes: 155,
        dislikes: 7,
        created_at: "2023-02-03 11:04:25",
        updated_at: "2023-02-03 11:44:32"
    },
    {
        id: "c009",
        creator_id: "u009",
        content: "foto de viagens",
        likes: 305,
        dislikes: 1,
        created_at: "2023-02-03 11:04:25",
        updated_at: "2023-02-03 11:44:32"
    },
    {
        id: "c010",
        creator_id: "u010",
        content: "video de futebol",
        likes: 87,
        dislikes: 09,
        created_at: "2023-02-03 11:04:25",
        updated_at: "2023-02-03 11:44:32"
    },
];

export const likes_dislikes : TLikes_dislikes [] = [
    {
        user_id: "u001",
        post_id: "p01",
        like: 89
    },
    {
        user_id: "u002",
        post_id: "p02",
        like: 310
    },
    {
        user_id: "u003",
        post_id: "p03",
        like: 125
    },
    {
        user_id: "u004",
        post_id: "p04",
        like: 65
    },
    {
        user_id: "u005",
        post_id: "p05",
        like: 210
    },
    {
        user_id: "u006",
        post_id: "u006",
        like: 75
    },
    {
        user_id: "u007",
        post_id: "p07",
        like: 99
    },
    {
        user_id: "u008", 
        post_id: "p08",
        like: 155
    },
    {
        user_id: "u009",
        post_id: "p09",
        like: 305
    },
    {
        user_id: "u010",
        post_id: "p10",
        like: 87
    },
];

