# polls/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SurveyViewSet, QuestionViewSet, ChoiceViewSet, ResponseViewSet, AnswerViewSet

router = DefaultRouter()
router.register(r'surveys', SurveyViewSet)
router.register(r'questions', QuestionViewSet)
router.register(r'choices', ChoiceViewSet)
router.register(r'responses', ResponseViewSet)
router.register(r'answers', AnswerViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('questions/<int:pk>/update_with_password/', QuestionViewSet.as_view({'put': 'update_with_password'}), name='question-update-with-password')
]
