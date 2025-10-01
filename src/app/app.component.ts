import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbiteService } from './core/services/flowbite/flowbite.service';
import { NgxSpinnerComponent, NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { LoadingService } from './core/services/loading/loading.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerModule,NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Mutqin';
  private loadingSub?: Subscription;

  constructor(
    private flowbiteService: FlowbiteService,
    private spinner: NgxSpinnerService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      console.log('Flowbite initialized:', flowbite);
    });

    this.loadingSub = this.loadingService.isLoading().subscribe((isLoading) => {
      if (isLoading) {
        this.spinner.show('loading-1');
      } else {
        this.spinner.hide('loading-1');
      }
    });
  }

  ngOnDestroy(): void {
    this.loadingSub?.unsubscribe();
  }
}
