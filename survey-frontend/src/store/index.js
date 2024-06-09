import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    survey: {
      id: null,
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
        question.deleted = true;
      }
    },
    updateQuestion(state, updatedQuestion) {
      const index = state.survey.questions.findIndex(q => q.id === updatedQuestion.id);
      if (index !== -1) {
        state.survey.questions.splice(index, 1, updatedQuestion);
      }
    },
    resetSurvey(state) {
      state.survey = {
        id: null,
        title: '',
        description: '',
        password: '',
        completed: false,
        deleted: false,
        questions: []
      };
    }
  },
  actions: {
    async loadSurvey({ commit }, surveyId) {
      try {
        const response = await axios.get(`https://seulgi97.duckdns.org/polls/surveys/${surveyId}/`);
        commit('setSurvey', response.data);
      } catch (error) {
        console.error('Error loading survey:', error.response?.data || error.message);
      }
    },
    async saveSurveyToApi({ state }) {
      const surveyId = state.survey.id;
      const surveyData = {
        title: state.survey.title,
        description: state.survey.description,
        password: state.survey.password,
        completed: state.survey.completed,
        deleted: state.survey.deleted,
        questions: state.survey.questions.map(question => ({
          id: question.id,
          text: question.text,
          question_type: question.question_type,
          required: question.required,
          deleted: question.deleted,
          survey: state.survey.id,
          choices: question.choices.map(choice => ({
            id: choice.id,
            text: choice.text,
            deleted: choice.deleted
          }))
        }))
      };

      try {
        await axios.put(`https://seulgi97.duckdns.org/polls/surveys/${surveyId}/`, surveyData);
      } catch (error) {
        console.error('Error saving survey:', error.response?.data || error.message);
      }
    },
    updateQuestionInStore({ commit }, question) {
      commit('updateQuestion', question);
    },
  },
});

export default store;
