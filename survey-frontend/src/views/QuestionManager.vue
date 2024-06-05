<template>
  <v-container>
    <v-card>
      <v-card-title>
        <h1>Question Manager</h1>
      </v-card-title>
      <v-card-text>
        <p>Manage your survey questions here.</p>
        <v-row>
          <v-col v-for="question in questions" :key="question.id" cols="12" md="6">
            <v-card class="ma-3">
              <v-card-title>{{ question.text }}</v-card-title>
              <v-card-subtitle>{{ question.question_type }}</v-card-subtitle>
              <v-card-actions>
                <v-btn icon @click="editQuestion(question)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon @click="deleteQuestion(question.id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'QuestionManager',
  data() {
    return {
      questions: []
    };
  },
  created() {
    this.fetchQuestions();
  },
  methods: {
    fetchQuestions() {
      axios.get('http://127.0.0.1:8000/polls/questions/')
        .then(response => {
          this.questions = response.data;
        })
        .catch(error => {
          console.error('Error fetching questions:', error);
        });
    },
    editQuestion(question) {
      // Logic for editing the question
      console.log('Edit question:', question);
    },
    deleteQuestion(questionId) {
      axios.delete(`http://127.0.0.1:8000/polls/questions/${questionId}/`)
        .then(() => {
          this.fetchQuestions();
        })
        .catch(error => {
          console.error('Error deleting question:', error);
        });
    }
  }
};
</script>

<style scoped>
.v-card {
  margin-top: 20px;
}
</style>
