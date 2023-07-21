import { Component, OnInit, Inject } from '@angular/core';
import { AuthenticateService } from '../../../shared/auth/authenticate.service';
import { Title } from '@angular/platform-browser';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Router } from '@angular/router';
import { IStore } from '../../../shared/models/interface/store.interface';
import { MenuItem } from 'primeng/api';
import { StoreService } from '../../../shared/service/store.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private page: Title) { }

  ngOnInit(): void {
    this.page.setTitle("Home");
  }
}
