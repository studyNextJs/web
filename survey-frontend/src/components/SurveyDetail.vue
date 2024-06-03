<template>
  <div>
    <h1>{{ survey.title }}</h1>
    <p>{{ survey.description }}</p>
    <ul>
      <li v-for="question in survey.questions" :key="question.id">
        {{ question.text }}
      </li>
    </ul>
    <router-link :to="{ name: 'respond', params: { id: survey.id }}">Respond to this survey</router-link>
  </div>
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
    axios.get(`http://127.0.0.1:8000/polls/surveys/${surveyId}/`)
      .then(response => {
        this.survey = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  }
};
</script>
