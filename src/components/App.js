/*
import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm /> : <QuestionList />}
    </main>
  );
}

export default App;
*/

import React, { useState, useEffect } from "react";
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((questions) => setQuestions(questions));
  }, []);

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function handleDeleteQuestion(id) {
    setQuestions(questions.filter((question) => question.id !== id));
  }

  function handleUpdateQuestion(updatedQuestion) {
    setQuestions(questions.map((question) => 
      question.id === updatedQuestion.id ? updatedQuestion : question
    ));
  }

  return (
    <main>
      <nav>
        <button onClick={() => setPage("Form")}>New Question</button>
        <button onClick={() => setPage("List")}>View Questions</button>
      </nav>
      <section>
        <h1>Quiz Questions</h1>
        {page === "Form" ? (
          <QuestionForm onAddQuestion={handleAddQuestion} />
        ) : (
          <QuestionList 
            questions={questions} 
            onDeleteQuestion={handleDeleteQuestion}
            onUpdateQuestion={handleUpdateQuestion}
          />
        )}
      </section>
    </main>
  );
}

export default App;