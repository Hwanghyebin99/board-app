import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { SuccessComponent } from './success/success.component';


/**
 * App 라우팅 정보
 */
 const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'board'
  },
  {
    path:'board', component:BoardComponent
  },
  {
    path:'success', component:SuccessComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
