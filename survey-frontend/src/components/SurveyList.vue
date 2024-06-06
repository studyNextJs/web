<template>
  <v-container>
    <v-card class="mb-5">
      <v-card-title>
        <h1>Surveys</h1>
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item
            v-for="survey in filteredSurveys"
            :key="survey.id"
            link
            :to="{ name: 'survey', params: { id: survey.id } }"
          >
            <v-list-item-content>
              <v-list-item-title>{{ survey.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
    <v-btn color="primary" :to="{ path: '/create' }">Create a new survey</v-btn>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      surveys: []
    };
  },
  computed: {
    filteredSurveys() {
      return this.surveys.filter(survey => !survey.deleted && !survey.completed);
    }
  },
  created() {
    axios.get(`http://13.125.28.173:8000/polls/surveys/`)
      .then(response => {
        this.surveys = response.data;
      })
      .catch(error => {
        console.error('Error fetching surveys:', error);
      });
  }
};
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
}
.v-list {
  margin-bottom: 20px;
}
.v-card {
  margin-bottom: 20px;
}
</style>
