import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArtWorkComponent } from './art-work/art-work.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { ViewComponent } from './view/view.component';
import { FavoritesComponent } from './favorites/favorites.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path:"artwork",
    component: ArtWorkComponent
  },
  {
    path: "documentation",
    component: DocumentationComponent
  },
  {
    path: "artwork/view/:id",
    component: ViewComponent
  },
  {
    path: "favorites",
    component: FavoritesComponent
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
