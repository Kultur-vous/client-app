import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from '../services/home.service';
import { Question } from '../types/home';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  form!: FormGroup;
  categories: string[] = [];
  levels: string[] = [];
  questions!: Question[];
  noQuestionWithThisCriteria = false;

  levelChoosed!: string;
  nbQuestionChoosed!: number;
  categoryChoosed!: string;

  constructor(
    private fb: FormBuilder,
    private homeService: HomeService,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.getCategories();
    this.getLevels();
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      level: ['Facile', Validators.required],
      nbQuestions: ['10', Validators.required],
      category: ['Divers', Validators.required],
    });
  }

  handleSubmit() {
    console.log(this.form.value);

    this.homeService
      .getQuestions(
        this.form.value.level,
        this.form.value.nbQuestions,
        this.form.value.category
      )
      .subscribe(
        (data) => {
          if ((data as unknown as Question[]).length === 0) {
            this.noQuestionWithThisCriteria = true;
          } else {
            this.noQuestionWithThisCriteria = false;
            this.questions = data as unknown as Question[];
            this.levelChoosed = this.form.value.level;
            this.categoryChoosed = this.form.value.category;
            if (this.form.value.nbQuestions === this.questions.length) {
              this.nbQuestionChoosed = this.form.value.nbQuestions;
            } else {
              this.nbQuestionChoosed = this.questions.length;
            }
          }
        },
        (err) => console.log(err)
      );
  }

  getCategories() {
    this.homeService.getCategories().subscribe(
      (data) => (this.categories = data),
      (err) => console.log(err)
    );
  }
  getLevels() {
    this.homeService.getLevels().subscribe(
      (data) => (this.levels = data),
      (err) => console.log(err)
    );
  }

  goScores() {
    this.router.navigate(['results']);
  }
}
