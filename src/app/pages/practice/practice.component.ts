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
export class PracticeComponent implements OnInit {
  
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

  ngOnInit(): void {
    this.checkMicrophonePermission();
  }

  async checkMicrophonePermission(): Promise<void> {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (error) {
      console.error('Microphone permission denied:', error);
      this.errorMessage = 'يجب السماح بالوصول إلى الميكروفون لاستخدام هذه الميزة';
    }
  }

  startRecording(): void {
    if (this.isRecording) return;

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.recordedChunks = [];
        this.recordingStartTime = Date.now();

        this.mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            this.recordedChunks.push(event.data);
          }
        };

        this.mediaRecorder.onstop = () => {
          const blob = new Blob(this.recordedChunks, { type: 'audio/wav' });
          this.audioFile = new File([blob], 'recording.wav', { type: 'audio/wav' });
          this.audioUrl = URL.createObjectURL(blob);
          this.recordingDuration = Date.now() - this.recordingStartTime;
        };

        this.mediaRecorder.start();
        this.isRecording = true;
        this.errorMessage = '';
      })
      .catch(error => {
        console.error('Error starting recording:', error);
        this.errorMessage = 'حدث خطأ في بدء التسجيل';
      });
  }

  stopRecording(): void {
    if (!this.isRecording || !this.mediaRecorder) return;

    this.mediaRecorder.stop();
    this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
    this.isRecording = false;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type.startsWith('audio/')) {
      this.audioFile = file;
      this.audioUrl = URL.createObjectURL(file);
      this.errorMessage = '';
    } else {
      this.errorMessage = 'يرجى اختيار ملف صوتي صحيح';
    }
  }

  clearAudio(): void {
    this.audioFile = null;
    this.audioUrl = null;
    this.result = null;
    this.errorMessage = '';
    this.successMessage = '';
    if (this.audioInput) {
      this.audioInput.nativeElement.value = '';
    }
  }

  async submitAudio(): Promise<void> {
    if (!this.audioFile) {
      this.errorMessage = 'يرجى تسجيل أو رفع ملف صوتي أولاً';
      return;
    }

    this.isProcessing = true;
    this.errorMessage = '';
    this.successMessage = '';

    try {
      const formData = new FormData();
      formData.append('audio_file', this.audioFile);

      const response = await this.http.post(this.API_URL, formData).toPromise();
      
      this.result = response;
      this.successMessage = 'تم تحليل التسجيل بنجاح';
      
    } catch (error: any) {
      console.error('Error processing audio:', error);
      this.errorMessage = 'حدث خطأ في معالجة الملف الصوتي';
    } finally {
      this.isProcessing = false;
    }
  }

  playAudio(): void {
    if (this.audioUrl && this.audioPlayer) {
      this.audioPlayer.nativeElement.play();
      this.isPlaying = true;
    }
  }

  pauseAudio(): void {
    if (this.audioPlayer) {
      this.audioPlayer.nativeElement.pause();
      this.isPlaying = false;
    }
  }

  formatDuration(ms: number): string {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  getRecordingDuration(): string {
    if (this.isRecording) {
      return this.formatDuration(Date.now() - this.recordingStartTime);
    }
    return this.formatDuration(this.recordingDuration);
  }
}
