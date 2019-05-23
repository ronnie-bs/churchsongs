import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
    songList: any[] = null;
    songInputForm: FormGroup;

    constructor(
        private http: HttpClient,
        private fb: FormBuilder,
    ) {}

    ngOnInit() {
        this.songInputForm = this.fb.group({
            name: '',
            language: '',
        });

        const url = 'http://localhost:3000/songs';
        this.http.get(url).subscribe((res: any[]) => {
            console.log(res);
            this.songList = res;
        });
    }

    onSubmit(songInputForm: FormGroup) {
        const name = songInputForm.get('name').value;
        const language = songInputForm.get('language').value;
        const newSong = { name, language };

        const url = 'http://localhost:3000/songs';
        this.http.post(url, newSong).subscribe((res: any[]) => {
            this.songList = res;
        });
    }
}
