import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from "../../layout/sidebar/sidebar.component";
import { BudgetComponent } from "../budget/budget.component";
import { FooterComponent } from "../../layout/footer/footer.component";

@Component({
  selector: 'app-home',
  imports: [RouterModule, SidebarComponent, BudgetComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
