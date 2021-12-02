import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { QuestionResponse } from '../types/home';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
import { ResultService } from '../services/result.service';
import { Score } from '../types/score';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  @Input() questions: any[] = [];
  @Input() levelChoosed!: string;
  @Input() categoryChoosed!: string;
  @Input() nbQuestionChoosed!: number;
  myForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private modal: NzModalService,
    private router: Router,
    private resultService: ResultService
  ) {}

  ngOnInit(): void {
    this.myForm = this.createModelForm();
    this.initFormControl();
  }

  createModelForm(): FormGroup {
    return this.fb.group({
      myChoices: this.fb.array([]),
    });
  }

  initFormControl() {
    const formArray: FormArray = this.myForm.get('myChoices') as FormArray;
    this.questions.forEach((q) =>
      formArray.push(new FormControl('', Validators.required))
    );
  }

  onSubmit() {
    const isGoodAnswer = this.myForm.value.myChoices.map(
      (val: string, index: number) => {
        return this.getGoodAnswer(index) === val;
      }
    );
    const score: number = isGoodAnswer.filter(Boolean).length;
    const scoreObj: Score = {
      value: score,
      nbQuestion: this.nbQuestionChoosed,
      difficulty: this.levelChoosed,
      theme: this.categoryChoosed,
    };
    this.resultService.addScore(scoreObj).subscribe(
      (data) => console.log('addScore', data),
      (err) => console.log(err)
    );
    this.modal.success({
      nzTitle: 'Bien joué chef !',
      nzContent: `Tu as eu ${score} bonne(s) réponse(s) `,
      nzOnOk: () => this.router.navigate(['results']),
    });
  }

  getGoodAnswer(index: number) {
    return this.questions[index].response
      .filter((res: QuestionResponse) => res.goodAnswer === true)
      .map((res: QuestionResponse) => res.title)[0];
  }
}
