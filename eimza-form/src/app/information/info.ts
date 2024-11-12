export class Customer {
  firstName: string;
  lastName: string;
  tcno: string;
  email: string;
  telefon: string;
  serino: string;
  birth: string;
  uyruk: number = 1000000000;
  birthloc: string;
  secword: string;
  pazarlamaizni: number = 1;
  telefonizni: number = 1;
  epostaizni: number = 1;
  smsizni: number = 1;
  teslimatadres: string;
  teslimatil: string;
  teslimatilce: string;
  setYear: string;
  message: string;

  constructor(data: any) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.tcno = data.tcno;
    this.email = data.email;
    this.telefon = data.telefon;
    this.serino = data.serino;
    this.birth = data.birth.split("-").reverse().join(".");
    this.birthloc = data.birthloc;
    this.secword = data.lastName;
    this.teslimatadres = data.teslimatadres;
    this.teslimatil = data.teslimatil;
    this.teslimatilce = data.teslimatilce;
    this.setYear = data.setYear;
    this.message = data.message;
  }

  //customer model
}
