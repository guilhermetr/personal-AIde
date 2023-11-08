export class Category {
    id?: number;
    name: string;    
    isCustom?: boolean;
    constructor(name: string, isCustom: boolean = false, id?: number) {
        if (id) 
            this.id = id;        
        this.name = name;
        this.isCustom = isCustom;        
    }
}