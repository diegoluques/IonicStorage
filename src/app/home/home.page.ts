import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user = { id: "", nome: "", token: "" }
  id: string;
  nome: string;
  email: string;
  storageName: string;

  constructor(private storage: StorageService) { }

  setStorage() {
    if (this.validatorsInput()) {
      this.storage.setObject('user', {
        id: this.id,
        nome: this.nome,
        email: this.email
      });
      this.clearInputs();
      this.getStorage()
    }
    else {
      console.log('Preenchas todos os campos')
    }

  }

  getStorage() {
    this.storage.getString('user').then((data: any) => {
      if (data.value) {
        this.storageName = data.value;
      }
    });
    this.storage.getObject('user').then((data: any) => {
      this.user = data;
    });
  }

  clearStorage() {
    this.storage.clear();
    this.clearInputs();
  }

  clearInputs() {
    this.id = "";
    this.nome = "";
    this.email = "";
    this.storageName = ""
  }

  validatorsInput(): boolean {
    let status = true

    if (this.id === "") {
      status = false
    }
    if (this.nome === "") {
      status = false
    }
    if (this.email === "") {
      status = false
    }

    return status
  }

}
