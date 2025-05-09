// src/app/components/landing/landing.component.ts
import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  HostListener,
  NgZone,
  OnInit,
} from '@angular/core';
import { ParticlesComponent } from '../../shared/particles/particles.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    ParticlesComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent implements OnInit {
  isMobileMenuOpen = false;
  isScrolled = false;
  isDarkMode = true; // Default to dark mode
  currentLanguage = 'en'; // Default language is English

  contactForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Check for saved preferences in localStorage
    this.loadUserPreferences();
    this.updateMetaTags();
  }

  loadUserPreferences(): void {
    // Load language preference from localStorage
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      this.currentLanguage = savedLanguage;
    } else {
      // If no saved preference, try to detect browser language
      const browserLang = navigator.language;
      if (browserLang.startsWith('ka')) {
        this.currentLanguage = 'ka';
      }
    }

    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('preferredTheme');
    if (savedTheme) {
      this.isDarkMode = savedTheme === 'dark';
    } else {
      // If no saved preference, check for system preference
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      this.isDarkMode = prefersDark;
    }

    // Apply theme class to body
    this.applyThemeToBody();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('preferredTheme', this.isDarkMode ? 'dark' : 'light');
    this.applyThemeToBody();
  }

  toggleLanguage(): void {
    this.currentLanguage = this.currentLanguage === 'en' ? 'ka' : 'en';
    localStorage.setItem('preferredLanguage', this.currentLanguage);
    this.updateMetaTags();
  }

  // Apply theme class to body element for global styling
  private applyThemeToBody(): void {
    if (this.isDarkMode) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }
  }

  // Update meta tags based on current language for SEO
  private updateMetaTags(): void {
    if (this.currentLanguage === 'en') {
      this.titleService.setTitle(
        'Heal Tech Solutions - Business Technology Services'
      );
      this.metaService.updateTag({
        name: 'description',
        content:
          'Heal Tech Solutions provides custom technology services for businesses including web development, cloud solutions, and digital transformation.',
      });
    } else {
      this.titleService.setTitle(
        'Heal Tech Solutions - Business Technology Services'
      );
      this.metaService.updateTag({
        name: 'description',
        content:
          'Heal Tech Solutions provides custom technology services for businesses including web development, cloud solutions, and digital transformation.',
      });
    }

    // Add language meta tag
    this.metaService.updateTag({
      property: 'og:locale',
      content: this.currentLanguage === 'en' ? 'en_US' : 'ka_GE',
    });

    // Update alternate language link
    // First, try to find existing alternate language link
    const linkElements = document.querySelectorAll('link[rel="alternate"]');

    // Remove existing alternate language links if any
    linkElements.forEach((element) => {
      element.parentNode!.removeChild(element);
    });

    // Create new alternate language link
    const link = document.createElement('link');
    link.rel = 'alternate';
    link.hreflang = this.currentLanguage === 'en' ? 'ka' : 'en';
    link.href =
      window.location.origin + (this.currentLanguage === 'en' ? '/ka' : '/en');
    document.head.appendChild(link);
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.isScrolled = scrollPosition > 0; // Add shadow if scrolled
  }

  scrollToContact(): void {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToServices(): void {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToAbout(): void {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  submit() {
    if (this.contactForm.invalid) {
      return;
    }

    this.isSubmitting = true;

    const formattedMessage = `
📩 Heal Tech Contact Form Submission

👤 Name: ${this.contactForm.value.name}
📧 Email: ${this.contactForm.value.email}
📋 Subject: ${this.contactForm.value.subject}

💬 Message:
${this.contactForm.value.message}
  `;

    // Send to Telegram
    const botToken = '8102114646:AAE9amfMrHpy_IF88XS2njjodyOIArl60RQ';
    const channelId = '-1002632026970';

    this.http
      .post(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          chat_id: channelId,
          text: formattedMessage,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.submitSuccess = true;
          this.contactForm.reset();
        },
        error: (error) => {
          console.error('Error sending message:', error);
          this.isSubmitting = false;
          this.submitError = true;
        },
      });
  }
}
