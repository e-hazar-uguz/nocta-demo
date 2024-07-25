import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { MerchantListComponent } from './shared/components/merchant-list/merchant-list.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { MerchantDetailComponent } from './shared/components/merchant-detail/merchant-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'merchant-list', component: MerchantListComponent, canActivate: [AuthGuard] },
  { path: 'merchant-detail/:id', component: MerchantDetailComponent , canActivate: [AuthGuard] }
];
