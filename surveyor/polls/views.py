from rest_framework import viewsets, status
from rest_framework.response import Response as DRFResponse 
from rest_framework.decorators import action
from .models import Survey, Question, Choice, Response, Answer
from .serializers import SurveySerializer, QuestionSerializer, ChoiceSerializer, ResponseSerializer, AnswerSerializer

class SurveyViewSet(viewsets.ModelViewSet):
    queryset = Survey.objects.filter(deleted=False)
    serializer_class = SurveySerializer

    @action(detail=True, methods=['patch'])
    def complete(self, request, pk=None):
        survey = self.get_object()
        survey.completed = True
        survey.save()
        return DRFResponse({'status': 'survey completed'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['patch'])
    def start(self, request, pk=None):
        survey = self.get_object()
        survey.completed = False
        survey.save()
        return DRFResponse({'status': 'survey started'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['patch'])
    def delete(self, request, pk=None):
        survey = self.get_object()
        survey.deleted = True
        survey.save()
        return DRFResponse({'status': 'survey deleted'}, status=status.HTTP_200_OK)

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    @action(detail=True, methods=['put'])
    def update_with_password(self, request, pk=None):
        question = self.get_object()
        survey = question.survey
        password = request.data.get('password')

        if password == survey.password:
            serializer = self.get_serializer(question, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return DRFResponse(serializer.data)
        else:
            return DRFResponse({'detail': 'Incorrect password.'}, status=status.HTTP_403_FORBIDDEN)

class ChoiceViewSet(viewsets.ModelViewSet):
    queryset = Choice.objects.all()
    serializer_class = ChoiceSerializer

class ResponseViewSet(viewsets.ModelViewSet):
    queryset = Response.objects.all()
    serializer_class = ResponseSerializer

class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
