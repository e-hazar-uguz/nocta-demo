import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-merchant-detail',
  standalone: true,
  imports: [],
  templateUrl: './merchant-detail.component.html',
  styleUrl: './merchant-detail.component.css'
})
export class MerchantDetailComponent implements OnInit {

  merchantId: any;

  constructor(private route: ActivatedRoute,  private router: Router) {}

  ngOnInit(): void {
    this.merchantId = this.route.snapshot.paramMap.get('id') as string;
  }

  backToList(){
    this.router.navigate(["/merchant-list"]);
  }

}
