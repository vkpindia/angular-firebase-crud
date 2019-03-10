import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  public imgDetails: any = [];
  public imgCount: any = [5, 10, 15, 20, 25, 30, 35];
  public m = 6;

  constructor() {
    this.imgDetails = [
      { name: 'Naturality with nature', src: 'ph1.jpeg', width: 200, height: 170 },
      { name: 'Naturality with nature', src: 'ph2.jpg', width: 200, height: 170 },
      { name: 'Naturality with nature', src: 'ph3.jpg', width: 200, height: 170 },
      { name: 'Naturality with nature', src: 'ph4.jpeg', width: 200, height: 170 },
      { name: 'Naturality with nature', src: 'ph5.jpeg', width: 200, height: 170 },
      { name: 'Naturality with nature', src: 'ph6.jpeg', width: 200, height: 170 },
      { name: 'Naturality with nature', src: 'ph8.jpeg', width: 200, height: 170 },
      { name: 'Naturality with nature', src: 'ph9.jpeg', width: 200, height: 170 },
      { name: 'Naturality with nature', src: 'ph10.jpeg', width: 200, height: 170 },
      { name: 'Naturality with nature', src: 'ph11.jpeg', width: 200, height: 170 },
      { name: 'Naturality with nature', src: 'ph12.jpeg', width: 200, height: 170 },
      { name: 'Naturality with nature', src: 'ph13.jpeg', width: 200, height: 170 },
      { name: 'Naturality with nature', src: 'ph18.jpeg', width: 200, height: 170 },
      { name: 'Naturality with nature', src: 'ph19.jpeg', width: 200, height: 170 },
      { name: 'Naturality with nature', src: 'ph20.jpeg', width: 200, height: 170 },
      { name: 'Naturality with nature', src: 'ph21.jpeg', width: 200, height: 170 },
      { name: 'Naturality with nature', src: 'ph22.jpeg', width: 200, height: 170 },
      { name: 'Naturality with nature', src: 'ph23.jpeg', width: 200, height: 170 },
      { name: 'Naturality with nature', src: 'ph24.jpeg', width: 200, height: 170 },
      { name: 'Naturality with nature', src: 'ph25.jpeg', width: 200, height: 170 },
      { name: 'Naturality with nature', src: 'ph26.jpeg', width: 200, height: 170 },
      { name: 'Naturality with nature', src: 'ph27.jpeg', width: 200, height: 170 },
      { name: 'Naturality with nature', src: 'ph28.png', width: 200, height: 170 },
      { name: 'Naturality with nature', src: 'ph29.jpg', width: 200, height: 170 },
      { name: 'Naturality with nature', src: 'ph30.jpeg', width: 200, height: 170 },
      { name: 'Naturality with nature', src: 'ph31.jpeg', width: 200, height: 170 }

    ];
  }

  ngOnInit() {
  }

}
