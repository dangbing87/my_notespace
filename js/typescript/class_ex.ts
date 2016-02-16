class Bottle {
    public width: number;
    public height: number;

    constructor(width: number, hight: number) {
            this.width = width;
            this.height = hight;
        }
}



class RedBottle extends Bottle {
    private color: string = "red";

    get colorname(): string {
            return this.color;
    }

    set colorname(color: string) {
        this.color = color;
    }
}

var redBottle = new RedBottle(12, 12);
redBottle.colorname;
