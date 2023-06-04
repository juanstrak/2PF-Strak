import { AppComponent } from "src/app/app.component"
import { LoginComponent } from "./login.component";
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import {  MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { PipesModule } from "src/app/shared/pipes/pipes.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthService } from "../../services/auth.service";
import { TestBed } from '@angular/core/testing';

describe('Pruebas del LoginComponent', () =>{
    let component: LoginComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                LoginComponent
            ],
            imports: [
                BrowserAnimationsModule,
                HttpClientModule,
                ReactiveFormsModule,
                PipesModule,
                MatFormFieldModule,
                MatInputModule,
                RouterTestingModule,

            ]
        }).compileComponents();

        const fixture= TestBed.createComponent(LoginComponent);

        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Si el campo gmail esta vacio el FormControl del email debe ser invalido', () => {
        component.loginForm.setValue({ email: null, password: null})

        expect(component.emailControl.invalid).toBeTrue();
    });
    it('Si el campo password esta vacio el FormControl del email debe ser invalido', () => {
        component.loginForm.setValue({ email: null, password: null})

        expect(component.emailControl.invalid).toBeTrue();
    });
    it('Si el loginForm es invalido, debe marcar todos los controles como touched', () => {
        component.loginForm.setValue({ email: null, password: null})
        const spyOnMarkAllAsTouched = spyOn(component.loginForm, 'markAllAsTouched');

        component.onSubmit();

        expect(component.emailControl.touched).toBeTrue();
        expect(component.passwordControl.touched).toBeTrue();
        expect(spyOnMarkAllAsTouched).toHaveBeenCalled();
    });
    it('Si el loginForm es validateHorizontalPosition, debe llamar al metodo login del AuthService',() => {
        component.loginForm.setValue({ email: 'test@gmail.com', password: '123456'});

        const spyOnAuthServiceLogin = spyOn(TestBed.inject(AuthService), 'login');

        component.onSubmit();

        expect(component.loginForm.valid).toBeTrue();
        expect(spyOnAuthServiceLogin).toHaveBeenCalled();
    })
});