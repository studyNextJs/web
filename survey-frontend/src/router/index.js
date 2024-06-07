import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CreateSurvey from '../views/CreateSurvey.vue';
import SurveyDetailView from '../views/Survey.vue';
import SurveyResponseView from '../views/Respond.vue';
import SurveyThanks from '../components/SurveyThanks.vue';
import QuestionEdit from '../views/QuestionEdit.vue';
import SurveyStatistics from '../views/SurveyStatistics.vue'; // 새로운 통계 페이지 임포트
import QuestionManager from '../views/QuestionManager';
import store from '../store';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/create',
    name: 'create',
    component: CreateSurvey
  },
  {
    path: '/survey/:id',
    name: 'survey',
    component: SurveyDetailView
  },
  {
    path: '/respond/:id',
    name: 'respond',
    component: SurveyResponseView
  },
  {
    path: '/thanks',
    name: 'thanks',
    component: SurveyThanks
  },
  {
    path: '/edit-question/:id',
    name: 'question-edit',
    component: QuestionEdit
  },
  {
    path: '/question-manager',
    name: 'question-manager',
    component: QuestionManager
  },
  {
    path: '/survey/:id/statistics',
    name: 'surveyStatistics',
    component: SurveyStatistics,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(async (to, from, next) => {
  const surveyId = to.params.id;
  if (surveyId && to.name !== 'surveyStatistics') { // 통계 페이지는 예외 처리
    store.commit('resetSurvey');
    await store.dispatch('loadSurvey', surveyId);
    if (to.name !== 'question-edit') {
      await store.dispatch('saveSurveyToApi');
    }
  }
  next();
});

export default router;
