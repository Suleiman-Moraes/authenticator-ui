import { Component, OnInit } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

  model: any[] = [];

  constructor(public layoutService: LayoutService) { }

  ngOnInit() {
    this.model = [
      {
        label: 'Home',
        items: [
          { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/pages'] }
        ]
      },
      {
        label: 'Administração',
        items: [
          { label: 'Pessoas', icon: 'pi pi-fw pi-id-card', routerLink: ['/pages/person'] }
        ]
      },
      {
        label: 'UI Components',
        items: [
          { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/demo/uikit/formlayout'] },
          { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/demo/uikit/input'] },
          { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/demo/uikit/floatlabel'] },
          { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/demo/uikit/invalidstate'] },
          { label: 'Button', icon: 'pi pi-fw pi-box', routerLink: ['/demo/uikit/button'] },
          { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/demo/uikit/table'] },
          { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/demo/uikit/list'] },
          { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/demo/uikit/tree'] },
          { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/demo/uikit/panel'] },
          { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/demo/uikit/overlay'] },
          { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/demo/uikit/media'] },
          { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/demo/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },
          { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/demo/uikit/message'] },
          { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/demo/uikit/file'] },
          { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/demo/uikit/charts'] },
          { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/demo/uikit/misc'] }
        ]
      },
      {
        label: 'Prime Blocks',
        items: [
          { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['/demo/blocks'], badge: 'NEW' },
          { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank' },
        ]
      },
      {
        label: 'Utilities',
        items: [
          { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['/demo/utilities/icons'] },
          { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank' },
        ]
      },
      {
        label: 'Pages',
        icon: 'pi pi-fw pi-briefcase',
        items: [
          {
            label: 'Landing',
            icon: 'pi pi-fw pi-globe',
            routerLink: ['/demo/landing']
          },
          {
            label: 'Auth',
            icon: 'pi pi-fw pi-user',
            items: [
              {
                label: 'Login',
                icon: 'pi pi-fw pi-sign-in',
                routerLink: ['/auth2/login']
              },
              {
                label: 'Login 2',
                icon: 'pi pi-fw pi-sign-in',
                routerLink: ['/pages/free/login']
              },
              {
                label: 'Error',
                icon: 'pi pi-fw pi-times-circle',
                routerLink: ['/auth2/error']
              },
              {
                label: 'Access Denied',
                icon: 'pi pi-fw pi-lock',
                routerLink: ['/auth2/access']
              }
            ]
          },
          {
            label: 'Crud',
            icon: 'pi pi-fw pi-pencil',
            routerLink: ['/demo/pages2/crud']
          },
          {
            label: 'Timeline',
            icon: 'pi pi-fw pi-calendar',
            routerLink: ['/demo/pages2/timeline']
          },
          {
            label: 'Not Found',
            icon: 'pi pi-fw pi-exclamation-circle',
            routerLink: ['/404']
          },
          {
            label: 'Empty',
            icon: 'pi pi-fw pi-circle-off',
            routerLink: ['/demo/pages2/empty']
          },
        ]
      },
      {
        label: 'Hierarchy',
        items: [
          {
            label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
            items: [
              {
                label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
                items: [
                  { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                  { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                  { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
                ]
              },
              {
                label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
                items: [
                  { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }
                ]
              },
            ]
          },
          {
            label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
            items: [
              {
                label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
                items: [
                  { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                  { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
                ]
              },
              {
                label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
                items: [
                  { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
                ]
              },
            ]
          }
        ]
      },
      {
        label: 'Get Started',
        items: [
          {
            label: 'Documentation', icon: 'pi pi-fw pi-question', routerLink: ['/demo/pages2/documentation']
          },
          {
            label: 'View Source', icon: 'pi pi-fw pi-search', url: ['https://github.com/primefaces/sakai-ng'], target: '_blank'
          }
        ]
      }
    ];
  }
}
