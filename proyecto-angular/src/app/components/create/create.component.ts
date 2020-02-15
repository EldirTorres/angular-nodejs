import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {

  public title: string;
  public project: Project;
  public save_project;
  public status: string;
  public filesToUpload: Array<File>;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService
  ) {
    this.title = "Crear proyecto";
    this.project = new Project('', '', '', '', 2019, '', '');
  }

  ngOnInit() {
  }

  onSubmit(form) {
    /* console.log(this.project); */
    /* Guardar los datos */
    this._projectService.saveProject(this.project).subscribe(
      response => {
        /* console.log(response); */
        if (response.project) {
          /* Subir la imagen */
          /* 
          parametros que recibe:
          1) url
          2) endpoint del metodo
          3) id
          4) parametros opcionales
          5) archivos a subir
          6) nombre que espera recibir el backend para procesar

          makeFileRequest(Global.url+"upload-image"+response.project._id, [], this.filesToUpload, 'image')
           */
          if (this.filesToUpload) {
            this._uploadService.makeFileRequest(Global.url + "upload-image/" + response.project._id, [], this.filesToUpload, 'image')
              .then((result: any) => {

                console.log(result);
                this.save_project = result.project;

                this.status = 'success';
                form.reset();
              });
          } else {
            this.save_project = response.project;
            this.status = 'success';
            form.reset();
          }

        } else {
          this.status = 'failed';
        }
      },
      error => {
        console.error(<any>error);
      }
    );//subscribe() permite devolver lo que devuelva el api
  }

  fileChageEvent(fileInput: any) {
    console.log(fileInput);
    this.filesToUpload = <Array<File>>fileInput.target.files;// <Array <File>> casteo
  }

}
