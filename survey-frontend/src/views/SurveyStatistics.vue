<template>
  <div>
    <v-container>
      <v-card>
        <v-card-title>
          <h1>Survey Statistics</h1>
        </v-card-title>
        <v-card-text>
          <v-card v-for="question in statistics.questions" :key="question.id" class="mb-5">
            <v-card-title>{{ question.text }}</v-card-title>
            <v-card-text>
              <v-row v-for="answer in question.answers" :key="answer.text" class="answer-row">
                <v-col cols="6">
                  <span>{{ answer.text }}</span>
                </v-col>
                <v-col cols="3">
                  <span>{{ answer.count }}</span>
                </v-col>
                <v-col cols="3">
                  <span>{{ answer.percentage.toFixed(2) }}%</span>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
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
      statistics: {
        questions: []
      }
    };
  },
  created() {
    this.loadStatistics();
  },
  methods: {
    async loadStatistics() {
      const surveyId = this.$route.params.id;
      try {
        const response = await axios.get(`https://seulgi97.duckdns.org/polls/surveys/${surveyId}/statistics/`);
        this.statistics = response.data;
      } catch (error) {
        console.error('Error loading statistics:', error.response?.data || error.message);
      }
    }
  }
};
</script>

<style scoped>
.v-card {
  margin-top: 20px;
  width: 100%;
}
.answer-row {
  margin-bottom: 10px;
}
</style>

