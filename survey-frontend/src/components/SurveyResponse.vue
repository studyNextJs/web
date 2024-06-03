<template>
  <div>
    <h1>{{ survey.title }}</h1>
    <form @submit.prevent="submitResponse">
      <div v-for="question in survey.questions" :key="question.id">
        <p @click="toggleQuestion(question.id)" class="question-text">{{ question.text }}</p>
        <div v-if="visibleQuestions.includes(question.id)">
          <div v-if="question.question_type === 'text'">
            <input type="text" v-model="responses[question.id]" :required="question.required" />
          </div>
          <div v-else-if="question.question_type === 'multiple_choice'">
            <div v-for="choice in question.choices" :key="choice.id">
              <label>
                <input type="radio" :name="'question_' + question.id" :value="choice.text" v-model="responses[question.id]" :required="question.required" />
                {{ choice.text }}
              </label>
            </div>
          </div>
          <div v-else-if="question.question_type === 'checkbox'">
            <div v-for="choice in question.choices" :key="choice.id">
              <label>
                <input type="checkbox" :value="choice.text" @change="updateCheckboxResponses(question.id, choice.text, $event.target.checked)" :checked="Array.isArray(responses[question.id]) && responses[question.id].includes(choice.text)" />
                {{ choice.text }}
              </label>
            </div>
          </div>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
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
      const response = {
        survey: this.survey.id,
      };

      try {
        const responseData = await axios.post('http://127.0.0.1:8000/polls/responses/', response);
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
</style>
