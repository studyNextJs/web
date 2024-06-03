<template>
  <div>
    <h1>Create a New Survey</h1>
    <form @submit.prevent="createSurvey">
      <div>
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="survey.title" required>
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea id="description" v-model="survey.description"></textarea>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="survey.password" required>
      </div>
      <div v-for="(question, index) in survey.questions" :key="index">
        <label for="question_text">Question Text:</label>
        <input type="text" v-model="question.text" required>
        <label for="question_type">Question Type:</label>
        <select v-model="question.question_type" required>
          <option value="text">Text</option>
          <option value="multiple_choice">Multiple Choice</option>
          <option value="checkbox">Checkbox</option>
        </select>
        <label for="required">Required:</label>
        <input type="checkbox" v-model="question.required">
        <button type="button" @click="removeQuestion(index)">Remove Question</button>
      </div>
      <button type="button" @click="addQuestion">Add Question</button>
      <button type="submit">Create Survey</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      survey: {
        title: '',
        description: '',
        password: '',
        questions: []
      }
    };
  },
  methods: {
    addQuestion() {
      this.survey.questions.push({
        text: '',
        question_type: 'text',
        required: false
      });
    },
    removeQuestion(index) {
      this.survey.questions.splice(index, 1);
    },
    async createSurvey() {
      try {
        const response = await axios.post('http://127.0.0.1:8000/polls/surveys/', this.survey);
        const surveyId = response.data.id;
        this.$router.push({ name: 'survey', params: { id: surveyId } });
      } catch (error) {
        console.error('Error creating survey:', error.response.data);
      }
    }
  }
};
</script>
