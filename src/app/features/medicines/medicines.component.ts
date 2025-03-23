import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditMedicineDialogComponent } from './edit-medicine-dialog/edit-medicine-dialog.component';
import { DeleteMedicineDialogComponent } from './delete-medicine-dialog/delete-medicine-dialog.component';
import { MedicineService } from '../../core/services/medicine.service';
import { Medicine } from '../../core/models/medicine.model';

/**
 * Component responsible for displaying and managing a list of medicines.
 * Supports editing and deleting medicines with a modern UI.
 */
@Component({
  selector: 'app-medicines',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    MatDialogModule,
  ],
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.css'],
})
export class MedicinesComponent implements OnInit {
  // Columns to display in the table
  displayedColumns: string[] = ['id', 'name', 'description', 'stock', 'category_id', 'price', 'actions'];

  // Data source for the Material table
  dataSource = new MatTableDataSource<Medicine>([]);

  // Reference to the paginator for table pagination
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private medicineService: MedicineService, // Service for medicine-related API calls
    private dialog: MatDialog // Dialog service for edit/delete modals
  ) {}

  /**
   * Lifecycle hook to initialize the component.
   * Loads the medicines list on component initialization.
   */
  ngOnInit(): void {
    this.loadMedicines();
  }

  /**
   * Fetches the list of medicines from the API and updates the table.
   */
  private loadMedicines(): void {
    this.medicineService.getMedicines().subscribe({
      next: (response) => {
        this.dataSource.data = response.medicines; // Assign the medicines array from the response
        this.dataSource.paginator = this.paginator; // Attach paginator to the data source
      },
      error: (err) => {
        console.error('Failed to load medicines:', err); // Log any errors
      },
    });
  }

  /**
   * Opens a dialog to edit a medicine and updates the table upon save.
   * @param medicine The medicine object to edit
   */
  editMedicine(medicine: Medicine): void {
    const dialogRef = this.dialog.open(EditMedicineDialogComponent, {
      width: '500px',
      data: { ...medicine }, // Pass a copy to avoid direct mutation
    });

    dialogRef.afterClosed().subscribe((result: Partial<Medicine> | undefined) => {
      if (result) {
        this.medicineService.updateMedicine(medicine.id, result).subscribe({
          next: (updatedMedicine) => {
            this.updateTableRow(updatedMedicine); // Update the table with the new data
          },
          error: (err) => {
            console.error('Failed to update medicine:', err);
          },
        });
      }
    });
  }

  /**
   * Opens a confirmation dialog to delete a medicine and removes it from the table if confirmed.
   * @param id The ID of the medicine to delete
   */
  deleteMedicine(id: number): void {
    const dialogRef = this.dialog.open(DeleteMedicineDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.medicineService.deleteMedicine(id).subscribe({
          next: () => {
            this.removeTableRow(id); // Remove the row from the table
          },
          error: (err) => {
            console.error('Failed to delete medicine:', err);
          },
        });
      }
    });
  }

  /**
   * Updates a specific row in the table with the updated medicine data.
   * @param updatedMedicine The updated medicine object
   */
  private updateTableRow(updatedMedicine: Medicine): void {
    const index = this.dataSource.data.findIndex((m) => m.id === updatedMedicine.id);
    if (index !== -1) {
      this.dataSource.data[index] = updatedMedicine;
      this.dataSource.data = [...this.dataSource.data]; // Trigger table refresh
    }
  }

  /**
   * Removes a row from the table based on the medicine ID.
   * @param id The ID of the medicine to remove
   */
  private removeTableRow(id: number): void {
    this.dataSource.data = this.dataSource.data.filter((m) => m.id !== id);
  }
}
