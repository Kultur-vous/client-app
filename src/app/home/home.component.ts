import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder, private homeService: HomeService) {
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
}
