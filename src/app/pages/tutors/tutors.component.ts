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
      subject: 'الرياضيات',
      rating: 4.8,
      bio: 'خبرة 8 سنوات في تدريس الرياضيات للمرحلة الثانوية.'
    },
    {
      id: 2,
      name: 'سارة محمد',
      subject: 'اللغة الإنجليزية',
      rating: 4.6,
      bio: 'متخصصة في مهارات المحادثة والتحضير للاختبارات الدولية.'
    },
    {
      id: 3,
      name: 'محمود حسن',
      subject: 'الفيزياء',
      rating: 4.7,
      bio: 'شرح مبسط للمفاهيم الفيزيائية مع أمثلة عملية.'
    }
  ];
}
