import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/users/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from 'src/app/model/login';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{
  form:FormGroup;

  constructor(private formBuilder:FormBuilder, private userService: UsersService,private router: Router) { 
    this.form=this.formBuilder.group({
       email:["", [Validators.required]],
      password: ["", [Validators.required]]
    })
   }

   get email()
   {
    return this.form.get("email");
   }

   get password()
   {
    return this.form.get("password")
   }

  ngOnInit(): void {
  }

  

  login()  
  {
    if(this.form.valid)
    {
      const user = { email:this.form.get('email')?.value,
       password:this.form.get('password')?.value};

    this.userService.login(user).subscribe(data => {
      if (data.token!='' ){
        //seteamos las cookies con el valor del tocken y el perfil del usuario
        this.userService.setToken(data.token, data.nivel);
        this.router.navigateByUrl('layout1');
      }else {
        //mostrar por pantalla el mensaje de error
        console.log("usuario o pass no valido");
      }
        });
    
    this.router.navigateByUrl('layout1');
      }
    
}
}
