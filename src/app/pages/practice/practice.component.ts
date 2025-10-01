import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-practice',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './practice.component.html',
  styleUrl: './practice.component.scss'
})
export class PracticeComponent {
  
  @ViewChild('audioInput') audioInput!: ElementRef<HTMLInputElement>;
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  // API Configuration
  private readonly API_URL = 'https://mahmoudgomaa8545-tasmee3-mutqin.hf.space/';
  
  // Component State
  isRecording = false;
  isProcessing = false;
  isPlaying = false;
  audioFile: File | null = null;
  audioUrl: string | null = null;
  result: any = null;
  errorMessage = '';
  successMessage = '';

  // Recording state
  mediaRecorder: MediaRecorder | null = null;
  recordedChunks: Blob[] = [];
  recordingStartTime: number = 0;
  recordingDuration = 0;

  constructor(private http: HttpClient) {}
  // داخل PracticeComponent (أضف بعد الدوال الموجودة)
redirectToApiPage(openInNewTab: boolean = true): void {
  const url = this.API_URL; // استخدم ثابت API_URL الموجود عندك
  if (openInNewTab) {
    window.open(url, '_blank');
  } else {
    window.location.href = url;
  }
}

copyCurl(): void {
  const curl = `curl -X POST "${this.API_URL}" \\\n  -H "Accept: application/json" \\\n  -F "audio_file=@/path/to/recording.wav"`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(curl).then(() => {
      this.successMessage = 'تم نسخ أمر curl للحافظة';
      setTimeout(() => this.successMessage = '', 2500);
    }).catch(() => {
      this.errorMessage = 'فشل نسخ النص، الرجاء نسخه يدوياً';
      setTimeout(() => this.errorMessage = '', 3000);
    });
  } 
  else {
    const textarea = document.createElement('textarea');
    textarea.value = curl;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      this.successMessage = 'تم نسخ أمر curl للحافظة';
      setTimeout(() => this.successMessage = '', 2500);
    } catch {
      this.errorMessage = 'فشل نسخ النص، الرجاء نسخه يدوياً';
      setTimeout(() => this.errorMessage = '', 3000);
    }
    document.body.removeChild(textarea);
  }
}

}
