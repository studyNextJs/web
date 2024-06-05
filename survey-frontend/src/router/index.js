import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CreateSurvey from '../views/CreateSurvey.vue';
import SurveyDetailView from '../views/Survey.vue';
import SurveyResponseView from '../views/Respond.vue';
import SurveyThanks from '../components/SurveyThanks.vue';
import QuestionEdit from '../views/QuestionEdit.vue'; 
import QuestionManager from '../views/QuestionManager.vue';

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
    path: '/survey-detail/:id',
    name: 'surveyDetail',
    component: SurveyDetailView
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
