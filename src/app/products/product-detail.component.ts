import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Product, ProductResolved } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  product: Product | null = null;
  errorMessage = '';

  constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const resolvedData = this.activeRoute.snapshot.data[
      'product'
    ] as ProductResolved;
    this.errorMessage = resolvedData.error ?? '';
    resolvedData.product && this.onProductRetrieved(resolvedData.product);
  }

  onProductRetrieved(product: Product): void {
    this.product = product;

    if (this.product) {
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }
}
