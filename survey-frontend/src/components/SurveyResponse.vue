<template>
  <v-container>
    <v-card>
      <v-card-title>
        <h1>{{ survey.title }}</h1>
      </v-card-title>
      <v-card-text>
        <form @submit.prevent="submitResponse">
          <div v-for="question in survey.questions" :key="question.id">
            <v-expand-transition>
              <v-card @click="toggleQuestion(question.id)" class="question-card" v-if="!visibleQuestions.includes(question.id)">
                <v-card-title class="left-align">{{ question.text }}</v-card-title>
              </v-card>
              <v-card class="question-card" v-else>
                <v-card-title class="left-align">{{ question.text }}</v-card-title>
                <v-card-text>
                  <div v-if="question.question_type === 'text'">
                    <v-text-field v-model="responses[question.id]" label="Your answer" />
                  </div>
                  <div v-else-if="question.question_type === 'multiple_choice'">
                    <v-radio-group v-model="responses[question.id]" :mandatory="question.required">
                      <v-radio v-for="choice in question.choices" :key="choice.id" :label="choice.text" :value="choice.text" />
                    </v-radio-group>
                  </div>
                  <div v-else-if="question.question_type === 'checkbox'">
                    <v-checkbox v-for="choice in question.choices" :key="choice.id" :label="choice.text" :value="choice.text" @change="updateCheckboxResponses(question.id, choice.text, $event.target.checked)" :input-value="Array.isArray(responses[question.id]) && responses[question.id].includes(choice.text)" />
                  </div>
                </v-card-text>
              </v-card>
            </v-expand-transition>
          </div>
          <v-btn type="submit" color="primary">Submit</v-btn>
        </form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      survey: {},
      responses: {},
      visibleQuestions: [] // 표시되는 질문 ID 목록
    };
  },
  created() {
    const surveyId = this.$route.params.id;
    axios.get(`http://127.0.0.1:8000/polls/surveys/${surveyId}/`)
      .then(response => {
        this.survey = response.data;
        response.data.questions.forEach(question => {
          if (question.question_type === 'checkbox') {
            this.responses[question.id] = [];
          } else {
            this.responses[question.id] = '';
          }
        });
      })
      .catch(error => {
        console.error(error);
      });
  },
  methods: {
    toggleQuestion(questionId) {
      const index = this.visibleQuestions.indexOf(questionId);
      if (index > -1) {
        this.visibleQuestions.splice(index, 1);
      } else {
        this.visibleQuestions.push(questionId);
      }
    },
    updateCheckboxResponses(questionId, choiceText, isChecked) {
      if (!Array.isArray(this.responses[questionId])) {
        this.responses[questionId] = [];
      }
      const selectedChoices = this.responses[questionId];
      if (isChecked) {
        selectedChoices.push(choiceText);
      } else {
        const index = selectedChoices.indexOf(choiceText);
        if (index > -1) {
          selectedChoices.splice(index, 1);
        }
      }
      this.responses[questionId] = selectedChoices;
    },
    async submitResponse() {
      // Validate required fields
      for (const question of this.survey.questions) {
        if (question.required) {
          if (question.question_type === 'checkbox' && (!this.responses[question.id] || this.responses[question.id].length === 0)) {
            alert(`Please answer the required question: ${question.text}`);
            return;
          }
          if (question.question_type !== 'checkbox' && !this.responses[question.id]) {
            alert(`Please answer the required question: ${question.text}`);
            return;
          }
        }
      }

      try {
        const responseData = await axios.post('http://127.0.0.1:8000/polls/responses/', {
          survey: this.survey.id,
        });
        const responseId = responseData.data.id;
        
        const answerPromises = this.survey.questions.map(question => {
          let answerText;
          if (Array.isArray(this.responses[question.id])) {
            answerText = this.responses[question.id].join(', ');
          } else {
            answerText = this.responses[question.id];
          }
          return axios.post('http://127.0.0.1:8000/polls/answers/', {
            response: responseId,
            question: question.id,
            text: answerText
          });
        });
        
        await Promise.all(answerPromises);
        this.$router.push({ name: 'thanks' });
      } catch (error) {
        console.error('Error submitting response:', error.response.data);
      }
    }
  }
};
</script>

<style>
.question-text {
  cursor: pointer;
  margin-bottom: 10px;
}

.question-card {
  margin-bottom: 10px;
}

.left-align {
  text-align: left;
}
</style>
