import { Directive, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
  // tslint:disable-next-line
  selector: 'input[type=file]',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: FileAccessorDirective, multi: true },
  ],
})
export class FileAccessorDirective implements ControlValueAccessor {

  value: any;
  @HostListener('click', ['$event.target.files'])  onChange = (_) => { };
  @HostListener('blur')  onTouched = () => { };

  writeValue(value) { }
  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

}
