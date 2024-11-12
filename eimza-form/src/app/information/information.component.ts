import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {Customer} from "./info";

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})

export class InformationComponent {
  constructor(private http: HttpClient) {
  }

  eimza(form: NgForm) {
    // E-imza başvuru formundaki bilgiler alınıyor.
    const customer: Customer = new Customer(form.value);
    // İşlem yapmak için statik olarak tanımlanan email adresi.
    const companyRefId: string = "";

    // Kimin başvuru linkine tıklandığını tespit etmek amacıyla URL'de bulunan belirteci yakalanıyor.
    const queryString = window.location.search;
    const queryParams = new URLSearchParams(queryString);
    const userRefId = queryParams.get('ref');

    //request datası oluşturuluyor
    const requestData: any = {
      firstName: customer.firstName.trim().toLocaleUpperCase("TR"),
      lastName: customer.lastName.trim().toLocaleUpperCase("TR"),
      tcno: customer.tcno.toString(),
      email: customer.email.trim(),
      telefon: customer.telefon.toString().slice(-10),
      serino: customer.serino.trim(),
      birth: customer.birth,
      uyruk: customer.uyruk.toString(),
      birthloc: customer.birthloc.trim(),
      secword: customer.lastName.trim().toLocaleUpperCase("TR"),
      pazarlamaizni: customer.pazarlamaizni.toString(),
      telefonizni: customer.telefonizni.toString(),
      epostaizni: customer.epostaizni.toString(),
      smsizni: customer.smsizni.toString(),
      teslimatadres: customer.teslimatadres.trim(),
      teslimatil: customer.teslimatil.trim(),
      teslimatilce: customer.teslimatilce.trim(),
      setYear: customer.setYear,
      message: customer.message.trim(),
      companyRefId: companyRefId,
    }

    //userRefId varsa request datasına ekleniyor.
    if (userRefId) {
      requestData.userRefId = userRefId;
    }

    //request datası gönderiliyor ve hataya göre işlem yapılıyor.
    this.http.post<any>("https://apiimza.sisteminiz.com.tr/orderCreate", requestData).subscribe(
      (res) => {
        //başarılı başvuru kısmı
        const errorElements = document.querySelectorAll(".error");
        errorElements.forEach(errorElement => errorElement.remove());
        alert("Egüven başvurunuz başarı ile alındı.");
        form.resetForm();
      }, errors => {
        if (errors.error.error) {
          //sunucu hatası kısmı
          alert(errors.error.error + "\n HATA");
        } else {
          //form doldurulma hatası kısmı
          const errorElements = document.querySelectorAll(".error");
          errorElements.forEach(errorElement => errorElement.remove());

          for (const error of errors.error.errors) {
            const element = document.getElementById(error.input) as HTMLInputElement;
            const errorElement = document.createElement("div");
            errorElement.classList.add("error");
            errorElement.innerText = error.message;
            element.insertAdjacentElement("afterend", errorElement);
          }
        }
      }
    )
  }
}
