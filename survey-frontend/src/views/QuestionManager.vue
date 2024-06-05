<template>
  <v-container>
    <v-card>
      <v-card-title>
        <h1>Question Manager</h1>
      </v-card-title>
      <v-card-text>
        <p>Manage your surveys here.</p>
        <v-row>
          <v-col v-for="survey in surveys" :key="survey.id" cols="12" md="6">
            <v-card class="ma-3">
              <v-card-title>{{ survey.title }}</v-card-title>
              <v-card-subtitle>{{ survey.description }}</v-card-subtitle>
              <v-card-actions>
                <v-btn icon @click="editSurvey(survey)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon @click="completeSurvey(survey.id)">
                  <v-icon>mdi-stop-circle</v-icon>
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
      surveys: []
    };
  },
  created() {
    this.fetchSurveys();
  },
  methods: {
    fetchSurveys() {
      axios.get('http://127.0.0.1:8000/polls/surveys/')
        .then(response => {
          this.surveys = response.data;
        })
        .catch(error => {
          console.error('Error fetching surveys:', error);
        });
    },
    editSurvey(survey) {
      // Logic for editing the survey
      console.log('Edit survey:', survey);
    },
    completeSurvey(surveyId) {
      axios.patch(`http://127.0.0.1:8000/polls/surveys/${surveyId}/complete/`)
        .then(() => {
          this.fetchSurveys();
        })
        .catch(error => {
          console.error('Error completing survey:', error);
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
