import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { ResultService } from '../services/result.service';
import { DataScore, Score } from '../types/score';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss'],
})
export class ResultListComponent implements OnInit {
  scores!: Score[];
  constructor(private resultService: ResultService, private router: Router) {}

  ngOnInit(): void {
    this.getScores();
  }

  getScores() {
    this.resultService.getScores().subscribe(
      (data) => {
        this.scores = (data as unknown as DataScore[])[0]
          .score as unknown as Score[];
      },
      (err) => console.log(err)
    );
  }

  restart() {
    this.router.navigate(['']);
  }
}
