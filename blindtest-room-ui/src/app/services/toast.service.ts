import { Injectable } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  private showToast(id: string, cls: string, message: string) {
    const container = document.querySelector(`#${id}>.toast`);
    const classes = container?.classList;
    classes?.add(cls);
    const body = container?.querySelector('.toast-body');
    if (body) {
      body.textContent = message;
      container?.addEventListener('hidden.bs.toast', () => {
        classes?.remove(cls);
        body.textContent = '';
      }, { once: true });
    }
    if (container) {
      const toast = bootstrap.Toast.getOrCreateInstance(container);
      toast.show();
    }
  }

  public success(id: string, msg: string) {
    this.showToast(id, "text-bg-success", msg);
  }
  public error(id: string, msg: string) {
    this.showToast(id, "text-bg-danger", msg);
  }
}

