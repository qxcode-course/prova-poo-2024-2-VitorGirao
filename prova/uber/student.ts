import { timeStamp } from "console";

function input(): string { let X: any = input; X.L = X.L || require("fs").readFileSync(0).toString().split(/\r?\n/); return X.L.shift(); } // _TEST_ONLY_
//function input(): string { let X: any = input; X.P = X.P || require("readline-sync"); return X.P.question() } // _FREE_ONLY_
function write(text: any, endl="\n") { process.stdout.write("" + text + endl); }
export {};


class Pessoa{
    private nome: string;
    private dinheiro: number;

    constructor(nome: string, dinheiro: number){
        this.nome = nome;
        this.dinheiro = dinheiro;
    }
    setNome(value: string){
        this.nome = value;
    }
    setDinheiro(value: number){
        if(this.dinheiro <= 0){
            this.dinheiro = 0;
        }
        this.dinheiro += value;
    }
    getNome(): string{
        return this.nome;
    }
    getDinheiro(): number{
        return this.dinheiro;
    }

    toString(): string{
        return `${this.nome}:${this.dinheiro}`;
    }

}

class Moto{
    private custo: number;
    private motorista: Pessoa | null;
    private passageiro: Pessoa | null;

    constructor(){
        this.custo = 0;
        this.motorista = null;
        this.passageiro = null;
    }

    setMotorista(valor: Pessoa| null){
        this.motorista  = valor;
    
    }
    setPassageiro(valor: Pessoa | null){
        this.passageiro = valor;
    }
    setCusto(custo: number){
        this.custo += custo;
    }
    getMotorista(): Pessoa | null{
        return this.motorista;
    }
    getPassageiro(): Pessoa | null{
        return this.passageiro;
    }
    getCusto(): number{
        return this.custo;
    }

    public leavePass(): void{
        this.passageiro?.setDinheiro(-this.getCusto());
        if (this.passageiro?.getDinheiro() != null ){
            if (this.passageiro.getDinheiro() <= 0){
                console.log("fail: Passenger does not have enough money");
                this.passageiro?.setDinheiro(0);
            }
        }
        this.motorista?.setDinheiro(this.getCusto());
        console.log(this.getPassageiro() + " leave");
        this.setCusto(-this.getCusto());
        this.setPassageiro(null);
    }

    public drive(distancia: number): void{

        this.setCusto(distancia);
    }
    toString(): string {
        if(this.getMotorista() == null){

            return (`Cost: ${this.getCusto()}, Driver: None, Passenger: None`);  
        }
        if(this.getPassageiro() == null){

            return (`Cost: ${this.getCusto()}, Driver: ${this.getMotorista()}, Passenger: None`);  
        }
       return (`Cost: ${this.getCusto()}, Driver: ${this.getMotorista()}, Passenger: ${this.getPassageiro()}`);
    }
}


class Adapter {

    moto: Moto;

    constructor(){
        this.moto = new Moto();
    }
    setDriver(nome: string, dinheiro: number): void {
        this.moto.setMotorista(new Pessoa (nome, dinheiro));
    }

    setPassenger(nome: string, dinheiro: number): void {
        this.moto.setPassageiro(new Pessoa(nome, dinheiro));
    }

    drive(distancia: number): void {
        this.moto.drive(distancia);
    }

    leavePassenger(): void {
       this.moto.leavePass();
    }

    show(): void {
        console.log(this.moto.toString());
    }
}

function main(): void {
    let adapter: Adapter = new Adapter();
    while (true) {
        write("$", "");
        const line = input();
        const args = line.split(" ");
        write(line);

        if      (args[0] === "end"      ) { break;                                   }
        else if (args[0] === "setDriver") { adapter.setDriver(args[1], +args[2]);    }
        else if (args[0] === "setPass"  ) { adapter.setPassenger(args[1], +args[2]); }
        else if (args[0] === "drive"    ) { adapter.drive(+args[1]);                 }
        else if (args[0] === "leavePass") { adapter.leavePassenger();                }
        else if (args[0] === "show"     ) { adapter.show();                          }
        else                              { console.log("fail: command not found");  }
    }
    
}

export {Adapter};
main();