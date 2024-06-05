<template>
  <v-container>
    <v-card>
      <v-card-title>
        <h1>Edit Questions for {{ survey.title }}</h1>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="editSurvey">
          <div v-for="(question, qIndex) in survey.questions" :key="qIndex" class="question-edit-card">
            <v-text-field
              v-model="question.text"
              label="Question Text"
              required
            ></v-text-field>
            <v-select
              v-model="question.question_type"
              :items="questionTypes"
              label="Question Type"
              required
            ></v-select>
            <v-checkbox
              v-model="question.required"
              label="Required"
            ></v-checkbox>
            <div v-if="question.question_type === 'multiple_choice' || question.question_type === 'checkbox'">
              <div v-for="(choice, cIndex) in question.choices" :key="cIndex">
                <v-text-field
                  v-model="choice.text"
                  label="Choice Text"
                  required
                ></v-text-field>
                <v-btn icon @click="removeChoice(qIndex, cIndex)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
              <v-btn icon @click="addChoice(qIndex)">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </div>
            <v-btn icon @click="removeQuestion(qIndex)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>
          <v-btn @click="addQuestion">Add Question</v-btn>
          <v-btn type="submit" color="primary">Save Changes</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      survey: {
        title: '',
        questions: []
      },
      questionTypes: ['text', 'multiple_choice', 'checkbox']
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
    addQuestion() {
      this.survey.questions.push({
        text: '',
        question_type: 'text',
        required: false,
        choices: []
      });
    },
    removeQuestion(index) {
      this.survey.questions.splice(index, 1);
    },
    addChoice(questionIndex) {
      this.survey.questions[questionIndex].choices.push({ text: '' });
    },
    removeChoice(questionIndex, choiceIndex) {
      this.survey.questions[questionIndex].choices.splice(choiceIndex, 1);
    },
    async editSurvey() {
      const surveyId = this.$route.params.id;
      try {
        await axios.put(`http://127.0.0.1:8000/polls/surveys/${surveyId}/`, this.survey);
        this.$router.push({ name: 'surveyDetail', params: { id: surveyId } });
      } catch (error) {
        console.error('Error updating survey:', error.response.data);
      }
    }
  }
};
</script>

<style scoped>
.question-edit-card {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.v-btn {
  margin-right: 10px;
}
</style>
