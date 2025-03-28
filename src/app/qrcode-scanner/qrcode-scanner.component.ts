import { NgIf } from '@angular/common';
import { Component, Inject, ViewChild } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { ZXingScannerComponent, ZXingScannerModule } from '@zxing/ngx-scanner';
import { ErrorMessageComponent } from "../error-message/error-message.component";
import { ItemModule } from '../item/item.module';
import { DBManagerService } from '../dbmanager/dbmanager.service';

@Component({
  selector: 'app-qrcode-scanner',
  imports: [ZXingScannerModule, NgIf, ErrorMessageComponent],
  templateUrl: './qrcode-scanner.component.html',
  styleUrl: './qrcode-scanner.component.scss',
  standalone: true,
})
export class QRCodeScannerComponent {
  public qrCodeScannerEnabled: boolean = false;
  public qrCodeResult: string = '';
  public devices: MediaDeviceInfo[] = [];
  public selectedDevice: MediaDeviceInfo | undefined;
  private db: DBManagerService;

  constructor(@Inject(DBManagerService) db: DBManagerService) {
    this.db = db;
  }


  public allowedFormats: BarcodeFormat[] = [
    BarcodeFormat.QR_CODE,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.AZTEC,
    BarcodeFormat.PDF_417,
    BarcodeFormat.CODABAR,
    BarcodeFormat.CODE_39,
    BarcodeFormat.CODE_128,
    BarcodeFormat.EAN_8,
  ];

  @ViewChild('error', { static: false })
  errorMessage: ErrorMessageComponent | undefined;

  public handleQrCodeResult(result: string): void {
    this.qrCodeResult = result;
    this.qrCodeScannerEnabled = false;
    const item: ItemModule = ItemModule.fromISOOSIBACSICS(this.qrCodeResult);
    this.db.addDocument(item);
  }

  public handleCamerasFound(devices: MediaDeviceInfo[]): void {
    this.devices = devices;
    if (devices.length > 0) {
      this.selectedDevice = devices[0];
    }
  }
  
  public enableScanner(): void {
    this.qrCodeScannerEnabled = true;
  }

  public disableScanner(): void {
    this.qrCodeScannerEnabled = false;
  }

  public switchCamera(): void {
    if (this.devices.length > 1) {
      const currentIndex = this.devices.indexOf(this.selectedDevice!);
      const nextIndex = (currentIndex + 1)
      this.selectedDevice = this.devices[nextIndex];
      this.devices[nextIndex] = this.devices[currentIndex];
      this.devices[currentIndex] = this.selectedDevice;
    }
  }

  public availableCameras(): boolean {
    return this.devices.length > 1;
  }

  public getResult(): string {
    if (this.qrCodeResult !== '') {
      return this.qrCodeResult;
    }
    return '';
  }

  public handleError(error: any): void {
    this.errorMessage?.setErrorMessage(error);
    this.qrCodeResult = error;
  }
}