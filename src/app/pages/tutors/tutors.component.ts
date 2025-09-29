import { Component } from '@angular/core';

@Component({
  selector: 'app-tutors',
  imports: [],
  templateUrl: './tutors.component.html',
  styleUrl: './tutors.component.scss'
})
export class TutorsComponent {
  tutors = [
    {
      id: 1,
      name: 'أحمد علي',
      subject: 'محفظ قرأن',
      rating: 4.8,
      bio:'المواعيد كل ثلاثاء من 11:00 - 12:00'
    },
    {
      id: 2,
      name: 'سارة محمد',
      subject: 'اللغة الإنجليزية',
      rating: 4.6,
      bio:'المواعيد كل ثلاثاء من 11:00 - 12:00'
    },
    {
      id: 3,
      name: 'محمود حسن',
      subject: 'الفيزياء',
      rating: 4.7,
      bio: 'المواعيد كل ثلاثاء من 11:00 - 12:00'
    }
  ];
}
