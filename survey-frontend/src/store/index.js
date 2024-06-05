import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    survey: {
      title: '',
      description: '',
      password: '',
      completed: false,
      deleted: false,
      questions: []
    },
  },
  mutations: {
    setSurvey(state, survey) {
      state.survey = survey;
    },
    addQuestion(state, question) {
      state.survey.questions.push(question);
    },
    removeQuestion(state, questionId) {
      const question = state.survey.questions.find(q => q.id === questionId);
      if (question) {
        question.deleted = true; // 소프트 딜리트
      }
    },
    updateQuestion(state, updatedQuestion) {
      const index = state.survey.questions.findIndex(q => q.id === updatedQuestion.id);
      if (index !== -1) {
        state.survey.questions.splice(index, 1, updatedQuestion);
      }
    }
  },
  actions: {
    async loadSurvey({ commit }, surveyId) {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/polls/surveys/${surveyId}/`);
        commit('setSurvey', response.data);
      } catch (error) {
        console.error('Error loading survey:', error.response?.data || error.message);
      }
    },
    async saveSurvey({ state }) {
      try {
        const surveyId = state.survey.id;
        await axios.put(`http://127.0.0.1:8000/polls/surveys/${surveyId}/`, state.survey);
      } catch (error) {
        console.error('Error updating survey:', error.response?.data || error.message);
      }
    }
  }
});
