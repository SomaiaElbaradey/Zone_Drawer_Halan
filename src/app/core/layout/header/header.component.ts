import { AuthStore } from 'app/auth/auth.store';
import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  currentLang!: string;
  DistributorsServices: string[] = [
    'Gas Store',
    'Customer Statements',
  ];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public auth: AuthStore,
    private router: Router,
    public translate: TranslateService) { }

  ngOnInit(): void {
    this.currentLang = localStorage.getItem('currentLang') || 'en';
    console.log("🚀 ~ file: header.component.ts ~ line 30 ~ HeaderComponent ~ ngOnInit ~ this.currentLang", this.currentLang)
  }

  changeCurrentLang(lang: string) {
    this.currentLang = lang;
    this.translate.use(lang);
    localStorage.setItem('currentLang', lang)
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50) {
      document.getElementById('zone-header')?.classList.add('fixed-header');
    } else {
      document.getElementById('zone-header')?.classList.remove('fixed-header');
    }
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
