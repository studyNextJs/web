<template>
  <v-container>
    <v-card>
      <v-card-title>
        <h1>{{ survey.title }}</h1>
      </v-card-title>
      <v-card-text>
        <p>{{ survey.description }}</p>
      </v-card-text>
    </v-card>

    <v-list>
      <v-list-item v-for="question in survey.questions" :key="question.id">
        <v-list-item-content>
          <v-list-item-title>{{ question.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-btn color="primary" :to="{ name: 'respond', params: { id: survey.id } }">Respond to this survey</v-btn>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      survey: {}
    };
  },
  created() {
    const surveyId = this.$route.params.id;
    axios.get(`http://13.125.28.173:8000/polls/surveys/${surveyId}/`)
      .then(response => {
        this.survey = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  }
};
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
}
.v-list {
  margin-top: 20px;
}
.v-btn {
  margin-top: 20px;
}
</style>
