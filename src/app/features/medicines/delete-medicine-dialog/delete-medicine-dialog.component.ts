import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-medicine-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule,MatDialogModule],
  templateUrl: './delete-medicine-dialog.component.html',
  styleUrls: ['./delete-medicine-dialog.component.css'],
})
export class DeleteMedicineDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeleteMedicineDialogComponent>) {}

  // Closes dialog with true to confirm deletion
  onConfirm(): void {
    this.dialogRef.close(true);
  }

  // Closes dialog without deletion
  onCancel(): void {
    this.dialogRef.close(false);
  }
}
