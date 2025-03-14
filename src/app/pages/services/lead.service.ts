import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Lead } from '../../interfaces/lead.interface';

@Injectable({
  providedIn: 'root'
})
export class LeadService {

  constructor() { }

  gravarLead (lead: Lead) {

    console.log(lead);
  }
}
