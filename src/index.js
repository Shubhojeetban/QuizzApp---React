import React, {Component} from "react";
import ReactDOM from "react-dom";
import "./assets/style.css";
import quizService from "./quizService"
import QuestionBox from "./components/Questionbox";
import Result from "./components/Result"

class QuizBee extends Component{
    state = {
        questionBank : [],
        score: 0,
        responses: 0
    };
    getquestionsMethod = () => {
        quizService().then(question => {
            this.setState({
                questionBank : question
            })
        })
    }
    computeAnswer = (answers, correctAnswer) => {
        if(answers === correctAnswer){
            this.setState({
                score: this.state.score + 1
            });
        }
        this.setState({
            responses: this.state.responses < 5 ?this.state.responses + 1: 5
        });
    }
    playAgain = () => {
        this.getquestionsMethod();
        this.setState({
            score : 0,
            responses :0
        });
    };
    componentDidMount(){
        this.getquestionsMethod();
    }
    render(){
        return (
            <div className ="container">
                <div className="title">QuizBee</div>
                {this.state.questionBank.length > 0 &&
                this.state.responses < 5 &&
                this.state.questionBank.map(({question, answers, correct, questionId}) => 
                (<QuestionBox 
                    question={question} 
                    option={answers} 
                    key={questionId}
                    selected={answers => this.computeAnswer(answers, correct)} />
                ))}
                {this.state.responses === 5 ? (<Result score = {this.state.score} playAgain = {this.playAgain} />) : null}
            </div>
        )
    };
}
ReactDOM.render(<QuizBee /> , document.getElementById("root"));