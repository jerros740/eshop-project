import { UserService } from "../services/user.service";
import { Item } from "./item";

export class User {
    username: string = 'Guest';
    password: string = '';
    firstname: string = '';
    lastname: string = '';
    mail: string = '';
    admin : boolean = false;
    adress: string =''
    favorites: number[] = []
    
    constructor() {}
}
