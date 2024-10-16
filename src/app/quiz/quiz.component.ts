import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { QuizService } from "../shared/services/quiz.service";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  isQuizFinished = this.quizService.isQuizFinished;
  playerName = '';
  categoryId = '';
  categoryName = '';
  questions: any[] = [];

  constructor(
    private quizService: QuizService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log('ngOnInit du QuizComponent exécuté');
    this.route.params.subscribe(params => {
      console.log('Paramètres de la route :', params);
      this.quizService.playerName = params['playerName'];
      this.categoryId = params['categoryID'];
      this.categoryName = params['categoryName'];
      console.log('Category ID récupéré :', this.categoryId);
      console.log('Category Name récupéré :', this.categoryName);

      this.loadQuestions(this.categoryId);
    });
  }

  loadQuestions(categoryId: string): void {
    this.quizService.getQuestionsForCategory(categoryId).subscribe(
      (data) => {
        this.questions = data;
      },
      (error) => {
        console.error('Error fetching questions:', error);
      }
    );
  }

  goToResultPage() {
    this.router.navigate(['/result']);
  }
}
