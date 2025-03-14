import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertService } from '../services/alert.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { LeadService } from '../services/lead.service';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [provideNgxMask()],
})
export class HomeComponent {

  stepAtual = "step1";
  exibirSenha: boolean = false;

  /* Define qual step aparece na tela */
  definirStep(step: string) {
    this.stepAtual = step;
  }


  /* Esse método confirma se o nome e o whatsapp foram preenchidos corretamente antes de poder avançar ao próximo step */
  avancarStep2(): void {  

    const nomeValido = this.validarFormControl('nome');
    const whatsappValido = this.validarFormControl('whatsapp');
    if (nomeValido && whatsappValido) {
      this.leadForm.markAsUntouched();
      this.stepAtual = 'step2';
    } else {
      this.leadForm.markAllAsTouched(); 
      this.alertService.exibirAvisoCampoObrigatorio(); /* Aciona o service que vai abrir a janela avisando que tem que preencher os campos */
    }
  }

  avancarStep3(): void {

    
    const empresaValido = this.validarFormControl('empresa');
    const segmentoValido = this.validarFormControl('segmento');
    const cargoValido = this.validarFormControl('cargo');
    if (empresaValido && segmentoValido && cargoValido) {
      this.leadForm.markAsUntouched();
      this.stepAtual = 'step3';

    } else {
      this.leadForm.markAllAsTouched();
      this.alertService.exibirAvisoCampoObrigatorio();
    }

  }

  voltarStep(step: string) {
    this.stepAtual = step;
  }

  leadForm: FormGroup
  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private leadService: LeadService,
  ) {
    /* Faz a interpolação com os inputs do form Html e coloca o preenchimento dos inputs como obrigatórios */
    this.leadForm = this.fb.group({
      nome: ['', [Validators.required]],
      whatsapp: ['', [Validators.required, Validators.minLength(10)]],
      empresa: ['', [Validators.required]],
      segmento: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]


    })
  }

  /* Ao clicar no botão Enviar esse método confirma se o e-mail e a senha preenchidos pelo usuário são válidos para poder enviar */
  enviar (): void {

    const emailValido = this.validarFormControl('email');
    const senhaValido = this.validarFormControl('senha');
    if (emailValido && senhaValido) {

      alert('gravou lead')

      
      
      this.leadService.gravarLead(this.leadForm.value);
      
      

    } else {
      this.leadForm.markAllAsTouched();
      this.alertService.exibirAvisoCampoObrigatorio();
    }





  }

  /* Função que verifica se o que o usuário digitou no campo input é válido */
  validarFormControl(nomeControle: string): boolean {
    return this.leadForm.controls[nomeControle].valid;
  }

  /* Função que verifica se os campos foram preenchidos corretamente, caso seja false faz os campos ficaram vermelhos */
  invalidarFormControl(nomeControle: string): boolean {
    return this.leadForm.controls[nomeControle].invalid && (this.leadForm.controls[nomeControle].touched);
  }
}
