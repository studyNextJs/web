<template>
  <div>
    <v-container>
      <v-card>
        <v-card-title>
          <h1>Edit Survey</h1>
        </v-card-title>
        <v-card-subtitle>
          <v-btn color="primary" @click="restartSurvey" :disabled="!survey.completed">Restart Survey</v-btn>
          <v-btn color="warning" @click="stopSurvey" :disabled="survey.completed">Stop Survey</v-btn>
          <v-btn color="error" @click="deleteSurvey">Delete Survey</v-btn>
        </v-card-subtitle>
        <v-card-text>
          <form @submit.prevent="editSurvey">
            <v-text-field v-model="survey.title" label="Title" required></v-text-field>
            <v-textarea v-model="survey.description" label="Description"></v-textarea>
            <v-text-field v-model="survey.password" label="Password" type="password" required></v-text-field>
            <v-btn type="submit" color="primary">Save Changes</v-btn>
          </form>
        </v-card-text>
      </v-card>

      <v-card class="mt-5">
        <v-card-title>
          <h2>Questions</h2>
        </v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item v-for="question in survey.questions" :key="question.id">
              <v-list-item-content>
                <v-list-item-title>{{ question.text }}</v-list-item-title>
                <v-list-item-subtitle>{{ question.question_type }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn @click="editQuestion(question.id)">Edit</v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-container>
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
        completed: false,
        deleted: false,
        questions: []
      },
      passwordDialog: false,
      password: '',
    };
  },
  created() {
    this.loadSurvey();
  },
  methods: {
    async loadSurvey() {
      const surveyId = this.$route.params.id;
      try {
        const response = await axios.get(`http://127.0.0.1:8000/polls/surveys/${surveyId}/`);
        this.survey = response.data;
      } catch (error) {
        console.error('Error loading survey:', error.response.data);
      }
    },
    async editSurvey() {
      const surveyId = this.$route.params.id;
      try {
        await axios.put(`http://127.0.0.1:8000/polls/surveys/${surveyId}/`, this.survey);
        this.$router.push({ name: 'surveyDetail', params: { id: this.survey.id } });
      } catch (error) {
        console.error('Error updating survey:', error.response.data);
      }
    },
    async stopSurvey() {
      const surveyId = this.$route.params.id;
      try {
        await axios.patch(`http://127.0.0.1:8000/polls/surveys/${surveyId}/complete/`, { completed: true });
        this.survey.completed = true;
      } catch (error) {
        console.error('Error stopping survey:', error.response.data);
      }
    },
    async restartSurvey() {
      const surveyId = this.$route.params.id;
      try {
        await axios.patch(`http://127.0.0.1:8000/polls/surveys/${surveyId}/start/`, { completed: false });
        this.survey.completed = false;
      } catch (error) {
        console.error('Error restarting survey:', error.response.data);
      }
    },
    async deleteSurvey() {
      const surveyId = this.$route.params.id;
      try {
        await axios.patch(`http://127.0.0.1:8000/polls/surveys/${surveyId}/delete/`, { deleted: true });
        this.$router.push({ name: 'home' });
      } catch (error) {
        console.error('Error deleting survey:', error.response.data);
      }
    },
    editQuestion(questionId) {
      this.$router.push({ name: 'question-edit', params: { id: questionId } });
    }
  },
};
</script>

<style scoped>
.v-card {
  margin-top: 20px;
}
</style>
