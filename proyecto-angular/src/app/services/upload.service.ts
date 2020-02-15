import {Injectable} from '@angular/core';
import { Global } from './global';

@Injectable()
export class UploadService{
    public url: string;

    constructor(){
        this.url = Global.url;
    }

    makeFileRequest(url: string, params: Array<string>, files: Array<File>, name: string){

        //Creamos una promesa
        return new Promise(function(resolve, reject){
            //Simular un formulario
            var formData:any = new FormData();
            var xhr = new XMLHttpRequest(); //xhr sinonimo de ajax, XMLHttpRequest peticion asincrona

            for (var i = 0; i < files.length; i++) {
                //adjuntando los archivos
                formData.append(name, files[i], files[i].name);
            }

            //ajax
            xhr.onreadystatechange = function(){
                if (xhr.readyState == 4) { // 4 valor por defecto
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                }else{
                    console.log('Se produjo un error');
                    reject(xhr.response);
                }
            }
        }

            //Peticion post
            xhr.open('POST', url, true); //true para que haga la peticion
            xhr.send(formData);
        });
    }
}