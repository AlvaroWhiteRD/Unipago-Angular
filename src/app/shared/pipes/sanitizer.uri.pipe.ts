import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizerUri',
  standalone: true,
})
export class SanitizerUriPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(url: string | null): string | null {
    if (!url) {
      return null;
    }

    return this.sanitizer.sanitize(SecurityContext.URL, url) || null;
  }
}
