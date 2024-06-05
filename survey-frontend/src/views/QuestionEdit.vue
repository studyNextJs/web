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
          <form @submit.prevent="editSurvey">
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
          <v-btn color="primary" @click="addQuestion">Add Question</v-btn>
          <v-row>
            <v-col v-for="question in survey.questions" :key="question.id" cols="12">
              <v-expand-transition>
                <v-card @click="toggleQuestion(question.id)" class="question-card ma-3">
                  <v-card-title @click.stop>{{ question.text || 'New Question' }}</v-card-title>
                  <v-card-subtitle @click.stop>{{ question.question_type }}</v-card-subtitle>
                  <v-card-actions @click.stop>
                    <v-btn icon @click.stop="deleteQuestion(question.id)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-card-actions>
                  <v-card-text v-if="visibleQuestions.includes(question.id)" @click.stop>
                    <v-text-field v-model="question.text" label="Question Text" />
                    <v-select
                      v-model="question.question_type"
                      :items="questionTypes"
                      label="Question Type"
                    ></v-select>
                    <v-checkbox v-model="question.required" label="Required" />
                    <div v-if="question.question_type === 'multiple_choice' || question.question_type === 'checkbox'">
                      <v-row v-for="(choice, index) in question.choices" :key="index">
                        <v-col>
                          <v-text-field v-model="choice.text" label="Choice Text" />
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
                </v-card>
              </v-expand-transition>
            </v-col>
          </v-row>
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
      survey: {
        title: '',
        description: '',
        password: '',
        completed: false,
        deleted: false,
        questions: []
      },
      questionTypes: ['text', 'multiple_choice', 'checkbox'],
      visibleQuestions: [],
      nextQuestionId: -1, // 임시 ID를 위한 변수 추가
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
        // Visible Questions 초기화
        this.visibleQuestions = this.survey.questions.map(question => question.id);
      } catch (error) {
        console.error('Error loading survey:', error.response.data);
      }
    },
    async editSurvey() {
      const surveyId = this.$route.params.id;
      try {
        await axios.put(`http://127.0.0.1:8000/polls/surveys/${surveyId}/`, this.survey);
        // 질문 수정도 함께 저장
        for (const question of this.survey.questions) {
          if (question.id < 0) {
            // 임시 ID를 가진 새 질문은 POST로 추가
            await axios.post(`http://127.0.0.1:8000/polls/questions/`, question);
          } else {
            // 기존 질문은 PUT으로 업데이트
            await axios.put(`http://127.0.0.1:8000/polls/questions/${question.id}/`, question);
          }
        }
        this.$router.push({ name: 'surveyDetail', params: { id: this.survey.id } });
      } catch (error) {
        console.error('Error updating survey:', error.response.data);
      }
    },
    async stopSurvey() {
      const surveyId = this.$route.params.id;
      try {
        await axios.patch(`http://127.0.0.1:8000/polls/surveys/${surveyId}/complete/`, { completed: true });
        this.survey.completed = true;
      } catch (error) {
        console.error('Error stopping survey:', error.response.data);
      }
    },
    async restartSurvey() {
      const surveyId = this.$route.params.id;
      try {
        await axios.patch(`http://127.0.0.1:8000/polls/surveys/${surveyId}/start/`, { completed: false });
        this.survey.completed = false;
      } catch (error) {
        console.error('Error restarting survey:', error.response.data);
      }
    },
    async deleteSurvey() {
      const surveyId = this.$route.params.id;
      try {
        await axios.patch(`http://127.0.0.1:8000/polls/surveys/${surveyId}/delete/`, { deleted: true });
        this.$router.push({ name: 'home' });
      } catch (error) {
        console.error('Error deleting survey:', error.response.data);
      }
    },
    toggleQuestion(questionId) {
      const index = this.visibleQuestions.indexOf(questionId);
      if (index > -1) {
        this.visibleQuestions.splice(index, 1);
      } else {
        this.visibleQuestions.push(questionId);
      }
    },
    addQuestion() {
      const newQuestion = {
        id: this.nextQuestionId--, // 임시 ID 설정
        text: '',
        question_type: 'text',
        required: false,
        choices: []
      };
      this.survey.questions.push(newQuestion);
      // 새로 추가된 질문을 열기
      this.visibleQuestions.push(newQuestion.id);
    },
    deleteQuestion(questionId) {
      const index = this.survey.questions.findIndex(q => q.id === questionId);
      if (index !== -1) {
        this.survey.questions.splice(index, 1);
      }
    },
    addChoice(questionId) {
      const question = this.survey.questions.find(q => q.id === questionId);
      if (question) {
        question.choices.push({ text: '' });
      }
    },
    deleteChoice(questionId, choiceIndex) {
      const question = this.survey.questions.find(q => q.id === questionId);
      if (question && choiceIndex !== -1) {
        question.choices.splice(choiceIndex, 1);
      }
    }
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
