
export class Quiz {
  constructor(questions, amount) {
    this.questions = questions;
    this.amount = amount;
    this.currentQuestElement = document.getElementById("currentquest");
    this.totalquestElemen = document.getElementById("totalquest");
    this.questionElemen = document.getElementById("question");
    this.rowAnswerElemen = document.getElementById("rowAnswer");
    this.answerElement = document.getElementsByName("answer");
    this.nextBtn = document.getElementById("next");
    this.tryBtn = document.getElementById("tryBtn");
    this.scoreElement = document.getElementById("score");;
    this.score = 0;
    this.currentQestions = 0;
    this.iscorrect = false;
    this.nextBtn.addEventListener("click", this.nextQuestion.bind(this));
    this.tryBtn.addEventListener("click", this.tryAgain.bind(this));
    this.showQuestion();
  }
  nextQuestion() {
    let checedAnswer = [...this.answerElement].filter(el=>el.checked)
    if (checedAnswer.length == 0){
      $(".quiz .alert").slideDown(500);
    }else{
      $(".quiz .alert").slideUp(500);
      this.iscorrect = this.checedAnswer(checedAnswer[0].value);
      (this.iscorrect)? $("#Correct").fadeIn(500,()=>{this.show()}) : $("#inCorrect").fadeIn(500,()=>{this.show()});
    }
  }
  show(){
    $("#inCorrect").fadeOut(0)
    $("#Correct").fadeOut(0)
    this.currentQestions++;
    this.currentQestions < this.amount ? this.showQuestion() : this.finish();
  }
  showQuestion() {
    this.questionElemen.innerHTML =this.questions[this.currentQestions].question;
    this.currentQuestElement.innerHTML = this.currentQestions + 1;
    this.totalquestElemen.innerHTML = this.amount;
    let answers =  this.getAnswer(this.questions[this.currentQestions]);
    this.showAnswer(answers)
  }
  getAnswer(cerrentQuestion){
    let answers = [cerrentQuestion.correct_answer, ...cerrentQuestion.incorrect_answers];
    answers.sort(() => Math.random() - 0.5);
    return answers ;
  }

  showAnswer(answers){
    let temp = '';
    for(let i=0;i<answers.length;i++){
      temp += `
        <div class="form-check">
          <label class="form-check-label my-2 fs-6">
            <input type="radio" name="answer" id="q${i}" value="${answers[i]}" />
            ${answers[i]}
          </label>
        </div>`
    }
    this.rowAnswerElemen.innerHTML = temp;
  }

  checedAnswer(checedAnswer){
    if(this.questions[this.currentQestions].correct_answer == checedAnswer){
      this.score++
    } 

    return this.questions[this.currentQestions].correct_answer == checedAnswer
  }
  finish() {
    this.scoreElement.innerHTML = this.score
    $(".quiz").fadeOut(500,()=>{
      $(".finish").fadeIn(500)
    })
  }

  tryAgain() {
    this.scoreElement.innerHTML = this.score
    $(".finish").fadeOut(500,()=>{
      $(".setting").fadeIn(500)
    })
  }
}

