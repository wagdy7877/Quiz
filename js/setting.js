
import { Quiz } from "./quiz.js";
export class Setting {
  constructor() {
    this.categoryElement = document.getElementById("category");
    this.difficultyElement = document.getElementsByName("difficulty");
    this.numberOfQuestion = document.getElementById("number");
    this.startBtn = document.getElementById("startBtn");
    this.startBtn.addEventListener("click", this.startQuis.bind(this));
  }
  async startQuis() {
    let amount = this.numberOfQuestion.value;
    let category = this.categoryElement.value;
    let difficulty = [...this.difficultyElement].filter((e) => e.checked);
    let url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty[0].value}`;
    let result = await this.fetchUrl(url);
    if(result.length > 0) {
      $('.setting').fadeOut(500,()=>{
        $('.quiz').fadeIn(500);
      });
      new Quiz(result,amount);
    }else {
      $('.setting .alert').slideDown(500);

    }

    // console.log(result);
  }
  async fetchUrl(url) {
    let req = await fetch(url);
    let res = await req.json();
    let data = res.results;
    return data;
  }
}
