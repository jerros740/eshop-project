import { User } from "./user"

export class Item {
    title: string = '';
    description: string = '';
    price: string = '';
    username: string = '';
    date: string;
    id: number = -1;
    base64Image: string | ArrayBuffer | null = '';
    hidden: boolean = false;
    hasBeenBought: boolean = false;
    boughtBy: string = '';
    boughtOn: string = "";
    validated: boolean = true;
    lastUpdated: string = "";
    category: string = "";
    status: string = "wait";

    constructor() {
        const date = new Date();
        const isoString = date.toISOString();
        const dateParts = isoString.split('T');
        const timeParts = dateParts[1].split('.');
        this.date = dateParts[0] + ' ' + timeParts[0];
        this.lastUpdated = this.date;
    }
}
