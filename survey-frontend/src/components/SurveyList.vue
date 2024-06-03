<template>
  <div>
    <h1>Surveys</h1>
    <ul>
      <li v-for="survey in surveys" :key="survey.id">
        <router-link :to="{ name: 'survey', params: { id: survey.id }}">{{ survey.title }}</router-link>
      </li>
    </ul>
    <router-link to="/create">Create a new survey</router-link>
  </div>
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
