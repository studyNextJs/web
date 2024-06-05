<template>
  <v-container>
    <h1>Surveys</h1>
    <v-list>
      <v-list-item
        v-for="survey in surveys"
        :key="survey.id"
        link
        :to="{ name: 'survey', params: { id: survey.id } }"
      >
        <v-list-item-content>
          <v-list-item-title>{{ survey.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
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
  created() {
    axios.get('http://127.0.0.1:8000/polls/surveys/')
      .then(response => {
        this.surveys = response.data;
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
  margin-bottom: 20px;
}
</style>
