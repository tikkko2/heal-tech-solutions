// services-display.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ServiceInfo {
  title: string;
  features: string[];
}

@Component({
  selector: 'app-code-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './code-display.component.html',
  styleUrls: ['./code-display.component.scss'],
})
export class CodeDisplayComponent implements OnInit {
  services: string[] = [
    'Custom Website',
    'Internal Systems',
    'Cloud',
    'Database',
    'CI/CD',
    'Scalable Applications',
  ];

  selectedService: string = '';
  serviceInfo: { [key: string]: ServiceInfo } = {};

  constructor() {}

  ngOnInit(): void {
    this.selectedService = this.services[0];
    this.loadServiceInfo();
  }

  selectService(service: string): void {
    this.selectedService = service;
  }

  loadServiceInfo(): void {
    this.serviceInfo['Custom Website'] = {
      title: 'Custom Website',
      features: [
        'Websites of all types and complexity levels',
        'Responsive design for all devices',
        'Modern frameworks and technologies',
        'SEO optimization',
      ],
    };

    this.serviceInfo['Internal Systems'] = {
      title: 'Internal Systems',
      features: [
        'Custom business applications',
        'Workflow automation solutions',
        'Process optimization systems',
        'Enterprise resource planning',
      ],
    };

    this.serviceInfo['Cloud'] = {
      title: 'Cloud',
      features: [
        'AWS and Azure infrastructure setup',
        'Migration to cloud platforms',
        'Infrastructure optimization',
        'Secure cloud architecture',
      ],
    };

    this.serviceInfo['Database'] = {
      title: 'Database',
      features: [
        'Database design and implementation',
        'Performance optimization',
        'Data security and protection',
        'Ongoing database support',
      ],
    };

    this.serviceInfo['CI/CD'] = {
      title: 'CI/CD',
      features: [
        'Automated testing and deployment',
        'Development workflow streamlining',
        'Code quality assurance',
        'Release management',
      ],
    };

    this.serviceInfo['Scalable Applications'] = {
      title: 'Scalable Applications',
      features: [
        'Solutions that grow with your business',
        'High-performance under increased load',
        'Modular architecture design',
        'Efficient resource utilization',
      ],
    };
  }

  getServiceIcon(service: string): string {
    // Map services to icons - can be replaced with actual icons
    const iconMap: { [key: string]: string } = {
      'Custom Website Development': '🖥️',
      'Internal Systems Development': '⚙️',
      'Cloud Deployment': '☁️',
      'Database Management': '🗄️',
      'CI/CD Implementation': '🔄',
      'Scalable Applications': '🏢',
    };

    return iconMap[service] || '📊';
  }
}
