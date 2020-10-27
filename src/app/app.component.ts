import {Component, Injectable} from '@angular/core';
import { NgAudioRecorderService, OutputFormat } from 'ng-audio-recorder';
import fileDownload from 'js-file-download';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgAudioRecorderService]
})
export class AppComponent {
  constructor(private audioRecorderService: NgAudioRecorderService) {
    this.audioRecorderService.recorderError.subscribe(recorderErrorCase => {
      console.log(recorderErrorCase);
    });
  }
  step = 0;
  i = 0;

  startRecording() {
    this.audioRecorderService.startRecording();
  }

  stopRecording() {
    this.audioRecorderService.stopRecording(OutputFormat.WEBM_BLOB).then((output) => {
      // @ts-ignore
      return fileDownload(output, 'filename.webm');
    }).catch(errrorCase => {
      console.log(errrorCase);
    });
  }
  tmr(st) {
    if (st === -1) {
      document.getElementById('timer').style.display = 'none';
    } else {
      document.getElementById('timer').style.display = 'block';
      let timer; // пока пустая переменная
      let x = st; // стартовое значение обратного отсчета
      countdown(); // вызов функции
      function countdown() {  // функция обратного отсчета
        const m = Math.floor(x / 60);
        const s = x - m * 60;
        if (s < 10) {
          document.getElementById('timer').innerText = String(m) + ':0' + String(s);
        } else {
          document.getElementById('timer').innerText = String(m) + ':' + String(s);
        }
        x--; // уменьшаем число на единицу
        if (x < 0){
          clearTimeout(timer); // таймер остановится на нуле
          this.step ++;
        }
        else {
          timer = setTimeout(countdown, 1000);
        }
      }
      // for (let i = 0; i < st; i++) {
      //   setTimeout(function() {

      //   }, 1000);
      // }
    }
  }
  nxt(a, b, opacity, wid) {
    this.step ++;
    document.getElementById('r2').style.width = '360px';
    document.getElementById('r2').style.height = '360px';
    document.getElementById('r3').style.width = '800px';
    document.getElementById('r3').style.height = '800px';
    document.getElementById('r4').style.width = '1240px';
    document.getElementById('r4').style.height = '1240px';
    document.getElementById('r5').style.width = '1780px';
    document.getElementById('r5').style.height = '1780px';
    document.getElementById('indicator').style.background = a;
    document.getElementById('indicator').style.boxShadow = '0px 0px 40px 10px ' + String(b);
    document.getElementById('indicator').style.width = wid + 'px';
    document.getElementById('indicator').style.height = wid + 'px';
    document.getElementById('indicator').style.opacity = opacity;
    setTimeout(function() {
      document.getElementById('r2').style.width = '400px';
      document.getElementById('r2').style.height = '400px';
      document.getElementById('r3').style.width = '850px';
      document.getElementById('r3').style.height = '850px';
      document.getElementById('r4').style.width = '1300px';
      document.getElementById('r4').style.height = '1300px';
      document.getElementById('r5').style.width = '1850px';
      document.getElementById('r5').style.height = '1850px';
    }, 200);
  }
}
