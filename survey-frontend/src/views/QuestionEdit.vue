<template>
  <div>
    <h1>Edit Question</h1>
    <form @submit.prevent="editQuestion">
      <div>
        <label for="text">Question Text:</label>
        <input type="text" id="text" v-model="question.text" required>
      </div>
      <div>
        <label for="question_type">Question Type:</label>
        <select id="question_type" v-model="question.question_type" required>
          <option value="text">Text</option>
          <option value="multiple_choice">Multiple Choice</option>
          <option value="checkbox">Checkbox</option>
        </select>
      </div>
      <div>
        <label for="required">Required:</label>
        <input type="checkbox" id="required" v-model="question.required">
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Save Changes</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      question: {
        text: '',
        question_type: 'text',
        required: false
      },
      password: ''
    };
  },
  created() {
    this.loadQuestion();
  },
  methods: {
    async loadQuestion() {
      const questionId = this.$route.params.id;
      try {
        const response = await axios.get(`http://127.0.0.1:8000/polls/questions/${questionId}/`);
        this.question = response.data;
      } catch (error) {
        console.error('Error loading question:', error.response.data);
      }
    },
    async editQuestion() {
      const questionId = this.$route.params.id;
      const data = { ...this.question, password: this.password };
      try {
        await axios.put(`http://127.0.0.1:8000/questions/${questionId}/update_with_password/`, data);
        this.$router.push({ name: 'surveyDetail', params: { id: this.question.survey } });
      } catch (error) {
        console.error('Error updating question:', error.response.data);
      }
    }
  }
};
</script>
