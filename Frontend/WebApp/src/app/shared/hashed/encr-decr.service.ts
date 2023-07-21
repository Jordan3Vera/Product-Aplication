import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncrDecrService {

  ///Método de encriptación

  set(keys: any, value: any){
    var key = CryptoJS.enc.Utf16.parse(keys);
    var iv = CryptoJS.enc.Utf16.parse(keys);

    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf16.parse(value.toString()), key,
    {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
  }

  //Método para desencriptar
  get(keys: any, value:any){
    var key = CryptoJS.enc.Utf16.parse(keys);
    var iv = CryptoJS.enc.Utf16.parse(keys);

    var descrypted = CryptoJS.AES.decrypt(value, key, 
    {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return descrypted.toString(CryptoJS.enc.Utf8);
  }
}
