<template>
  <div>
    <h1>Create a new survey</h1>
    <form @submit.prevent="createSurvey">
      <div>
        <label for="title">Title:</label>
        <input type="text" v-model="title" required>
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea v-model="description"></textarea>
      </div>
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      title: '',
      description: ''
    };
  },
  methods: {
    createSurvey() {
      axios.post('http://127.0.0.1:8000/polls/surveys/', {
        title: this.title,
        description: this.description
      })
      .then(response => {
        console.log(response.data);
        this.$router.push({ name: 'survey', params: { id: response.data.id } });
      })
      .catch(error => {
        console.error(error);
      });
    }
  }
};
</script>
