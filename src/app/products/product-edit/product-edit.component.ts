import { Product, ProductResolved } from './../product';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';

import { MessageService } from '../../messages/message.service';

import { ProductService } from '../product.service';

@Component({
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent {
  pageTitle = 'Product Edit';
  errorMessage = '';

  product: Product | null = null;

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeRoute.data.subscribe((data) => {
      const resolvedData = data['product'] as ProductResolved;
      this.errorMessage = resolvedData.error ?? '';
      resolvedData.product && this.onProductRetrieved(resolvedData.product);
    });
  }

  onProductRetrieved(product: Product): void {
    this.product = product;

    if (!this.product) {
      this.pageTitle = 'No product found';
    } else {
      if (this.product.id === 0) {
        this.pageTitle = 'Add Product';
      } else {
        this.pageTitle = `Edit Product: ${this.product.productName}`;
      }
    }
  }

  deleteProduct(): void {
    if (!this.product || !this.product.id) {
      // Don't delete, it was never saved.
      this.onSaveComplete(`${this.product?.productName} was deleted`);
    } else {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id).subscribe({
          next: () =>
            this.onSaveComplete(`${this.product?.productName} was deleted`),
          error: (err) => (this.errorMessage = err),
        });
      }
    }
  }

  saveProduct(): void {
    if (this.product) {
      if (this.product.id === 0) {
        this.productService.createProduct(this.product).subscribe({
          next: () =>
            this.onSaveComplete(
              `The new ${this.product?.productName} was saved`
            ),
          error: (err) => (this.errorMessage = err),
        });
      } else {
        this.productService.updateProduct(this.product).subscribe({
          next: () =>
            this.onSaveComplete(
              `The updated ${this.product?.productName} was saved`
            ),
          error: (err) => (this.errorMessage = err),
        });
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(message?: string): void {
    if (message) {
      this.messageService.addMessage(message);
    }

    // Navigate back to the product list
    this.router.navigateByUrl('/products');
  }
}
