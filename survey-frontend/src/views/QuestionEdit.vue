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
          <form @submit.prevent="saveSurvey">
            <v-text-field v-model="survey.title" label="Title" required></v-text-field>
            <v-textarea v-model="survey.description" label="Description"></v-textarea>
            <v-text-field v-model="survey.password" label="Password" type="password" readonly></v-text-field>
            <v-btn type="submit" color="primary">Save Changes</v-btn>
          </form>
        </v-card-text>
      </v-card>

      <v-card class="mt-5">
        <v-card-title>
          <h2>Questions</h2>
        </v-card-title>
        <v-card-text>
          <v-btn color="primary" @click="addNewQuestion">Add Question</v-btn>
          <v-row>
            <v-col v-for="question in filteredQuestions" :key="question.id" cols="12">
              <v-card class="question-card ma-3">
                <v-card-title @click="toggleQuestion(question.id)">{{ question.text || 'New Question' }}</v-card-title>
                <v-card-subtitle>{{ question.question_type }}</v-card-subtitle>
                <v-card-actions>
                  <v-btn icon @click.stop="markQuestionForDeletion(question.id)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-card-actions>
                <v-expand-transition>
                  <v-card-text v-if="visibleQuestions.includes(question.id)">
                    <v-text-field v-model="question.text" label="Question Text" @input="updateQuestion(question)" />
                    <v-select
                      v-model="question.question_type"
                      :items="questionTypes"
                      label="Question Type"
                      @change="updateQuestion(question)"
                    ></v-select>
                    <v-checkbox v-model="question.required" label="Required" @change="updateQuestion(question)" />
                    <div v-if="question.question_type === 'multiple_choice' || question.question_type === 'checkbox'">
                      <v-row v-for="(choice, index) in question.choices" :key="index">
                        <v-col>
                          <v-text-field v-model="choice.text" label="Choice Text" @input="updateQuestion(question)" />
                        </v-col>
                        <v-col cols="auto">
                          <v-btn icon @click.stop="deleteChoice(question.id, index)">
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                      <v-btn color="primary" @click.stop="addChoice(question.id)">Add Choice</v-btn>
                    </div>
                  </v-card-text>
                </v-expand-transition>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
      questionTypes: ['text', 'multiple_choice', 'checkbox'],
      visibleQuestions: [],
    };
  },
  computed: {
    ...mapState(['survey']),
    filteredQuestions() {
      return this.survey.questions.filter(question => !question.deleted);
    },
  },
  created() {
    const surveyId = this.$route.params.id;
    this.loadSurvey(surveyId);
  },
  methods: {
    ...mapActions(['loadSurvey', 'saveSurvey']),
    ...mapMutations(['addQuestion', 'removeQuestion', 'updateQuestion']),
    toggleQuestion(questionId) {
      const index = this.visibleQuestions.indexOf(questionId);
      if (index > -1) {
        this.visibleQuestions.splice(index, 1);
      } else {
        this.visibleQuestions.push(questionId);
      }
    },
    addNewQuestion() {
      const newQuestion = {
        id: null,
        text: '',
        question_type: 'text',
        required: false,
        choices: [],
        deleted: false,
      };
      this.addQuestion(newQuestion);
      this.visibleQuestions.push(newQuestion.id);
    },
    markQuestionForDeletion(questionId) {
      const question = this.survey.questions.find(q => q.id === questionId);
      if (question) {
        question.deleted = true;
        this.updateQuestion(question);
      }
    },
    addChoice(questionId) {
      const question = this.survey.questions.find(q => q.id === questionId);
      if (question) {
        question.choices.push({ text: '' });
        this.updateQuestion(question);
      }
    },
    deleteChoice(questionId, choiceIndex) {
      const question = this.survey.questions.find(q => q.id === questionId);
      if (question && choiceIndex !== -1) {
        question.choices.splice(choiceIndex, 1);
        this.updateQuestion(question);
      }
    },
    async stopSurvey() {
      const surveyId = this.$route.params.id;
      try {
        const response = await axios.patch(`http://127.0.0.1:8000/polls/surveys/${surveyId}/complete/`, { completed: true });
        if (response && response.data) {
          this.survey.completed = true;
        }
      } catch (error) {
        console.error('Error stopping survey:', error.response?.data || error.message);
      }
    },
    async restartSurvey() {
      const surveyId = this.$route.params.id;
      try {
        const response = await axios.patch(`http://127.0.0.1:8000/polls/surveys/${surveyId}/start/`, { completed: false });
        if (response && response.data) {
          this.survey.completed = false;
        }
      } catch (error) {
        console.error('Error restarting survey:', error.response?.data || error.message);
      }
    },
    async deleteSurvey() {
      const surveyId = this.$route.params.id;
      try {
        const response = await axios.patch(`http://127.0.0.1:8000/polls/surveys/${surveyId}/delete/`, { deleted: true });
        if (response && response.data) {
          this.$router.push({ name: 'home' });
        }
      } catch (error) {
        console.error('Error deleting survey:', error.response?.data || error.message);
      }
    },
    async saveSurvey() {
      try {
        await this.saveSurveyToApi();
        this.$router.push({ name: 'surveyDetail', params: { id: this.survey.id } });
      } catch (error) {
        console.error('Error saving survey:', error);
      }
    },
    async saveSurveyToApi() {
      try {
        const response = await axios.put(`http://127.0.0.1:8000/polls/surveys/${this.survey.id}/`, this.survey);
        return response.data;
      } catch (error) {
        console.error('Error saving survey to API:', error.response?.data || error.message);
        throw error;
      }
    },
  },
};
</script>

<style scoped>
.v-card {
  margin-top: 20px;
  width: 100%;
}
.question-card {
  cursor: pointer;
  width: 100%;
}
</style>
